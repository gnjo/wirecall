# echos
minimal input engine
```
history
v0.1 lex 2020.01.22
v0.2 coding... cmd
```
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
```
```
let ec=echos()
ec.add(text).run((ec)=>{
 //polling fps for draw.
 //message $$0...$$9
 //selectnumber $$n
 //mode $$m
})
```

# wirewalk
```
floor
yellow hatting: parrize
purple hatting: dont magic
green hatting: poizon
grey hatting: 
red hatting: heat
blue hatting: lake
```
```

wi.x //pos y
wi.y //pos x
wi.z //floornumber
wi.v //vector
//auto set trigger wi.pos or wi.walk
wi.g //auto set, ground object ex)壁
wi.f //auto set, front object ex)扉
wi.f9 //front 9
wi.a3 //around depth 3
wi.addr0 //auto set, address B00X00Y00.W
wi.addr1 //auto set, address B00X00Y00
//
let v=wi.r2a(^|v|<|>,n|e|w|s) //relation to absolute //udlr to news
wi.getfront(|x,y,z,v) //return front of view. ex)壁
wi.getfront9(|x,y,z,v)
wi.getaround(depth|x,y,z,v,depth) //vector N fixed.
wi.pos(x,y,z,v) //same warp
wi.iswarp(x,y,z,v) //if wall, false.
wi.iswalk(v) //if wall, false.
wi.walk(v) //always move the v
let wi=wirewalk(maps,dtx)//devicecontext 

setInterval(()=>{
 let v=getvector()//self make
 ;(wi.iswalk(v))?walk(v):walk()
 wi.draw() //if set dtx draw it.
},1000/20)

```
```
 wi.getfront9(x,y,z,v);
 //m is me
 0 1 2
 3 4 5
 6 7 8
 - m -

 wi.getaround(3)
       N 
 0 0 0 3 0 0 0
 0 0 0 2 0 0 0
 0 0 0 1 0 0 0
 0 0 0 m 0 0 0 E
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 
```
```
function r2a(_k,_v){
 let v=(''+_v).toUpperCase()||'N',k=_k||'^'//<>^v
 let vk={
  'N^':'N','Nv':'S','N<':'W','N>':'E'
 ,'S^':'S','Sv':'N','S<':'E','S>':'W'
 ,'W^':'W','Wv':'E','W<':'S','W>':'N'
 ,'E^':'E','Ev':'W','E<':'N','E>':'S'
 }
 return vk[v+k]||'N'
}

```
