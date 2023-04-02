# Trello Card URL Presence in PR Validator

Validates if a trello card URL is found in the PR description and that the card is found on Trello.com.

## Inputs

### `pr-description`

**Required** The PR Description

### `trello-api-key`

**Required** The Trello API Key for your Trello PowerUp

### `trello-api-token`

**Required** The Trello API Token for your Trello PowerUp


### Desc

Trello authenticates its API using it's PowerUp System.

To generate your own powerup, and credentials, see: https://trello.com/power-ups/admin.


## Outputs

### `is-included`

A boolean that is only true if a trello card URL is found and that card is found on Trello.com.

## Example usage in your github workflow

Since the Trello key and token will probably be the same across your repos, consider putting these secrets at the org level in Github.

```yaml
on:
  pull_request:
    types: [opened, edited]

jobs:
  trello_job:
    runs-on: ubuntu-latest
    name: Testing if Trello Card in PR Desc is Valid
    steps:
      - name: Fetch results of Trello Search
        id: fetch
        uses: teal-hq/hello-world-javascript-action@v1.8
        with:
          pr-description: ${{ github.event.pull_request.body }}
          trello-api-key: ${{ secrets.TRELLO_API_KEY }}
          trello-api-token: ${{ secrets.TRELLO_API_TOKEN }}
      - name: Get the results
        run: echo "The trello inclusion test results were ${{ steps.fetch.outputs.is-included }}"
```