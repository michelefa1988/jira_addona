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
         console.log("Status");
         console.log("Number of Tickets: " +  issue.issues.length);
         console.log("***************************************");

         ticketsArr = [];

         for (var i = 0; i <  issue.issues.length; i++) {
            var ticket = [];
            ticket[0]=issue.issues[i].key
            ticket[1]=issue.issues[i].fields.assignee.displayName
            ticket[2]=issue.issues[i].fields.status.name
            ticket[3]=issue.issues[i].fields.issuetype.name
            ticket[4]=issue.issues[i].fields.summary

            ticketsArr.push(ticket);
         }
         cb(ticketsArr);
      }
    );
  }
