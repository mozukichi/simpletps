import Model from "./model.js"

const Loader = {
    load(gl, src) {
        return new Promise((resolve) => {
            fetch(src).then((res) => {
                return res.json()
            }).then(json => {
                const model = new Model(gl, json)
                resolve(model)
            })
        })
    } 
}

export default Loader;