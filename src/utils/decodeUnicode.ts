// src/utils/decodeUnicode.ts
export function decodeUnicode(str: string): string {
    return str.replace(/\\u[\dA-F]{4}/gi, (match) => {
        return String.fromCharCode(parseInt(match.replace(/\\u/, ''), 16));
    });
}
