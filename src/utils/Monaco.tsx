export function handleEditorDidMount(_, monaco) {
    monaco.editor.defineTheme('my-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#202124',
        },
    });
    monaco.editor.setTheme('my-theme');
}