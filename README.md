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

Create a simple action creator in one line:

```typescript
import { createAction } from 'typescript-action-creator';

const setLoading = createAction('SET_LOADING');

setLoading(); // { type: 'SET_LOADING' }

```

Or create an action creator with payload in one line:

```typescript
import { createAction } from 'typescript-action-creator';

const setProgress = createAction('SET_PROGRESS', (progress: number) => progress);

setProgress(50); // { type: 'SET_PROGRESS', payload: 50 }
```

In your component you can use this action creators as following:

```typescript jsx

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setLoading } from './actions/setLoading';
import { setProgress } from './actions/setProgress';

const MyComponent = () => {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(setLoading()); // { type: 'SET_LOADING' }
        dispatch(setProgress(50)); // { type: 'SET_PROGRESS', payload: 50 }
    }, [dispatch]);

    return <button onClick={onClick}>Example</button>;
};
```

We also provide a nice `isActionType` method that is useful in reducers. The `isActionType` method is a
[Typescript Type Guard](https://basarat.gitbook.io/typescript/type-system/typeguard): It will check if the
action is a result of the action creator. If so, then the action is automatically type casted to the correct
action type, including the payload.

```typescript jsx
import { Action, isActionType } from 'typescript-action-creator';
import { State } from './State';

import { setLoading } from './actions/setLoading';
import { setProgress } from './actions/setProgress';

const reducer = (state: State, action: Action) => {

    if (isActionType(action, setLoading)) {
        return { ...state, loading: true };
    }

    if (isActionType(action, setProgress)) {
        const progress = action.payload; // This is automatically a number!
        return { ...state, progress };
    }

    return state;
};
```

Each action creator also exports a 'TYPE' property. This can be useful in places where you need
the string type but do not want to use a hardcoded string. For instance when we use Redux Saga's:

```typescript
import { all, takeEvery } from 'redux-saga/effects';
import { createAction } from 'typescript-action-creator';

export const createItem = createAction('CREATE_ITEM');
export const deleteItem = createAction('DELETE_ITEM');
export const updateItem = createAction('UPDATE_ITEM');

function* createItemSaga() { ... }
function* deleteItemSaga() { ... }
function* updateItemSaga() { ... }

export function* itemSaga() {
    yield all([
        takeEvery(createItem.TYPE, createItemSaga),
        takeEvery(deleteItem.TYPE, deleteItemSaga),
        takeEvery(updateItem.TYPE, updateItemSaga),
    ]);
}
```

In a nutshell, here are all the types and what they return:

```typescript
import { Action, createAction, isActionType } from 'typescript-action-creator';

import { State } from './State';

export const setLoading = createAction('SET_LOADING');
export const setProgress = createAction('SET_PROGRESS', (progress: number) => progress);

export type SetLoadingAction = ReturnType<typeof setLoading>; // Action<'SET_LOADING'>
export type SetProgressAction = ReturnType<typeof setProgress>; // Action<'SET_PROGRESS', number>

const setLoadingAction = setLoading(); // { type: 'SET_LOADING' }
const setProgressAction = setProgress(50); // { type: 'SET_PROGRESS', payload: 50 }

console.info(setLoadingAction.type); // 'SET_LOADING'
console.info(setProgressAction.type); // 'SET_PROGRESS'
console.info(setProgressAction.payload); // 50

console.info(setLoading.TYPE); // 'SET_LOADING'
console.info(setProgress.TYPE); // 'SET_PROGRESS'

const reducer = (state: State, action: Action) => {
    if (isActionType(action, setLoading)) {
        return { ...state, loading: true };
    }

    if (isActionType(action, setProgress)) {
        const progress = action.payload; // 50
        return { ...state, progress };
    }

    return state;
};

```
