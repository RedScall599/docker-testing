# Branching Strategy

This repository uses a single branch named `testing`. I use `testing` to constantly test new things so that `main` does not break.

## Why I use `testing`

- Isolation: `testing` is a safe sandbox to try experiments, refactors, and risky changes without impacting `main`.
- Fast iteration: makes it easy to commit, run quick tests, and iterate without opening a PR for every small experiment.
- Integration sandbox: allows combining multiple related experiments together to validate they work before promotion.
- Preview & QA: run preview deployments or manual checks from `testing` to verify behavior in a realistic environment.
- Migration & schema safety: validate Prisma migrations and DB changes on `testing` first to catch issues early.
- Checkpointing: tag stable checkpoints on `testing` before merging to `main`.
- Local branching workflow: developers can create short-lived local branches, merge into `testing` when ready, then push to the remote `testing` branch.

When a change has been validated on `testing` (tests pass, manual QA and previews OK), promote it to `main` with a focused PR or merge.

