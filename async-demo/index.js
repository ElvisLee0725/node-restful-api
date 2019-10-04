getUser(1, getRepositories);

function getRepositories(user) {
    getRepositories(user.gitHubName, getCommit);
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading from database');
        callback({id: id, gitHubName: 'elvislee'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 1000);
}