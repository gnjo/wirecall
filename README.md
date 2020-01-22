# echos
minimal input engine
```
1.canable the message
2.canable the selecting 5selects only.
3.canable the flowing
4.canable the simple jump
```
```
script('.../echos.js')
script('.../fn.js')
```
```
#xyz //set the jumpmark
*  //wait 4count 
{} //javascriptworld
{1}>>>#xyz //if jump
*>same log need keywait
>not keywait
1>infomessage// if select use infomessage zone
?>selectmessage //use message layer 2
{{{
multiline input to $$$
}}}

/*
/\*{1,9}[^\>]|{.*}>>>({.*}|#.*)|#.*|\?>.*|(\*[0-9]|[0-9\*]|)>.*|{.*}|{{{([\s\S]*?)}}}/g
*/

```
```
echos={} //core
fn={} //util functions
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
$$0=void 0 //message layer 0 
$$1=void 0 //
$$2=void 0 //select layer
$$3=void 0 //
$$4=void 0 //
$$5=void 0 //
$$6=void 0 //
$$7=void 0 //
$$8=void 0 //
$$9=void 0 // 
$$k=void 0 //latest key
$$n=void 0 //latest select number
$$m='free' //now mode, sel|mes|free
lex=(text,offset)=>{
 //return [{type,str,offset+line},...]
}
jlex=(macros)=>{
 //return {'address':line,...}
}
cmd={}
```
```
let ec=echos({
 fps:20
,macros:[]
,jumps:{}
,line:0 //readline
,jumpback:1 //number
,selectmaxlines:6 //stock
,selectmaxrings:40 //one line max length
,cursor:'>' //selecting cursor
,buffer:[] //flowbuffer message layer0 only
,keystr:'w,a,s,d,j,k,i,l,u,o' //^,<,v,>,a,b,x,y,l,r
,tick:0
,waitcount:0
,cl:void 0
,caller:function(ec){/**/}
,lex:lex
,jlex:jlex
,cmd:cmd
,ctrl:controller
,add:(text)=>{
 let a=ec.lex(text,macros.length)
 let j=ec.jlex(a)
 macros=macros.concat(a)
 jumps=Object.assign(jumps,j)
 return ec;
}
,run:(caller)=>{
 ec.caller=caller|ec.caller
 ec.cl=setInterval(()=>{
  ec.tick++;
  ec.caller(ec);
 },1000/ec.fps)
}
})
;
ec.add(text).run((ec)=>{
 //polling fps for draw.
 //message $$0...$$9
 //selectnumber $$n
 //mode $$m
})
```
