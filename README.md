# Hello world javascript action

Validates if a trello card URL is found in the PR description and that card is found on Trello.com

## Inputs

### `pr-description`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `is-included`

A boolean that is only true if a trello card URL is found and that card is found on Trello.com

## Example usage

```yaml
uses: actions/hello-world-javascript-action@v1.1
with:
  pr-description: ${{ github.event.pull_request.body }}
```