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


