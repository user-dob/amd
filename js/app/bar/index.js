define(function* (module) {

    let main = yield 'js/app/foo/main'

    module.export = {name: 'bar', main}

})

