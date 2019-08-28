const generateActionTypes = (desc) => {
  return desc.syncActions.map( action => `const ${action.toUpperCase()} = ${action.toUpperCase()}`);
};

export default generateActionTypes;
