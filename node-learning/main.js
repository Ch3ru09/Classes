const fs = require("fs");

function getFileInfo(path) {
const Name = fs.readdirSync(path);
    var result = []

    for (let i = 0; i < Name.length; i++) {
        const name = Name[i];
        const stats = fs.lstatSync(path + name);
        const time = stats.ctime;
        const size = stats.size;
        const content = fs.readFileSync(path + name, "utf-8");

        result.push({  
            name ,
            time ,
            size ,
            content
        })
    };
    return result
}


const Info = getFileInfo("./main/");
console.log(Info);

