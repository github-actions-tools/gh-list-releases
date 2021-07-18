const core = require('@actions/core');
const { Octokit } = require('@octokit/core');
const { context } = require('@actions/github');
const {
  paginateRest,
  composePaginateRest,
} = require('@octokit/plugin-paginate-rest');
const { array } = require('smartarray');


async function main() {

    const owner             = core.getInput('owner');
    const repo              = core.getInput('repo');
    const token             = core.getInput('github-token', { required: true });
    const draft             = core.getInput('draft');
    const prerelease        = core.getInput('prerelease');
    const from_release      = core.getInput('from_release');
    const to_release        = core.getInput('to_release');
    const nb_results        = core.getInput('nb_results');
    const skip_from_release = core.getInput('skip_from_release');
    const start_addition    = skip_from_release === 'true' ? 1 : 0
    const exclude_ranges    = core.getInput('exclude_ranges').replace(new RegExp(require('os').EOL, 'gm'), '\\n');
    const regex_filter      = core.getInput('regex_filter');

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

    let bad_index_error = [];
    if (from_release && (releases.indexOf(from_release) < 0)) {
        bad_index_error.push("from_release doesn't exist");
    }
    if (to_release && (releases.indexOf(to_release) < 0)) {
        bad_index_error.push("to_release doesn't exist");
    }

    if (nb_results && from_release && to_release) {
	releases = releases.slice(releases.indexOf(from_release) + start_addition, releases.indexOf(to_release) + 1);
        releases = releases.slice(0, nb_results);
    } else if (from_release && to_release) {
	releases = releases.slice(releases.indexOf(from_release) + start_addition, releases.indexOf(to_release) + 1);
    } else if (nb_results && to_release) {
	releases = releases.slice(releases.indexOf(to_release) + 1 - nb_results, releases.indexOf(to_release) + 1);
    } else if (nb_results && from_release) {
	releases = releases.slice(releases.indexOf(from_release) + start_addition, releases.length);
        releases = releases.slice(0, nb_results);
    } else if (nb_results) {
        releases = releases.slice(releases.length - nb_results, releases.length);
    } else if (from_release) {
        releases = releases.slice(releases.indexOf(from_release) + start_addition, releases.length);
    } else if (to_release) {
        releases = releases.slice(0, releases.indexOf(to_release) + 1);
    } else {
        releases = releases.slice(releases.length - 1, releases.length);
    }

    if (exclude_ranges) {
        releases = new array(...releases);
        releases.removeRangeList(exclude_ranges);
    }

    if (regex_filter) {
        releases = new array(...releases);
        releases = releases.regexFilter(regex_filter);
    }

    if (bad_index_error.length > 0) {
	throw { 'message': bad_index_error.join(' and ') };
    }

    const releases_body = result.filter(
        release => releases.includes(release.name)
    ).map(release => release.body).reverse();

    core.setOutput('releases', releases);
    core.setOutput('releases_body', releases_body);

}

main().catch(err => core.setFailed(JSON.stringify(err)));
