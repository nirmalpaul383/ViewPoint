export const externalFunctions = {};

// Add user-defined function
export function addFunction(name, fn) {

  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Function name must be a non-empty string");
  }

  if (typeof fn !== "function") {
    throw new Error("Function must be a valid function");
  }

  if (name in externalFunctions) {
    throw new Error(`Function '${name}' already exists`);
  }

  externalFunctions[name] = fn;
}
