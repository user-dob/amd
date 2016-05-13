(() => {
    let cache = new Map()

    class Import {
        getUrls() {
            return this.urls
        }

        build(scripts) {
            throw new Error('method "build" is not defined')
        }
    }

    class ImportArray extends Import {
        constructor(data) {
            super()
            this.urls = data
        }

        build(scripts) {
            return scripts
        }
    }

    class ImportObject extends Import {
        constructor(data) {
            super()
            this.keys = Object.keys(data)
            this.urls = this.keys.map(key => data[key])
        }

        build(scripts) {
            return this.keys.reduce((o, key, index) => {
                o[key] = scripts[index]
                return o
            }, {})
        }
    }

    class ImportString extends Import {
        constructor(data) {
            super()
            this.urls = [data]
        }

        build(scripts) {
            return scripts.pop()
        }
    }

    class ImportFactory {
        static get(data) {
            if(typeof data === 'string')
                return new ImportString(data)

            if(Array.isArray(data))
                return new ImportArray(data)

            return new ImportObject(data)
        }
    }

    window.define = generator => {

        let scope = {export: {}}

        generator = generator(scope)

        let { value, done } = generator.next()

        if(done) {
            return Promise.resolve(scope)
        }

        let imports = ImportFactory.get(value)

        let scripts = imports.getUrls().map(url => {

            if(cache.has(url)) {
                return Promise.resolve(cache.get(url))
            }

            return fetch(`${url}.js`)
                .then(response => response.text())
                .then(text => {
                    cache.set(url, text)
                    return text
                })
        })

        return Promise
            .all(scripts)
            .then(scripts => {
                return scripts.map(text => eval(text).then(m => m.export))
            })
            .then(scripts => {
                return Promise.all(scripts).then(scripts => generator.next(imports.build(scripts)))
            })
            .then(() => scope)
    }
})()
