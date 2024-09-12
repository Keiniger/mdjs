import { require, install } from './CustomRequire';
import { mdjs } from './MdjsFunctions';

const promiseCache = {};

function normalizeLines(lines) {
    return lines.replace(/;/g, '').replace(/\s+/g, '');

}
function linesInCache() {
    return Object.keys(promiseCache);
}

function isInCache(lines) {
    return linesInCache().includes(normalizeLines(lines))
}

function saveInCache(lines, result) {
    promiseCache[normalizeLines(lines)] = '"' + result + '"';
}

function getFromCache(lines) {
    return promiseCache[normalizeLines(lines)];
}

export default async function customEval(lines: string) {
    let result;
    if (window.python) {
        result = pyodide.runPython(lines);
    } else {
        require;
        install;
        mdjs;

        // if (isInCache(lines)) {
        //     result = getFromCache(lines);
        // }

        result = eval(lines);
    }

    if (!(result instanceof Promise)) {
        return result instanceof Object ? JSON.stringify(result, null, " ") : result;
    }

    let data;
    try {
        data = await result;
        // saveInCache(lines, data);
    } catch (error) {
        console.error(error)
    }

    if (Object.keys(data)) return "";


    let json;
    try {
        json = await data.json();
        const jsonString = JSON.stringify(json, null, " ")
        // saveInCache(lines, jsonString);
        return jsonString;
    }
    catch (error) {
        console.error(error)
    }
}