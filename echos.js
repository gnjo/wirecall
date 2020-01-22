/////////////////////////////////////////
;(function(root){
 let fn={}
 fn.q=(s,doc=document)=>{return doc.querySelector(s)}
 let c={}
 c.keys={37:'<',39:'>',38:'^',40:'v',70:'A',68:'B',65:'X',83:'Y',82:'R',69:'L'}
 c.key0=''
 c.key1=''
 c.block=0
 c.flash=()=>{c.key0=c.key1=''}
 //c.fps=10
 c.add=(keystr)=>{
  let t="^,<,v,>,A,B,X,Y,L,R".split(',')
  let k=keystr.split(',').map(d=>d.toUpperCase().charCodeAt(0))
  c.keys={}
  k.map((d,i)=>{ c.keys[d]=t[i] })
  return c
 }
 c.done=(/*fps,*/debughtml)=>{
  //c.fps=fps||c.fps;
  document.documentElement.addEventListener('keydown',function(ev){
   if(!c.keys[ev.which])return;
   if(c.block)return;  
   if(c.key0) c.key1=c.key0;
   c.key0=c.keys[ev.which]
  })
  ;
  //setInterval(()=>{ c.key0='' },1000/c.fps)
  ;
  if(!fn.q(debughtml))return;
  setInterval(()=>{fn.q(debughtml).textContent=c.key0+'　'},1000/60)
  return c;
 }
 ;
 root.controller=c;
 //controller.done('pre')
})(this);
/*
let ctrl=controller;
ctrl.add('w,a,s,d,j,k,i,l,u,o')
ctrl.done()
setInterval(()=>{
 fn.q('pre').textContent=ctrl.key0
},200)
*/
/////////////////////////////////////////
