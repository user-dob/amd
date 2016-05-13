# amd

index.js
```
define(function* (module) {

    let foo = yield 'js/app/foo/index'

    console.log(foo)
})

define(function* (module) {

    let [foo, bar] = yield ['js/app/foo/index', 'js/app/bar/index']

    console.log(foo, bar)
})

define(function* (module) {

    let {foo, bar} = yield {
        foo: 'js/app/foo/index',
        bar: 'js/app/bar/index'
    }

    console.log(foo, bar)
})
```

js/app/foo/index.js
```
define(function* (module) {

    module.export = {name: 'foo'}

})
```

js/app/bar/index.js
```
define(function* (module) {

    let main = yield 'js/app/foo/main'

    module.export = {name: 'bar', main}

})
```
