var JiraClient = require("jira-connector");

// Initialize
var jira = new JiraClient({
  host: process.env.host,
  strictSSL: false, // One of optional parameters
  basic_auth: {
    username: process.env.email,
    password: process.env.password
  }
});

exports.getIssues = function getIssues(cb) {
    jira.search.search({
      jql: process.env.jql,
    }, (error, issue) => {
      
         console.log("Status:");
         console.log("Number of Tickets: " +  issue.issues.length);
         console.log("***************************************");

         ticketsArr = [];

         for (var i = 0; i <  issue.issues.length; i++) {
            var ticket = [];
            ticket[0]=issue.issues[i].key

            issue.issues[i].fields.assignee ? ticket[1]=issue.issues[i].fields.assignee.displayName : ticket[1]="" // falsy value

            //ticket[1]=issue.issues[i].fields.assignee.displayName
            ticket[2]=issue.issues[i].fields.status.name
            ticket[3]=issue.issues[i].fields.issuetype.name
            ticket[4]=issue.issues[i].fields.summary

            // sprintField=String(issue.issues[i].fields.customfield_10006)
            // index=sprintField.indexOf("UMP Core - Sprint");
            // sprintCut=sprintField.substring(index+10,index+20);
            // console.log (sprintCut)
            // ticket[5]=issue.issues[i].fields.customfield_10006
            ticket[5]=process.env.sprint_number

            //console.log(ticket)

            ticketsArr.push(ticket);
         }
         cb(ticketsArr);
      }
    );
  }
