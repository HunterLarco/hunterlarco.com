# Hunter Larco

![](https://github.com/hunterlarco/hunterlarco.com/workflows/ci/badge.svg)
![](https://github.com/hunterlarco/hunterlarco.com/workflows/pre-commit/badge.svg)

## Build Setup

```sh
# Install Git LFS (large file storage).
git lfs install

# Pull files stored in Git LFS (necessary if lfs was installed after clone).
git lfs pull

# Install prettier (https://prettier.io/)
npm install --global prettier

# Install pre-commit (https://pre-commit.com)
sudo -H pip install pre-commit

# Add pre-commit to .github hooks
pre-commit install
```

## Contributing

To ensure that you're correctly configured to develop in this repository,
please run [setup.sh](./setup.sh) before committing.

### Pull Requests

Please submit all contributions via pull requests where your branch matches the
pattern `<username>/<branch-name>`. Mandatory reviewers will be auto-assigned,
however, feel free to add more as needed.
