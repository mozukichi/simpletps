export {
    /**
     * 
     */
    load(src) {
        return Promise((resolve) => {
            fetch(src).then((res) => {
                console.log(res.json)
            })
        })
    } 
}