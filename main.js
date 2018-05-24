import Dorayaki from './engine/dorayaki.js'

var dora = null;

const init = () => {
    const canvas = document.getElementById("canvas")
    dora = new Dorayaki();
    dora.init(canvas)
    dora.loadModel("assets/models/model.gltf")
}
addEventListener("DOMContentLoaded", init)
