// Preserve non-textual grading tuned to the website's obsidian-emerald (#090e0c) palette.
export async function createHUD(width,height,source){
 const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;canvas.id='composite';canvas.style.zIndex='4';canvas.style.pointerEvents='none';document.body.append(canvas);
 const ctx=canvas.getContext('2d',{alpha:false});
 return {canvas,draw(){
  ctx.globalAlpha=1;ctx.drawImage(source,0,0,width,height);
  const matte=ctx.createLinearGradient(0,height*.64,0,height);matte.addColorStop(0,'#090e0c00');matte.addColorStop(.42,'#090e0c44');matte.addColorStop(1,'#090e0cf2');ctx.fillStyle=matte;ctx.fillRect(0,height*.64,width,height*.36);
  ctx.save();ctx.scale(width,height);const vignette=ctx.createRadialGradient(.5,.47,.27,.5,.5,.7);vignette.addColorStop(0,'#05090600');vignette.addColorStop(1,'#05090666');ctx.fillStyle=vignette;ctx.fillRect(0,0,1,1);ctx.restore();
 },export(format='png'){return canvas.toDataURL(format==='jpeg'?'image/jpeg':'image/png',.97).split(',')[1];}};
}
