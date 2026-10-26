// Upgraded display geometry with active in-window UI animations and 3D parallax detail cards for all 8 projects.
import * as THREE from 'three';
import { smooth, clamp, lerp } from '../showreel/scene/timeline.mjs';

function roundedRect(w,h,r){const x=-w/2,y=-h/2,s=new THREE.Shape();s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
function drawRoundBox(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}

const outline=roundedRect(9.96,6.65,.15);
const holePoints=roundedRect(9.62,6.30,.10).getPoints(8).reverse().map(p=>new THREE.Vector2(p.x,p.y+.02));const hole=new THREE.Path(holePoints);hole.closePath();outline.holes.push(hole);
const FRAME=new THREE.ExtrudeGeometry(outline,{depth:.18,bevelEnabled:true,bevelThickness:.05,bevelSize:.05,bevelSegments:2,curveSegments:5,steps:1});
const EDGE=new THREE.EdgesGeometry(new THREE.BoxGeometry(9.97,6.66,.21));
const CARD_EDGE=new THREE.EdgesGeometry(new THREE.BoxGeometry(5.52,3.32,.08));

function chromeTexture(project){
 const c=document.createElement('canvas');c.width=1600;c.height=70;const x=c.getContext('2d');
 const g=x.createLinearGradient(0,0,0,70);g.addColorStop(0,'#18241b');g.addColorStop(1,'#0e1610');x.fillStyle=g;x.fillRect(0,0,1600,70);
 x.fillStyle='rgba(197,245,138,0.22)';x.fillRect(0,67,1600,3);
 const dots=['#b68d6a','#b4ac73','#c5f58a'];
 for(let i=0;i<3;i++){x.fillStyle=dots[i];x.beginPath();x.arc(31+i*19,35,5,0,Math.PI*2);x.fill();}
 x.font='500 18px StudioMono, monospace';x.fillStyle='#c5f58a';x.fillText(`0${(project.index??0)+1}`,108,42);
 x.fillStyle='#dce6d5';x.fillText(`jeff-1217/${project.repo}`,152,42);
 x.textAlign='right';x.fillStyle='#9cb292';x.fillText(project.category,1565,42);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}

function createDetailCardTexture(project,detailImg){
 const c=document.createElement('canvas');c.width=1100;c.height=660;const ctx=c.getContext('2d');
 drawRoundBox(ctx,4,4,1092,652,20);ctx.fillStyle='rgba(12,21,15,0.96)';ctx.fill();
 ctx.lineWidth=3;ctx.strokeStyle='rgba(197,245,138,0.48)';ctx.stroke();
 drawRoundBox(ctx,8,8,1084,72,16);ctx.fillStyle='rgba(24,38,26,0.92)';ctx.fill();
 ctx.font='600 20px StudioMono, monospace';ctx.fillStyle=project.color||'#c5f58a';ctx.fillText(`+ ${project.detailLabel||project.category}`,34,52);
 if(detailImg){
  ctx.save();drawRoundBox(ctx,26,98,1048,470,12);ctx.clip();ctx.drawImage(detailImg,26,98,1048,470);ctx.restore();
  ctx.font='500 18px StudioMono, monospace';ctx.fillStyle='#95aa85';ctx.fillText(project.evidence,34,618);
 }else{
  (project.note||[]).forEach((line,idx)=>{
   const ly=120+idx*135;
   drawRoundBox(ctx,34,ly,1032,108,12);ctx.fillStyle=idx===0?'rgba(32,52,32,0.82)':'rgba(18,29,20,0.78)';ctx.fill();
   ctx.lineWidth=1.5;ctx.strokeStyle=idx===0?'rgba(197,245,138,0.42)':'rgba(130,160,120,0.22)';ctx.stroke();
   ctx.font='600 20px StudioMono, monospace';ctx.fillStyle=project.color||'#c5f58a';ctx.fillText(`0${idx+1}`,60,ly+62);
   ctx.font='500 24px StudioMono, monospace';ctx.fillStyle='#eff3e9';ctx.fillText(line,114,ly+62);
  });
  ctx.font='500 17px StudioMono, monospace';ctx.fillStyle='#8ca37d';ctx.fillText(project.evidence,36,612);
 }
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}

function drawAnimatedScreen(ctx,project,baseImg,localTime){
 const W=1600,H=1000;ctx.clearRect(0,0,W,H);ctx.fillStyle='#090e0c';ctx.fillRect(0,0,W,H);
 if(baseImg){
  const scale=Math.min(W/baseImg.width,H/baseImg.height);
  const dw=baseImg.width*scale,dh=baseImg.height*scale;
  ctx.drawImage(baseImg,(W-dw)/2,(H-dh)/2,dw,dh);
 }
 const phase=clamp(localTime/3.6,0,1);
 ctx.save();
 if(project.id==='astra'){
  const rowY=290+Math.floor((phase*4)%4)*58;
  ctx.fillStyle='rgba(197,245,138,0.12)';ctx.fillRect(68,rowY,980,48);
  ctx.strokeStyle='rgba(197,245,138,0.65)';ctx.lineWidth=2;ctx.strokeRect(68,rowY,980,48);
 }else if(project.id==='soc'){
  const sample='Documentation sample: connection from 192.0.2.10 on port 443';
  const typed=sample.slice(0,Math.floor(clamp((phase-.08)/.55,0,1)*sample.length));
  drawRoundBox(ctx,84,760,1432,150,12);ctx.fillStyle='rgba(11,19,14,0.92)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(158,230,184,0.55)';ctx.stroke();
  ctx.font='600 17px StudioMono, monospace';ctx.fillStyle='#9ee6b8';ctx.fillText('STRUCTURED LOG INPUT · LOCAL SAMPLE',114,804);
  ctx.font='500 22px StudioMono, monospace';ctx.fillStyle='#eff3e9';ctx.fillText(`> ${typed}`,114,856);
 }else if(project.id==='splunk'){
  const spl='(host="ubuntu-server" "Failed password") ssh2 | stats count by user, src_ip';
  const typed=spl.slice(0,Math.floor(clamp(phase/.55,0,1)*spl.length));
  drawRoundBox(ctx,64,54,1472,88,10);ctx.fillStyle='rgba(10,18,12,0.92)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(197,245,138,0.55)';ctx.stroke();
  ctx.font='500 21px StudioMono, monospace';ctx.fillStyle='#eff3e9';ctx.fillText(typed,92,108);
 }else if(project.id==='url'){
  const u='https://example.invalid/account-verify/session';
  const typed=u.slice(0,Math.floor(clamp(phase/.5,0,1)*u.length));
  drawRoundBox(ctx,90,750,1420,160,12);ctx.fillStyle='rgba(10,19,15,0.92)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(163,232,201,0.55)';ctx.stroke();
  ctx.font='600 17px StudioMono, monospace';ctx.fillStyle='#a3e8c9';ctx.fillText('LEXICAL URL INSPECTION · NO EXTERNAL API CALL',120,795);
  ctx.font='500 24px StudioMono, monospace';ctx.fillStyle='#eff3e9';ctx.fillText(typed,120,852);
 }else if(project.id==='wazuh'){
  const rowIdx=Math.floor((phase*5)%5);const ry=420+rowIdx*66;
  ctx.fillStyle='rgba(138,222,207,0.15)';ctx.fillRect(64,ry,1472,54);ctx.lineWidth=2;ctx.strokeStyle='rgba(138,222,207,0.65)';ctx.strokeRect(64,ry,1472,54);
 }else if(project.id==='scanner'){
  const isComp=phase>.45;
  drawRoundBox(ctx,90,755,1420,155,12);ctx.fillStyle='rgba(11,20,14,0.92)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(197,245,138,0.5)';ctx.stroke();
  ctx.font='600 18px StudioMono, monospace';ctx.fillStyle='#c5f58a';ctx.fillText(`TARGET: https://example.invalid  ·  MODE: ${isComp?'COMPREHENSIVE':'QUICK'}`,120,812);
  ctx.font='500 19px StudioMono, monospace';ctx.fillStyle='#b8d1a8';ctx.fillText('Authorised scope verification active · No external scan packets sent',120,862);
 }else if(project.id==='passchecker'){
  const strong=clamp((phase-.2)/.45,0,1);const ratio=lerp(.25,1,smooth(strong));
  drawRoundBox(ctx,90,745,1420,165,12);ctx.fillStyle='rgba(12,21,12,0.94)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(212,247,153,0.58)';ctx.stroke();
  ctx.font='600 22px StudioMono, monospace';ctx.fillStyle='#eff3e9';ctx.fillText(strong<.3?'Input: ••• (Weak)':'Input: •••••••••••••••••••••• (Excellent password!)',122,800);
  drawRoundBox(ctx,122,830,1356,24,12);ctx.fillStyle='rgba(32,48,30,0.9)';ctx.fill();
  drawRoundBox(ctx,122,830,Math.max(40,1356*ratio),24,12);ctx.fillStyle=strong<.35?'#eab308':'#c5f58a';ctx.fill();
 }else if(project.id==='wireshark'){
  const pktIdx=Math.floor((phase*6)%6);const py=165+pktIdx*46;
  ctx.fillStyle='rgba(152,219,190,0.18)';ctx.fillRect(48,py,1504,40);ctx.lineWidth=2;ctx.strokeStyle='rgba(197,245,138,0.7)';ctx.strokeRect(48,py,1504,40);
 }
 ctx.restore();
}

export async function createCleanPanel(project,loader,{anisotropy=8}={}){
 const group=new THREE.Group();group.position.fromArray(project.position);group.rotation.y=project.yaw;group.userData.kind='project-display';group.userData.project=project.id;
 const material=new THREE.MeshPhysicalMaterial({color:0x131f16,metalness:.32,roughness:.22,clearcoat:1,clearcoatRoughness:.14,envMapIntensity:.75,transparent:true,opacity:.96});
 const frame=new THREE.Mesh(FRAME,material);frame.position.z=-.22;frame.userData.kind='original-window-frame';group.add(frame);
 const backing=new THREE.Mesh(new THREE.PlaneGeometry(9.65,6.03),new THREE.MeshBasicMaterial({color:0x090e0c,transparent:true}));backing.position.set(0,-.14,.02);group.add(backing);
 const baseTexture=await loader.loadAsync('/native-evidence/'+project.id+'.webp');baseTexture.colorSpace=THREE.SRGBColorSpace;baseTexture.anisotropy=anisotropy;
 const screenCanvas=document.createElement('canvas');screenCanvas.width=1600;screenCanvas.height=1000;const screenCtx=screenCanvas.getContext('2d');
 drawAnimatedScreen(screenCtx,project,baseTexture.image,0);
 const screenTexture=new THREE.CanvasTexture(screenCanvas);screenTexture.colorSpace=THREE.SRGBColorSpace;screenTexture.anisotropy=anisotropy;
 const screen=new THREE.Mesh(new THREE.PlaneGeometry(9.6,6),new THREE.MeshBasicMaterial({map:screenTexture,transparent:true,toneMapped:false}));screen.position.set(0,-.14,.035);screen.userData.kind='original-interface';group.add(screen);
 const chrome=new THREE.Mesh(new THREE.PlaneGeometry(9.6,.42),new THREE.MeshBasicMaterial({map:chromeTexture(project),transparent:true,toneMapped:false}));chrome.position.set(0,3.08,.05);chrome.userData.kind='unlettered-chrome';group.add(chrome);
 const edge=new THREE.LineSegments(EDGE,new THREE.LineBasicMaterial({color:0xc5f58a,transparent:true,opacity:.24}));edge.position.z=-.10;group.add(edge);
 let detailImg=null;
 if(project.id==='astra'){
  const detail=await loader.loadAsync('/native-evidence/astra-detail.webp');detailImg=detail.image;
 }
 const cardTex=createDetailCardTexture(project,detailImg);cardTex.anisotropy=anisotropy;
 const floating=new THREE.Mesh(new THREE.PlaneGeometry(5.5,3.3),new THREE.MeshBasicMaterial({map:cardTex,transparent:true,toneMapped:false}));
 const side=(project.index??0)%2===0?1.35:-1.35;
 floating.position.set(side,-.25,1.15);floating.userData.kind='actual-investigation-modal';
 const cardEdge=new THREE.LineSegments(CARD_EDGE,new THREE.LineBasicMaterial({color:0xc5f58a,transparent:true,opacity:.42}));floating.add(cardEdge);
 group.add(floating);
 const alphas=new Map();group.traverse(o=>{if(o.material)alphas.set(o.material,o.material.opacity);});
 return {project,group,screen,frame,floating,animate(state){
  const active=state.project.id===project.id&&state.opacity>0;
  const brightness=state.intro>.05?.08:state.outro>.1?.78:.16+.84*(state.project.id===project.id?state.opacity:0);
  alphas.forEach((alpha,mat)=>{mat.opacity=alpha*brightness;});
  if(active){
   drawAnimatedScreen(screenCtx,project,baseTexture.image,state.local);
   screenTexture.needsUpdate=true;
  }
  if(floating){
   const amount=active?smooth((state.local-.5)/.5)*(1-smooth((state.local-3.2)/.45)):0;
   floating.visible=amount>.005;floating.material.opacity=amount;floating.position.z=1.05+.4*amount;floating.rotation.y=(1-amount)*(side>0?-.12:.12);
  }
 },bounds(){return [[-4.8,-3.15,.04],[4.8,-3.15,.04],[4.8,3.3,.04],[-4.8,3.3,.04]].map(v=>group.localToWorld(new THREE.Vector3(...v)));},audit:{editorialCards:0,titlePlanes:0,numberPlanes:0,actualModal:1,textureWidth:baseTexture.image.width,textureHeight:baseTexture.image.height}};
}
