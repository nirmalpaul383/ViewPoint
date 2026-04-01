export function stringToJS(str, variablesDB) {
    if (typeof str !== "string" || str.length === 0) {
        throw new Error("Invalid input: expected a non-empty string.");
    }

    const firstChar = str[0];
    const lastChar = str[str.length - 1];

    // HEX (0x...)
    if (/^0x[0-9a-fA-F]+n?$/.test(str)) {

        // BigInt hex (0xFFn)
        if (lastChar === 'n') {
            return BigInt(str.slice(0, -1));
        }

        return Number(str);
    }

    if (/^[+-]?(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?n?$/i.test(str)) {

        // BigInt
        if (lastChar === 'n') {
            const numPart = str.slice(0, -1);

            if (numPart.includes('.') || /e/i.test(numPart)) {
                throw new Error(`Invalid BigInt: ${str}`);
            }

            return BigInt(numPart);
        }

        return Number(str);
    }

    if (
        (firstChar === '"' && lastChar === '"') ||
        (firstChar === "'" && lastChar === "'") ||
        (firstChar === '`' && lastChar === '`')
    ) {
        return str.slice(1, -1);
    }

    if (
        firstChar === '"' ||
        firstChar === "'" ||
        firstChar === '`'
    ) {
        throw new Error(`Unmatched or missing quotes: ${str}`);
    }

    if (str === "true") return true;
    if (str === "false") return false;

    if (str in variablesDB) {
        return variablesDB[str];
    }

    throw new Error(
        `${str} is not defined. Use setVariable("${str}", value) first.`
    );
}
export default stringToJS;