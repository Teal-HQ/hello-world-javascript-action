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


## Testing Locally

### Use Act

Use the [Act](https://github.com/nektos/act) tool to test locally.  Act requires Docker.

Once Done, from the root of this repo you can tun with:

```
act pull_request -e example_bodies/body_with_valid_url.json -s TRELLO_API_KEY=FILL-IN -s TRELLO_API_TOKEN=FILL-IN
```

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
        uses: teal-hq/trello-card-in-pr-validator-action@v1.9
        with:
          pr-description: ${{ github.event.pull_request.body }}
          trello-api-key: ${{ secrets.TRELLO_API_KEY }}
          trello-api-token: ${{ secrets.TRELLO_API_TOKEN }}
      - name: Get the results
        run: echo "The trello inclusion test results were ${{ steps.fetch.outputs.is-included }}"
```
