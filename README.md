# echos
simple message engine
```
1.canable the message
2.canable the selecting
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
?>selectmessage //use message layer 0
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
$$$=void 0 //return //$$ is global
$$0=void 0 //message layer 0 and select
$$1=void 0 //
$$2=void 0 //
$$3=void 0 //
$$4=void 0 //
$$5=void 0 //
$$6=void 0 //
$$7=void 0 //
$$8=void 0 //
$$9=void 0 //other 
$$k=void 0 //latest key
$$n=void 0 //latest select number
$$m='sel' //now mode, sel|mes|free
lex=(text,offset)=>{
 //return [{type,str,offset+line},...]
}
jlex=(macros)=>{
 //return {'address':line,...}
}
cmd=(obj)=>{
//obj={type,str,line}
}
```
```
let ec=echos({
 fps:20
,macros:[]
,jumps:{}
,line:0 //readline
,jumpback:1 //number
,mainmaxlines:5 //stock
,mainmaxrings:40 //one line max length
,buffer:[] //flowbuffer message layer0 only and selecting is off
,lex:lex
,cmd:cmd
})
;
e.key('w,a,s,d,j,k,i,l,u,o') //^,<,v,>,a,b,x,y,l,r
 .run(text,(ec)=>{
 //polling fps for draw.
})
```
