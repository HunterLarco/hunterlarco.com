# Hunter Larco

Hi! This is my personal website's repo! Since it's unlikely that you're here to
contribute, instead please enjoy this [random cool video][rickrolled] or feel
free to dig into my [machine learning repos][rickrolled].

## Build Setup

```bash
# install dependencies
npm install
```

## Local Development

```bash
# uses webpack-dev-server to build and serve dist/ on port 8080
npm run serve
```

## Code Quality

The prettifier will automaticall run on-commit and on-push via [Husky],
however, if you'd like to automatically prettify files on-write locally, run
`npm run auto-pretty`.

Additionally, please keep CSS properties in sorted-order. Unfortunately I
haven't found a working VueJS template compatible loader or plugin for this.

[husky]: https://github.com/typicode/husky
[rickrolled]: https://www.youtube.com/watch?v=oHg5SJYRHA0
