const fs = require("fs")
const path = require("path")

// xxx
function whichIndex(name) {
    if (name == 'a') {
        return 0
    };
    if (name == 'b') {
        return 1
    };
    if (name == 'c') {
        return 2
    };
}

function fileInfo(myPath, cb){
    // name -> names
    const name = fs.readdir(myPath, (err, name) => {
        const result = []
        
        // let count = 0

        name.forEach((name, index) => 

            fs.stat(path.join(myPath, name), (err, stats) => {
                const time = stats.ctime

                const size = stats.size

                fs.readFile(path.join(myPath, name), 'utf-8',(err, content) => {
                        
                    // result[index] = {
                    //   xxx,
                    //   xxx,
                    // }
                    result.splice(
                        whichIndex(name),
                        0, // 0 -> 1
                    {
                        name ,
                        size ,
                        time ,
                        content ,
                    });
                    
                    // wrong => result.length
                    // if (++count == names.length) {
                    //   cb(null, result)
                    // }
                    if (result[0,1,2] !== undefined) {
                        // cb(null, result)
                        cb(result)
                    };
                    return
                })

            })
        )
    })
};

// cb(err, result)
fileInfo("./main/", function cb(result, i) {
    console.log(">> ", result);
    
})

function cb(err, result) {
  console.log(err, result)
}

fileInfo('./main/', cb)

fileInfo('./main/', (err, result) => {
})

fileInfo('./main/', function (err, result) {
})

