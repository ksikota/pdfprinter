const fs = require('fs');
let arraylength =0;
var fun =function(){
    if (arraylength == 0){
        function getFilesFromPath(path, extension) {
            let dir = fs.readdirSync( path );
            return dir.filter( elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')));
        }
        const myArray = getFilesFromPath("C:/Users/kuhles/Downloads/", ".pdf")

        arraylength = myArray.length;

        const { execFile } = require('child_process');
        for (let item of myArray) {
            console.log(item);
            const child = execFile('C:/Users/kuhles/Downloads/PDFtoPrinter.exe', [item, "ZDesigner"], (error, stdout, stderr) => {
                if (error) {
                    // throw error;
                    postme(error);

                }
                arraylength--;
                fs.unlink('C:/Users/kuhles/Downloads/'+ [item], function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('File has been Deleted: ' + item);

                });
            });
        }
    }

}
setInterval(function(){ fun() }, 1000);
setInterval(function(){
    fs.writeFile('C:/Users/kuhles/Downloads/touch.txt', 'touched' +(new Date()).getMilliseconds(), function (err) {
        if (err) throw err;
    });
}, 30000);
var postme = function(errors){
    const https = require('https')
    // console.log(errors);
    const data = JSON.stringify(errors)

    const options = {
        hostname: 'messaging.imagemakers.co.za',
        port: 443,
        path: '/api/job_handlers/25/payloads',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log("in");
        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data)
    req.end()
}


