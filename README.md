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
