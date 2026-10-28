import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Mail, Github, Linkedin, MapPin, Check, ShieldCheck, LoaderCircle, Copy } from 'lucide-react';
import { profile } from '../data/content';
import { PageIntro, ResumeLink, SectionLabel, CopyEmail } from '../components/UI';
import '../contact.css';

const endpoint = `https://formsubmit.co/ajax/${profile.email}`;
const web3FormsEndpoint = 'https://api.web3forms.com/submit';
const web3FormsKey = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_WEB3FORMS_KEY || '';
const liveContact = 'https://jefrine-correya-portfolio.vercel.app/contact';
type SendState = { kind: 'idle' | 'sending' | 'success' | 'error'; message?: string; timedOut?: boolean };

function buildFormattedBody(name: string, email: string, intent: string, message: string) {
  return `Hi Jefrine,\n\n${message.trim()}\n\n—\nName: ${name.trim()}\nReply-To: ${email.trim()}\nTopic: ${intent}`;
}

function buildMailtoHref(name: string, email: string, intent: string, message: string) {
  const subject = `Portfolio · ${intent} — ${name.trim() || 'Website Inquiry'}`;
  const body = buildFormattedBody(name, email, intent, message);
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildGmailHref(name: string, email: string, intent: string, message: string) {
  const subject = `Portfolio · ${intent} — ${name.trim() || 'Website Inquiry'}`;
  const body = buildFormattedBody(name, email, intent, message);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [intent, setIntent] = useState('SOC opportunity');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SendState>({ kind: 'idle' });
  const [copiedDraft, setCopiedDraft] = useState(false);
  const pending = useRef(false);
  const sending = status.kind === 'sending';
  const offline = Boolean(window.__OFFLINE_PREVIEW__);
  const intents = ['SOC opportunity', 'Project collaboration', 'Say hello'];

  function clearNotice() {
    if (!pending.current) setStatus({ kind: 'idle' });
  }

  async function copyDraftMessage() {
    const formatted = `To: ${profile.email}\nSubject: Portfolio · ${intent} — ${name.trim()}\n\n${buildFormattedBody(name, email, intent, message)}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2500);
    } catch {
      setCopiedDraft(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!name.trim() || !message.trim()) {
      setStatus({ kind: 'error', message: 'Please enter your name and a message, not just spaces.' });
      return;
    }
    if (offline) {
      setStatus({ kind: 'error', message: 'This is the offline preview. Open the live contact page to send your message.' });
      return;
    }
    const honey = String(new FormData(form).get('company_website') || '');
    if (honey) {
      setStatus({ kind: 'error', message: 'This submission could not be accepted. Please use the direct email link instead.' });
      return;
    }

    pending.current = true;
    setStatus({ kind: 'sending' });
    const startedAt = Date.now();
    const controller = new AbortController();
    let didTimeout = false;
    // FormSubmit's SMTP relay takes ~20-25 seconds to deliver and respond (20,548ms measured);
    // give it a full 45-second window so the browser never aborts the request 0.5s before completion.
    const timer = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, 45000);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      interest: intent,
      _subject: `Portfolio · ${intent} — ${name.trim()}`,
      _template: 'table',
      _honey: '',
    };

    const host = window.location.hostname;
    const isPreviewHost = host.endsWith('.run.app') || host.endsWith('.vercel.app');

    async function tryServerRelay(): Promise<boolean> {
      try {
        const relayRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify(payload),
        });
        const relayData = (await relayRes.json()) as Record<string, unknown>;
        if (relayRes.ok && (relayData.success === true || relayData.success === 'true')) {
          setStatus({ kind: 'success', message: 'Message sent. Thank you for getting in touch — I’ll reply to the email address you provided.' });
          setName('');
          setEmail('');
          setMessage('');
          return true;
        }
      } catch {
        // Fall through to direct browser endpoint or fallback actions
      }
      return false;
    }

    try {
      if (web3FormsKey) {
        const w3Res = await fetch(web3FormsEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: payload.name,
            email: payload.email,
            message: payload.message,
            subject: payload._subject,
            topic: payload.interest,
          }),
        });
        const w3Data = (await w3Res.json()) as { success?: boolean };
        if (w3Res.ok && w3Data?.success) {
          setStatus({ kind: 'success', message: 'Message sent. Thank you for getting in touch — I’ll reply to the email address you provided.' });
          setName('');
          setEmail('');
          setMessage('');
          return;
        }
      }

      // On preview domains (.run.app / .vercel.app), use the server relay first so the request
      // carries the already-activated https://www.jeffsec.in/contact Origin/Referer headers.
      if (isPreviewHost && (await tryServerRelay())) {
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'omit',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });
      const result: unknown = await response.json();
      const data = result && typeof result === 'object' ? result as Record<string, unknown> : {};
      const providerMessage = typeof data.message === 'string' ? data.message : '';
      if (/activat|verif|confirm.{0,30}(email|form)|web server/i.test(providerMessage)) {
        if (!isPreviewHost && Date.now() - startedAt > 250 && (await tryServerRelay())) return;
        setStatus({
          kind: 'error',
          message: 'Email delivery is awaiting one-time activation. Please use the pre-filled email or Gmail buttons below to send your message directly right now. Your message is still here.',
        });
        return;
      }
      if (response.status === 429) {
        setStatus({ kind: 'error', message: 'Too many attempts. Please wait a few minutes before trying again, or email me directly.' });
        return;
      }
      if (!response.ok || (data.success !== true && data.success !== 'true')) {
        if (!isPreviewHost && Date.now() - startedAt > 250 && (await tryServerRelay())) return;
        throw new Error('The email service did not confirm this submission.');
      }
      setStatus({ kind: 'success', message: 'Message sent. Thank you for getting in touch — I’ll reply to the email address you provided.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      if (!isPreviewHost && Date.now() - startedAt > 250 && (await tryServerRelay())) return;
      setStatus({
        kind: 'error',
        timedOut: didTimeout,
        message: didTimeout
          ? 'FormSubmit’s server took longer than expected to respond, so we prepared your complete message for direct send below. Your message is still here.'
          : 'We couldn’t confirm the send. Your message is still here. Check your connection before trying again, or email me directly.',
      });
    } finally {
      window.clearTimeout(timer);
      pending.current = false;
    }
  }

  const prefilledMailto = buildMailtoHref(name, email, intent, message);
  const prefilledGmail = buildGmailHref(name, email, intent, message);

  return <>
    <PageIntro number="05" label="ESTABLISH A CONNECTION" title={<>A good conversation.<br/><span className="mint">A stronger next move.</span></>} description="Have a SOC opportunity, a security project, or a question worth exploring? Let’s connect." />
    <section className="contact-page container">
      <div className="contact-details" data-reveal>
        <SectionLabel>DIRECT CHANNELS</SectionLabel>
        <a className="contact-email-big" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={25} /></a>
        <CopyEmail />
        <div className="contact-channel-links">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={19} /><span>LinkedIn<span>Connect professionally</span></span><ArrowUpRight size={20} /></a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={19} /><span>GitHub<span>Explore the source</span></span><ArrowUpRight size={20} /></a>
        </div>
        <div className="contact-location"><MapPin size={17} /><div>{profile.location}<span>Qatar · AST / UTC +03:00</span></div></div>
        <ResumeLink kind="secondary" />
      </div>
      <div className="contact-form-panel" data-reveal>
        <div className="contact-form-header"><Mail size={18} /><span>SEND A MESSAGE</span><span className="status-dot" /></div>
        <form onSubmit={submit} aria-busy={sending}>
          <fieldset className="contact-intent" disabled={sending}>
            <legend>What brings you here?</legend>
            <div>{intents.map(item => <button type="button" key={item} aria-pressed={intent === item} className={intent === item ? 'active' : ''} onClick={() => { setIntent(item); clearNotice(); }}>{intent === item && <Check size={12} />} {item}</button>)}</div>
          </fieldset>
          <div className="form-field-pair">
            <div><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="Alex Morgan" value={name} onChange={event => { setName(event.target.value); clearNotice(); }} required maxLength={100} disabled={sending} /></div>
            <div><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={event => { setEmail(event.target.value); clearNotice(); }} required maxLength={200} disabled={sending} /></div>
          </div>
          <label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows={5} placeholder="Tell me a little about the opportunity or idea…" value={message} onChange={event => { setMessage(event.target.value); clearNotice(); }} required maxLength={5000} disabled={sending} />
          <div className="contact-honeypot" aria-hidden="true"><label>Website (leave empty)<input name="company_website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="form-privacy"><ShieldCheck size={14} /><p>Your name, email, and message are processed by <a href="https://formsubmit.co/documentation" target="_blank" rel="noopener noreferrer">FormSubmit</a> for delivery to my inbox. Please don’t include sensitive information.</p></div>
          <button className="button button-primary form-submit" type="submit" disabled={sending}>{sending ? <>Sending…<LoaderCircle className="contact-send-spinner" size={17} aria-hidden="true" /></> : <>Send mail<ArrowUpRight size={17} /></>}</button>
          {status.kind === 'sending' && <p className="contact-sending-note" role="status">Delivering message to Jefrine’s inbox (takes ~15–20s)…</p>}
          {(status.kind === 'success' || status.kind === 'error') && <div className={`contact-send-status ${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'}>
            <p>{status.message}</p>
            {status.kind === 'error' && (
              <div className="contact-fallback-actions">
                {!offline && name.trim() && message.trim() && (
                  <>
                    <a className="contact-fallback-btn primary" href={prefilledMailto}>
                      <Mail size={14} />
                      <span>Open pre-filled email app</span>
                      <ArrowUpRight size={13} />
                    </a>
                    <a className="contact-fallback-btn" href={prefilledGmail} target="_blank" rel="noopener noreferrer">
                      <span>Send via Gmail Web</span>
                      <ArrowUpRight size={13} />
                    </a>
                    <button type="button" className="contact-fallback-btn" onClick={copyDraftMessage}>
                      {copiedDraft ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedDraft ? 'Copied message' : 'Copy message'}</span>
                    </button>
                  </>
                )}
                <a href={offline ? liveContact : `mailto:${profile.email}`}>{offline ? 'Open the live contact page' : 'Email Jefrine directly'}<ArrowUpRight size={13} /></a>
              </div>
            )}
          </div>}
        </form>
      </div>
    </section>
  </>;
}
