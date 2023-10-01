const libCache = new Set();

export async function require(lib) {
    if (libCache.has(lib)) return;

    try {
        globalThis.define = undefined;
        const response = await fetch(`https://cdn.jsdelivr.net/npm/${lib}`);
        const data = await response.text();
        const library = eval(data + "; exports;");

        libCache.add(lib);

        return library;
    } catch (error) {
        console.error("Error:", error);

        return error;
    }
}

export async function install(lib) {
    if (libCache.has(lib)) return;
    try {
        addImportToImportMap(lib);
        await import(lib);
        libCache.add(lib);
    } catch (error) {
        console.error(`Failed to install ${lib}: ${error.message}`);
    }
}

function addImportToImportMap(packageName) {
    const importMapScript = document.querySelector('script[type="importmap"]');
    if (!importMapScript) return;

    const currentImportMap = JSON.parse(String(importMapScript.textContent));
    currentImportMap.imports[packageName] = "https://cdn.jsdelivr.net/npm/" + packageName;
    importMapScript.textContent = JSON.stringify(currentImportMap, null, 2);
}