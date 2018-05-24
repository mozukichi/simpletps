import Loader from "./loader.js"

var gl = null
var shaderProgram = null

class Shader {
    constructor() {
        this.program = null
    }

    async load(gl, vsSrc, fsSrc) {
        const fragmentShader = await this.getShader(
            gl, vsSrc, gl.FRAGMENT_SHADER)
        const vertexShader = await this.getShader(
            gl, fsSrc, gl.VERTEX_SHADER)

        const program = gl.createProgram()

        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Error: シェーダープログラムを初期化できません。")
        }
        this.program = program

        gl.useProgram(program)

        const vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition")
        gl.enableVertexAttribArray(vertexPositionAttribute)
    }

    async getShader(gl, src, shaderType) {
        return new Promise(resolve => {
            fetch(src).then(res => {
                return res.text()
            }).then(text => {
                const shaderScript = text
                const shader = gl.createShader(shaderType)
                gl.shaderSource(shader, shaderScript)
                gl.compileShader(shader)
                
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    console.error(gl.getShaderInfoLog(shader))
                }

                resolve(shader)
            })
        })
    }
}

export default class Dorayaki {
    constructor() {
        this.shader = new Shader()
    }

    async init(canvas) {
        gl = canvas.getContext("webgl")
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)

        gl.viewport(0, 0, canvas.width, canvas.height)

        this.shader.load(gl,
            "./engine/shader_fragment.glsl",
            "./engine/shader_vertex.glsl")
    }

    async loadModel(src) {
        return new Promise(resolve => {
            Loader.load(gl, src).then(model => {
                resolve()
            })
        })
    }

    renderBegin() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    }

    /**
     * モデルの描画
     * @param {Model} model
     * @param {Camera} camera
     * @param {Array} matrix
     */
    render(model, camera, matrix) {
    }
}