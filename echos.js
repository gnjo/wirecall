/////////////////////////////////////////
//echos={} //core
//fn={} //util functions
$$$=void 0 //return //$
$r0=void 0 //same $$$
$r1=void 0 //other return
$r2=void 0 //
$r3=void 0 // 
$r4=void 0 // 
$r5=void 0 // 
$r6=void 0 // 
$r7=void 0 // 
$r8=void 0 //
$r9=void 0 // 
$$0="" //message layer 0 
$$1="" //
$$2="" //select layer
$$3="" //
$$4="" //
$$5="" //
$$6="" //
$$7="" //
$$8="" //
$$9="" // 
$$k=void 0 //latest key
$$n=void 0 //latest select number
$$m='free' //now mode, sel|mes|free

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
 /*
 function entry(_list){
  let o={}
  o.lists=_list||[] //lists
  o.line=0 //count
  o.block=0 //flg
  o.end=0 //flg
  ;
  o.setlists=(d)=>{o.lists=d;}
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
 */
/*
let li=`MRK\nCMM\nEVL「「あいうえを入れておく」」`.split('\n');
let rd=reader(li);
fn.q('button').onclick=()=>{
 fn.q('pre').textContent=rd.get();
 fn.q('pre.line').textContent=rd.line +','+ rd.end
 fn.q('pre.end').textContent=rd.isEnd()?'end':'not'
 rd.next();
}
*/ 
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
 root._c=_c
 root._=_
 root._m=_m
 root._t=_t
})(this);
//////////////////////////////////////////////
;(function(root){

 function typecheck(d){
  //CMM,EVL,EVM,JMP,MRK,SEL,MES
  let type='CMM'
  ,re_EVL=/^{(\s|\S)*?}/
  ,re_EVM=/^{{{(\s|\S)*?}}}/
  ,re_JMP=/^{.*}>>>({.*}|#.*)/
  ,re_MRK=/^#(.*)/
  ,re_SEL=/^\?>.*/
  ,re_WAI=/^\*{1,9}[^\>]/
  ,re_MES=/^(\*[0-9]|[0-9\*]|)>.*/
  let str=d
  if(re_MRK.test(str)) type='MRK'
  if(re_MES.test(str)) type='MES' 
  if(re_EVL.test(str)) type='EVL'
  if(re_EVM.test(str)) type='EVM' 
  if(re_JMP.test(str)) type='JMP' 
  if(re_MRK.test(str)) type='MRK'
  if(re_SEL.test(str)) type='SEL'
  if(re_WAI.test(str)) type='WAI'

  return type
 } 
 function lex(_text,_offset){
  let text=_c(_text)
  ,offset=_offset||0
  ,re=/\*{1,9}[^\>]|{.*}>>>({.*}|#.*)|#.*|\?>.*|(\*[0-9]|[0-9\*]|)>.*|{.*}|{{{([\s\S]*?)}}}/g
  return text.match(re).map((d,i)=>{return {str:d,line:i+offset,type:typecheck(d)}})
  ;
 }
 function jlex(macros){
  //return {'address':line,...}
  //console.log(macros)
  let o={},re_MRK=/^#(.*)/
  macros.filter(d=>re_MRK.test(d.str)).map(d=>{ o[d.str]=d.line })
  return o
 }

 root.lex=lex;
 root.jlex=jlex
 root.typecheck=typecheck;
})(this);
/////////////////////////////////////////
