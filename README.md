# Typescript Action Creator

[![NPM](https://badgen.net/npm/v/typescript-action-creator)](https://www.npmjs.com/package/typescript-action-creator)
[![License](https://badgen.net/npm/license/typescript-action-creator)](https://www.npmjs.com/package/typescript-action-creator)
[![Build Status](https://badgen.net/travis/ferdikoomen/typescript-action-creator/master)](https://travis-ci.org/ferdikoomen/typescript-action-creator)
[![Codecov](https://codecov.io/gh/ferdikoomen/typescript-action-creator/branch/master/graph/badge.svg)](https://codecov.io/gh/ferdikoomen/typescript-action-creator)
[![Quality](https://badgen.net/lgtm/grade/javascript/g/ferdikoomen/typescript-action-creator)](https://lgtm.com/projects/g/ferdikoomen/typescript-action-creator)

> Helper that creates simple React and Redux compatible action creators that work well with Typescript.

## Installation

```
npm install typescript-action-creator --save-dev
```

## Example

TODO

```typescript
import { createAction, isActionType } from 'typescript-action-creator';
import { dispatch } from 'redux';

const myAction = createAction('MY_ACTION');

dispatch(myAction());

const reducer = (state: State, action: Action) => {
    if (isActionType(action, myAction)) {
        // Handle your action...
    }
    return state;
}
```
