const exec = require("child_process").exec
const fs = require("fs")
const path = require("path")

const makeAssetsDir = async () => {
    const makeDir = (dir) => {
        return new Promise(resolve => {
            fs.access(dir, err => {
                if (err) {
                    fs.mkdir(dir, () => {
                        resolve()
                    })
                } else {
                    resolve()
                }
            })
        })
    }
    await makeDir("assets")
    await makeDir("assets/models")
}

makeAssetsDir().then(() => {
    fs.readdir("collada", (err, files) => {
        files.filter(file => {
            return fs.statSync(`collada/${file}`).isFile() && /.*\.dae$/.test(file)
        })
        .forEach(file => {
            const inputPath = `collada/${file}`
            const outputPath = `assets/models/${path.basename(file, ".dae")}.gltf`
            exec(`collada2gltf -i ${inputPath} -o ${outputPath}`)
        })
    })
})