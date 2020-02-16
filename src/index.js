var request = require('request');
require('dotenv').config()

// var login = require('./src/Login.js');
// var issues = require('./src/GetIssues.js');
// var ExportToPDF = require('./src/ExportToPDF');
//var CompareChanges = require('./CompareChanges.js');
// var conf = require('./src/config.js');


ArrayToExport = [];

function LaunchPrintScript(){
  var spawn = require("child_process").spawn,child;
  var arg = "./print.ps1 -path " + __dirname + "\\" + conf.PDF_Name
  child = spawn("powershell.exe", [arg]);
  child.stdout.on("data",function(data){
      console.log("Powershell Data: " + data);
  });
  child.stderr.on("data",function(data){
      console.log("Powershell Errors: " + data);
  });
  child.on("exit",function(){
      console.log("Powershell Script finished");
  });
  child.stdin.end(); //end input
}

function HelpNeeded() {
    if (process.argv.indexOf("--help") != -1) { //does our flag exist?
        console.log("------------------------------------------------------------------------------------------");
        console.log("Jira helper tool");
        console.log("");
        console.log("-email --> Enter valid youtrack email address");
        console.log("-pass --> Enter a valid youtrack password");
        console.log("-sprint --> Enter a valid youtrack sprint number eg 31");
        console.log("-changes --> Record only Changes");
        console.log("-print --> Launches powershell script which prints pdf");
        console.log("------------------------------------------------------------------------------------------");
        return true;
    }
    return false;
}

var jira = require('./jira.js');
//jira1 = new jira()
jira.getIssues( function(cb){
    console.log(cb);
  });




//if help flag is mot needed -> begin processeing
if (!HelpNeeded()) {
    console.log("Help is not needed")

    //jira.logon(function(err, setcookie) {
    //     if (!err) {
    //         var options = {
    //             url: 'https://zettabox.myjetbrains.com/youtrack/rest/admin/project',
    //             headers: {
    //                 'Cookie': setcookie.join(" ; "),
    //             }
    //         };
    //         var ticketsArr = [];
    //         issues.getIssues(function(error, ticketsArr) {
    //             console.log("********CALLBACK*********************");


    //             //if changes parameter is present
    //             if (process.argv.indexOf("-changes") != -1) {
    //                  CompareChanges.processChanges(function(cb) {
    //                    ArrayToExport = cb;
    //                    ExportToPDF.writetoPDF(true);
    //                  });
    //             }
    //             else {
    //               ArrayToExport = ticketsArr;
    //               ExportToPDF.writetoPDF(false);
    //             }
    //             if (process.argv.indexOf("-print") != -1) {
    //               LaunchPrintScript();

    //             }
    //         });
    //     }
     //});
}

//exports.ArrayToExport = ArrayToExport;
