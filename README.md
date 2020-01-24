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
