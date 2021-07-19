const fs = require("fs")
const path = require("path")

const dataPath = "./main/"
const results = []

// fs.promises.readdir(dataPath)
//     .then(files => {
//         files.map((file, index) => fs.promises.stat(path.join(dataPath, file))
//         .then(stats => {
//             results[index] = {
//                 name: file,
//                 time: stats.ctime,
//                 size: stats.size,
//             }
//             return results
//         }))
//         return Promise.all(results)
//     })
//     .then(results => {
//         console.log(">> ", results);
//     })
//     .catch(err => {
//         console.log("!! ", err);
//     })

function testFun(targetFile) {
  return new Promise((resolve, reject) => {
    fs.stat(dataPath + '/' + targetFile, (err, result) => {
      if (err) {
        return reject(err)
      }

      // resolve(result)
      setTimeout(() => {
        resolve(result)
      }, 2000)
    })
  })
}

testFun('a')
  .then(result => {
    console.log(result)
  })
testFun('aa')
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log('err:' + err)
  })
  
