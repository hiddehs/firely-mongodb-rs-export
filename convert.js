var fs = require('fs-extra'),
    readline = require('readline'),
    archiver = require('archiver');

fs.removeSync("export")
fs.mkdirSync("export")
fs.rm("export.zip")

var rd = readline.createInterface({
    input: fs.createReadStream('vonkentries.json'),
    console: false
});

let index = 0;
console.time("convert");

rd.on('line', function(line) {
    const e = JSON.parse(line)
    if(e.res_json){
        // console.log(`[${index}] –– ${e._id.$oid}`); // speeedddd - no extra interrupts!!!
        fs.writeFileSync(`export/${e.type}-${e._id.$oid}.json`, e.res_json)
        index++
    }
});

const archive = () => {
    var output = fs.createWriteStream('export.zip');
    var archive = archiver('zip');
    output.on('close', function () {
        console.log(archive.pointer() + ' (archived) total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        fs.removeSync("export") // remove dir again
    });

    archive.on('error', function(err){
        throw err;
    });

    archive.pipe(output);
    archive.directory('export', false);
    archive.finalize();
}



rd.on('close', ()=>{
    console.log(`[${index}]`);
    console.timeEnd('convert')
    archive()
})


