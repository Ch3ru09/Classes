const fs = require('fs')
const path = require('path')

// const files = fs.promises.readdir('./data')
// fs.promises.readdir('./data', (err, files) => {})

// const readdirPromise = fs.promises.readdir('./data1')
// 
// readdirPromise.then((files) => {
//   console.log('>>', files)
// })
// 
// readdirPromise.catch((err) => {
//   console.log('!!', err)
// })

const dataPath = './data'

fs.promises.readdir(dataPath)
  .then((files) => {
    // console.log('>>', files)
    // const promises = []
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i]
    //   const statPromise = fs.promises.stat(path.join(dataPath, file))
    //   promises.push(statPromise)
    //   //   .then((statResult) => {
    //   //     console.log('>>>', file, statResult)
    //   //   })
    //   //   .catch((err) => {
    //   //     console.log('!!!', err)
    //   //   })
    // }
    // console.log('for each finished')
    // return Promise.all(promises)

    console.log('0')


    const results = files.map(f => {
      console.log('1')
      return fs.promises.stat(path.join(dataPath, f))
      // return fs.promises.stat(path.join(dataPath, f + '111')) 
        .then(statResult => {
          console.log('3')
          return {
            name: f,
            ctime: statResult.ctime,
            size: statResult.size,
          }
        })
    })

    console.log('2')
    return Promise.all(results)
  })
  .then((datas)=> {
    console.log('4')
    console.log('>>', datas)

    console.log('a')
    const results = datas.map(data => {
      console.log('b')
      return fs.promises.readFile(path.join(dataPath, data.name), {encoding: 'utf-8'})
        .then(content => {
          console.log('d')
          data.content = content
          return data
        })
    })
    console.log('c')
    return Promise.all(results)
  })
  .then(datas => {
    console.log('e')
    console.log('>>>>', datas)
  })
  .catch((err) => {
    console.log('!!', err)
  })
