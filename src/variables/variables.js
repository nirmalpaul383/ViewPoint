export const variablesDB = {};

// Valid JS variable name (full check)
const validVarName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

export function setVariable(name, value, { override = true } = {}) {

  // Name validation
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Variable Name Error: Name must be a non-empty string");
  }

  if (!validVarName.test(name)) {
    throw new Error(`Variable Name Error: '${name}' is not a valid variable name`);
  }

  // Value validation
  if (value === undefined) {
    throw new Error(`Variable Value Error: '${name}' cannot be undefined`);
  }

  // Prevent overwrite (optional)
  if (!override && name in variablesDB) {
    throw new Error(`Variable '${name}' already exists`);
  }

  variablesDB[name] = value;
}