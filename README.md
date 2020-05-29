# Hunter Larco

![](https://github.com/hunterlarco/hunterlarco.com/workflows/ci/badge.svg)
![](https://github.com/hunterlarco/hunterlarco.com/workflows/pre-commit/badge.svg)

## Build Setup

To ensure that you're correctly configured to develop in this repository,
please run execute the following installs + configuration.

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
