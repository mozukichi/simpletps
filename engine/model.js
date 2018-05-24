export default class Model {
    constructor(gl, data) {
        this.data = data
        this.gl = gl

        this.verticesBuffers = []

        this.createBuffer()
    }

    createBuffer() {
        this.data.buffers.forEach(buffer => {
            const verticesBuffer = this.gl.createBuffer()
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, verticesBuffer)

            const length = buffer.byteLength
            const dataUri = buffer.uri

            const BASE64_MARKER = ";base64,"
            const base64Index = dataUri.indexOf(BASE64_MARKER) + BASE64_MARKER.length
            const base64 = dataUri.substring(base64Index)
            const raw = atob(base64)
            const rawLength = raw.length
            const arrayBuffer = new ArrayBuffer(rawLength)
            
            for (let i = 0; i < rawLength; i++) {
                arrayBuffer[i] = raw[i]
            }
            const floatArray = new Float32Array(arrayBuffer)
            this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, this.gl.STATIC_DRAW)

            this.verticesBuffers.push(verticesBuffer)
        })
    }
}