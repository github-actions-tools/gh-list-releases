# gh-list-releases

This action tries to list last repository's releases.

## Usage

```yaml
    steps:
      # List 5 kubernetes ingress-nginx repository's releases between release "NGINX: 0.44.0" and release "NGINX: 0.44.0"
      # excluding precised ranges and by matching regex_filter value and ignoring from_release parameter value
      - uses: github-actions-tools/gh-list-releases@main
        id: list-releases
        with:
          owner: kubernetes
          repo: ingress-nginx
          from_release: "NGINX: 0.44.0"
          to_release: "NGINX: 0.45.0"
          nb_results: 10
          exclude_ranges: |
            -3
            5
            7-8
            9-
          regex_filter: "/^(?!helm-chart-3.25.0|helm-chart-3.27.0).*/i"
          skip_from_release: true

      - run: |
          echo '${{ steps.list-releases.outputs.releases }}' | jq -r '.[]' | while read release ; do 
            echo "release: ${release}"
          done
```

## Inputs

|        NAME         |                                         DESCRIPTION                                          | REQUIRED |                DEFAULT                |
|---------------------|----------------------------------------------------------------------------------------------|----------|---------------------------------------|
| `draft`             | Include the GitHub draft releases.  Defaults to false.                                       | `false`  | `false`                               |
| `exclude_ranges`    | Exclude ranges from the GitHub releases list result.  Defaults to null.                      | `false`  | `N/A`                                 |
| `from_release`      | The GitHub starting search release.  Defaults to null.                                       | `false`  | `N/A`                                 |
| `github-token`      | The GitHub token used to create an authenticated client.  Defaults to github provided token. | `false`  | `${{ github.token }}`                 |
| `nb_results`        | The GitHub release search results count.  Defaults to null.                                  | `false`  | `N/A`                                 |
| `owner`             | The GitHub repo owner.  Defaults to github current repo owner.                               | `false`  | `${{ github.repository_owner }}`      |
| `prerelease`        | Include the GitHub prereleases.  Defaults to false.                                          | `false`  | `false`                               |
| `regex_filter`      | Match regex (literal notation) in the GitHub releases list result.  Defaults to null.        | `false`  | `N/A`                                 |
| `repo`              | The GitHub repo name.  Defaults to github current repo name.                                 | `false`  | `${{ github.event.repository.name }}` |
| `skip_from_release` | Skip from_release parameter value in the GitHub releases list result.  Defaults to false.    | `false`  | `false`                               |
| `to_release`        | The GitHub end search release.  Defaults to null.                                            | `false`  | `N/A`                                 |

## Outputs

|      NAME       |              DESCRIPTION               |
|-----------------|----------------------------------------|
| `releases_body` | GitHub repository's releases body list |
| `releases`      | GitHub repository's releases list      |
