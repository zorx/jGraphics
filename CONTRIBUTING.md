# Contributing

Branches follow a `Topic Branches` convention.

## Types

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

Examples : `feature/add-gulp`, `fix/issue-9732`, `refactor/kernel`

## Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
[<body>]
<BLANK LINE>
[<footer>]
```

Example : `fix(issue-14): plugins order fixed` (no body/footer)

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on github as well as in various git tools.

## Sources

- http://git-scm.com/book/be/v2/Git-Branching-Branching-Workflows#Topic-Branches
- https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md
