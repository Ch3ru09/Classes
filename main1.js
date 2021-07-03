const fs = require("fs")
const path = require("path")

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
    const name = fs.readdir(myPath, (err, name) => {
        const result = []
        
        name.forEach((name, index) => 

            fs.stat(path.join(myPath, name), (err, stats) => {
                stats = stats

                const time = stats.ctime
                const size = stats.size
                
                fs.readFile(path.join(myPath, name), 'utf-8',(err, content) => {
                        
                    result.splice(
                        whichIndex(name),
                        0,
                    {
                        name ,
                        size ,
                        time ,
                        content ,
                    });
                    
                    if (index == 2) {
                        cb(result)
                    };
                    return
                })

            })
        )
    })
};
var cb
fileInfo("./main/", function cb(result, i) {

    console.log(">> ", result);
    
})

