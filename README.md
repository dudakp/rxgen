rxgen - Redux boilerplate code generator
=======

Still in develoment, working action types,
action creators and reducer generation for synchronous actions.

# Installation:
### `npm install` to download node modules
### `npm link` to create symlink  
(to use `rxgen` anywhere in your system)

# Usage:
### `rxgen` to start.  
 You will be asked to type action types.  
 Use camelCase, kebab-case, snake*case, etc... for your action types,
they will be transformed to respective case based on context.  
 You will be provided with \_actionTypes.js* file containing action types constants.  
### `rxgen g-creators` to generate action creators
Based on _actionTypes.js_ action creators will be generated to  
 _actionCreators.js_ file.
### `rxgen g-reducer` to generate reducer
Based on _actionTypes.js_ reducer will be generated to  
 _reducer.js_ file.
