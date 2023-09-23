export default async function customEval(lines) {
    let result;
    if (window.python) {
        result = pyodide.runPython(lines);
    } else {
        result = eval(lines);
    }

    if (!(result instanceof Promise)) {
        return result instanceof Object ? JSON.stringify(result, null, " ") : result;
    }

    const data = await result;

    if (!data.json) return data;

    const jsonString = await data.json();

    return JSON.stringify(jsonString, null, " ");
}