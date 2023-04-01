const core = require('@actions/core');
const github = require('@actions/github');

try {
  const prDescription = core.getInput('pr-description');
  console.log("PR Desc: " + prDescription);
  const trelloRegex = /^https:\/\/trello\.com\/c\/([A-Za-z0-9]+)$/;
  const matches = prDescription.match(trelloRegex);
  if (matches) {
    console.log("We have a regex match for a Trello URL!");
    const cardId = matches[1];
    const trelloUrl = `https://api.trello.com/1/cards/${cardId}?fields=name&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`;
    fetch(trelloUrl)
      .then(response => response.json())
      .then(data => {
        if (data.name) {
          console.log(`Trello story "${data.name}" is valid`);
        } else {
          console.log('Trello story is not valid');
          process.exit(1);
        }
      })
      .catch(error => {
        console.log(error);
        process.exit(1);
      });
  } else {
    console.log('No Trello URL found in PR description');
    process.exit(1);
  }
} catch (error) {
  core.setFailed(error.message);
}


  // // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);