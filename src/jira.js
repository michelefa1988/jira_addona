var JiraClient = require("jira-connector");

// Initialize
var jira = new JiraClient({
  host: process.env.host,
  //host: "support.netrefer.com",
  strictSSL: true, // One of optional parameters
  basic_auth: {
    username: process.env.email,
    password: process.env.password
  }
});

exports.getIssues = function getIssues(cb) {
    jira.search.search({
      //jql: 'project = UMP AND issuetype in subTaskIssueTypes() AND assignee in ("michele.fenechadami@netrefer.com")'
      //jql: 'project = UMP AND issuetype in subTaskIssueTypes()'
      jql: 'project = Michele'
    }, (error, issue) => {
         console.log("siza : " +  issue.issues.length);
         console.log("TicketName : " +  issue.issues[1].key);
         cb(issue.issues);
      }
    );
     
  }

  // ES5
  jira.issue.getIssue(
    {
      issueKey: "MFA-1"
      //issueKey: "UMP-677"
    },
    function(error, issue) {
      //console.log(issue.fields.summary);
    }
  );

