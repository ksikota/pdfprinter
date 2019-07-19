var checker =function() {
    const fs = require('fs');
    const moment = require('moment');
        path = 'C:/Users/kuhles/Downloads/touch.txt'

    fs.stat(path, (err, stat) => {
        console.log(stat.mtime);
        console.log(new Date());
        var datetime = stat.mtime;

        var localTime = moment();
        var otherTime = moment(datetime);

        if (localTime.diff(otherTime, 'milliseconds') >=30000){
            startpdfprint();
        }
    })

};

var startpdfprint =function(){
        const { execFile } = require('child_process');
        const child = execFile('node', ['C:/Users/kuhles/Downloads/print.js'], (error, stdout, stderr) => {
            if (error) {
                throw error;
                // postme(error);
            }
        });


}
setInterval(function(){ checker() }, 60000);
checker();