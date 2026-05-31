# Agent instructions

Before finishing work on this repository, run the site verification script:

```bash
./scripts/verify.sh
```

CI runs the same checks on every pull request and push to `main` (see `.github/workflows/lint.yml`).

**Prerequisites:** Ruby/Bundler, and [yamllint](https://yamllint.readthedocs.io/) (`brew install yamllint`). The script runs `bundle install` when gems are missing.

Do not skip verification when changing `_data/`, layouts, includes, `css/`, `js/`, `photos/`, or `_plugins/`.
