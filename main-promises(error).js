const fs = require("fs")
const path = require("path")

const dataPath = "./main/"
const results = []

fs.promises.readdir(dataPath)
    .then(files => {
        files.map((file, index) => fs.promises.stat(path.join(dataPath, file))
        .then(stats => {
            results[index] = {
                name: file,
                time: stats.ctime,
                size: stats.size,
            }
            return results
        }))
        return Promise.all(results)
    })
    .then(results => {
        console.log(">> ", results);
    })
    .catch(err => {
        console.log("!! ", err);
    })