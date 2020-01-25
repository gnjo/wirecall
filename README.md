# wirecall
minimal input engine       
wirecall: https://codepen.io/gnjo/pen/ExaMwNj       
wirewalk: https://codepen.io/gnjo/pen/BaybyKQ         
wiredraw:
```
{.*}>>>(#.*|{.*})|(|\*|\?|[ims][0-9])>.*|\*[^>].*|{{{([\s\S]*?)}}}
```
```
var $i0,$i1,$i2,$i3,$i4,$i5,$i6,$i7,$i8,$i9 //like a image socket
var $s0,$s1,$s2,$s3,$s4,$s5,$s6,$s7,$s8,$s9 //like a sound socket
var $m0,$m1,$m2,$m3,$m4,$m5,$m6,$m7,$m8,$m9 //like a message socket
var $$0,$$1,$$2,$$3,$$4,$$5,$$6,$$7,$$8,$$9,$$$ //returns
var $$k //keyinput
var $$n //selectnumber
var $$w //waitcount //decreasing 60fps

let ca=wirecall({})
ca.fps=20
ca.meslength=30 //
ca.nrange=6 //select range 6
ca.addwait=3 //* is 50ms
ca.kflg=0 //key wait flg
ca.setkflg=()=>{ca.kflg=1}  //auto reset ca.kflg
ca.setkey=(d)=>{ $$k=d||void 0,ca.kflg=($$k)?0:ca.kflg } //d null is flash
```
```
i0>
i1>
i2...i9 //mapping $i0...$i9

s0>
s1>
s2...s9 //mapping $s0...$s9

m0>
m1>
m2...m8 //mapping $m0...$m8
m9> //select message $m9

> m0
*> m0 with keywait

k> keywait only //mapping $$k

**** //wait * is 50ms. ****=4*50ms

m9>
?> selects //auto keywait
$$n //select return  -1:cancel,0:first,1...

$$$ //return
$$0 //return same $$$
$$1...9 return other

{1}>>>#xyz //if jump
{1}>>>### //jumpback

{/*javascript world*/} //one line only. return $$$
{{{ xyz }}} //one line $$$ return
{{{
}}}  //$$$ return, trimed the head and tail.
```


```
/////////////////////////////////////////
#entrypoint //always start the #entrypoint

{1}>>>#wirewalk
/////////////////////////////////////////
#wirewalk
k>
{wi.walk(wi.r2a($$k,wi.v)) }
{ta.isjump(wi.addr0) }>>>{wi.addr0}
{ta.isjump(wi.addr1) }>>>{wi.addr1}
{ta.isjump(wi.addr2) }>>>{wi.addr2}
*
{1}>>>#wirewalk
////////////////////////////////////////
```

```
#entrypoint

>choice is yours.
{{{
meat
meal
meet
}}}
?>{$$$}
>select number {$$n}, select message {$$1}
```

# wirewalk
```
あらゆるイベントは、maskmapで管理できる。見た、踏んだ、二度目、三度目、見てない踏んでない。
```
```
マップは４０＊４０である。壁も一マスに考える。
ゲームでよくある２０＊２０のマップも、実質は４０＊４０

＊規定されている床の種類
・：普遍的な床
！物人：イベントが設定されている床
上下左右：自動進行の床
毒闇麻封：よくあるもの。
飛落：すべてワープ。
０１２３４５６７８９：飛と同じだが、識別用。

＊規定されている扉の種類
扉は壁の一種である。
扉：普遍的な扉
東西南北：一方通行の扉、扉と同じ進行方向からしか進行できない。
赤青黄橙紫緑灰白黒：鍵が必要な扉
昇降：階段は壁の一種である。表示を考えた場合、壁に描く方が便利。特に上り階段。

＊規定されている壁の種類
壁：普遍的な扉
岩土石岳柱：壁色の識別用
```
```

wi.maps
wi.maskmaps
wi.mapsize =40
wi.x //pos x
wi.y //pos y
wi.z //floornumber
wi.v //vector
//auto set trigger wi.walk
wi.g //auto set, ground object ex)壁
wi.f //auto set, front object ex)扉
wi.m //auto set, ground mask
wi.vc //auto set, vector change flg, dont change x,y,z
wi.f9 //front 9
wi.a3 //around depth 3
wi.addr0 //auto set, address #B00X00Y00.W
wi.addr1 //auto set, address #B00X00Y00
wi.addr2 //auto set, address #B00
//
wi.walk(v|x,y,z,v) //always move the v. walk|like a warp
//
let v=wi.r2a(^|v|<|>,N|E|W|S) //relation to absolute //udlr to news
wi.getfront(|x,y,z,v) //return front of view. ex)壁
wi.getfront9(|x,y,z,v)
wi.getaround(depth|x,y,z,v,depth) //vector N fixed.
wi.getmask(|x,y,z,v) //0...8 and 9
wi.iswalk(|v|x,y,z,v) //if wall or door, false
wi.isdoor(|v|x,y,z,v) //now position|there position|look vector

wi.setmap(floor,map,mapmask) 
//map and mapmask is string or ary. if mapmask null is auto generate

let wi=wirewalk(opts)
maps[0]=[[],[]...]
maskmaps[0]=[[9,9],[]...]   //maskmaps is walked log
//0:watch only
//1:first walked //use the event flg
//2:twice walked
//3...8:counted stop the 8. Math.min(count++,8)
//9：not watch, not walked

setInterval(()=>{
 let v=getvector()//self make
 ;(wi.iswalk(v))?walk(v):walk()
 //wi.draw() //if set dtx draw it.
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
```
(Array(40*40+1).join('壁')).match(/.{1,40}/g)
```
