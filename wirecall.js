/////////////////////////////////////////
var $i0,$i1,$i2,$i3,$i4,$i5,$i6,$i7,$i8,$i9 //like a image socket
var $s0,$s1,$s2,$s3,$s4,$s5,$s6,$s7,$s8,$s9 //like a sound socket
var $m0,$m1,$m2,$m3,$m4,$m5,$m6,$m7,$m8,$m9 //like a message socket
var $$0,$$1,$$2,$$3,$$4,$$5,$$6,$$7,$$8,$$9,$$$ //returns
var $$k //keyinput
var $$n //selectnumber
var $$w //waitcount //decreasing 60fps
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

;(function(root){
 let ma={
  group:/#.*|{.*}>>>(#.*|{.*})|k>.*|(|\*|\?|[ims][0-9])>.*|\*[^>].*|{{{([\s\S]*?)}}}|{.*}|.*/g
  ,trim:/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
  ,types:'MRK,KWT,SEL,MES,WIT,JMP,EVM,EVL,CMM'.split(',')
  ,MRK:/^#.*/
  ,JMP:/^{.*}>>>(#.*|{.*})/ //jump
  ,MES:/^(|\*|[ims][0-9])>.*/ //message input
  ,SEL:/^\?>.*/ //select
  ,EVL:/^{.*}/ //eval javascript
  ,EVM:/^{{{([\s\S]*?)}}}/ //eval message
  ,KWT:/^k>.*/ //key wait
  ,WIT:/^\*[^>].*/ //increase the wait
  ,CMM:/^.*/
 }
 function lexs(text,offset){
  let oi=offset||0
  let jumps={}
  let lists=text.replace(ma.trim,'').match(ma.group)
  .map((d,i)=>{
   let type='CMM';
   for(type of ma.types)
    if(ma[type].test(d))break;
   if(type==='MRK') jumps[d]=i+oi
   return {str:d,type:type,line:i+oi}
  })
  return {jumps:jumps,lists:lists}
 }
 ;
 root.lexs=lexs
})(this);

/////////////////////////////////////////
;(function(root){
 let lexs=root.lexs
 function entry(){
  let o={}
  o.lists=[] //lists
  o.jumps={}
  o.line=0 //count
  o.block=0 //flg
  o.end=0 //flg
  o.lexs=lexs
  ;
  o.add=(text)=>{
   let l=o.lists.length
   let x=o.lexs(text,l)
   o.lists=o.lists.concat(x.lists)
   o.jumps=Object.assign(o.jumps,x.jumps)
   return o;
  }
  ;
  o.get=()=>{
   let s=o.block?void 0:o.lists[o.line]
   if(s) o.block=1;
   return s;
  }
  o.next=(d)=>{
   (d!=null)?o.line=d:o.line++;
   o.end=(o.lists.length-1<o.line)?1:0;
   return o.block=0
  }
  o.reload=(_list)=>{
   o.block=1;
   o.line=999;
   o.lists=_list||[]
   o.line=0;
   o.block=0;
   return;
  }
  o.isend=()=>{return o.end}
  o.isEnd=o.isend
  return o;
 }
 root.reader=entry;
/*
let li=`MRK\nCMM\nEVL「「あいうえを入れておく」」`.split('\n');
let rd=reader(li);
fn.q('button').onclick=()=>{
 fn.q('pre').textContent=rd.get();
 fn.q('pre.line').textContent=rd.line +','+ rd.end
 fn.q('pre.end').textContent=rd.isEnd()?'end':'not'
 rd.next();
}*/
})(this);
/////////////////////////////////////////

;(function(root){
 let fn={}
 fn.toSmall=(str)=>{
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
   return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }) 
 }
 fn.toBig=(str)=>{
  return str.replace(/[A-Za-z0-9]/g, function(s) {
   return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
 }
 root.toSmall=fn.toSmall;
 root.toBig=fn.toBig
})(this);
///////////////////////////////////////////
;(function(root){
 let toBig=root.toBig
 ;
 //comment trim 
 function _c(d){return d.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,'')}
 //eval
 function _(obj){return Function('return (' + obj + ')')()}
 //message rep
 function _m(obj,bigflg){return obj.replace(/{(.*?)}/g,(d,dd)=>{return $$$=_(dd),bigflg?toBig(''+$$$):$$$})}
 //trim { and }
 function _t(obj){return obj.replace(/{|}/g,'')}
 function _t2(obj){return obj.replace(/{{{|}}}/g,'').trim()}
 root._c=_c
 root._=_
 root._m=_m
 root._t=_t
 root._t2=_t2 
})(this);
//////////////////////////////////////////////
