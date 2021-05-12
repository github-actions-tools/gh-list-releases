# gh-list-releases

This action tries to list last repository's releases.

## Usage

```yaml
    steps:
      - uses: actions/checkout@v2
      # List last 5 kubernetes ingress-nginx repository's releases from release "NGINX: 0.44.0"
      - uses: github-actions-tools/gh-list-releases@main
        id: list-releases
        with:
          owner: kubernetes
          repo: ingress-nginx
          from_release: "NGINX: 0.44.0"
          nb_results: 5
      - run: |
          for release in `echo ${{ steps.list-releases.outputs.releases }} | jq -r .[]` ; do echo "release: ${release}" ; done
```

## Inputs

|      NAME      |                                         DESCRIPTION                                          | REQUIRED |                DEFAULT                |
|----------------|----------------------------------------------------------------------------------------------|----------|---------------------------------------|
| `draft`        | Include the GitHub draft releases.  Defaults to false.                                       | `false`  | `false`                               |
| `from_release` | The GitHub starting search release.  Defaults to null.                                       | `false`  | `N/A`                                 |
| `github-token` | The GitHub token used to create an authenticated client.  Defaults to github provided token. | `false`  | `${{ github.token }}`                 |
| `nb_results`   | The GitHub release search results count.  Defaults to null.                                  | `false`  | `N/A`                                 |
| `owner`        | The GitHub repo owner.  Defaults to github current repo owner.                               | `false`  | `${{ github.repository_owner }}`      |
| `prerelease`   | Include the GitHub prereleases.  Defaults to false.                                          | `false`  | `false`                               |
| `repo`         | The GitHub repo name.  Defaults to github current repo name.                                 | `false`  | `${{ github.event.repository.name }}` |
| `to_release`   | The GitHub end search release.  Defaults to null.                                            | `false`  | `N/A`                                 |

## Outputs

|    NAME    |              DESCRIPTION               |
|------------|----------------------------------------|
| `releases` | Last GitHub repository's releases list |
