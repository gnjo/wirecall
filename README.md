# echos
simple message engine
```
1.canable the message
2.canable the selecting
3.canable the flowing
4.canable the simple jump
```
```
echos={} //core
fn={} //util functions
$$$=void 0 //return //$$ is global
$$0=void 0 //
$$1=void 0 //
$$2=void 0 //
$$3=void 0 //
$$4=void 0 //
$$5=void 0 //
$$6=void 0 //
$$7=void 0 //
$$8=void 0 //
$$9=void 0 //other return 0...9
$$k=void 0 //latest key
$$n=void 0 //latest select number
$$l=void 0 //log message same ec.log
```
```
let ec=echos({
 'fps':20
,'line':0 //readline
,'jumpback':1 //number
,'logmaxlines':10 //stock
,'logmaxrings':40 //one line max length
,'buffer':[] //flowbuffer 
}).run(text,caller)
```
