const core = require('@actions/core');
const { Octokit } = require('@octokit/core');
const { context } = require('@actions/github');
const {
  paginateRest,
  composePaginateRest,
} = require('@octokit/plugin-paginate-rest');

async function main() {

    const owner        = core.getInput('owner');
    const repo         = core.getInput('repo');
    const token        = core.getInput('github-token', { required: true });
    const draft        = core.getInput('draft');
    const prerelease   = core.getInput('prerelease');
    const from_release = core.getInput('from_release');
    const nb_results   = core.getInput('nb_results');

    const MyOctokit = Octokit.plugin(paginateRest);
    const octokit = new MyOctokit({ auth: 'token ' + token });
    
    const result = await octokit.paginate('GET /repos/{owner}/{repo}/releases', {
      owner: owner,
      repo: repo,
      per_page: 100
    });

    let releases = result.filter(
        release => String(release.draft).toLowerCase() === draft && String(release.prerelease).toLowerCase() === prerelease
    ).map(release => release.name).reverse();

    if (nb_results && from_release) {
	releases = releases.slice(releases.indexOf(from_release), releases.length);
        releases = releases.slice(0, nb_results);
    } else if (nb_results) {
        releases = releases.slice(releases.length - nb_results, releases.length);
    } else if (from_release) {
        releases = releases.slice(releases.indexOf(from_release), releases.length);
    } else {
        releases = releases.slice(releases.length - 1, releases.length);
    }

    core.setOutput('releases', releases);

}

main().catch(err => core.setFailed(JSON.stringify(err)));
