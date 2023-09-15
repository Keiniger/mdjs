import './App.css'
import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx'

function handleEditorDidMount(_, monaco) {
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

async function playgroundContext(lines) {
  const linesResult = [];

  let concatenatedStatements = ''
  let lineNumber = -1
  let lastError;

  for (let line of lines) {
    line = line.replace(/console.log/g, "");
    concatenatedStatements =
      `${concatenatedStatements}\n${line}`;

    let result;
    try {
      result = eval(concatenatedStatements);
      if (result instanceof Promise) {
        const data = await result
        let jsonString;
        if (data.json) {
          jsonString = await data.json()
          result = JSON.stringify(jsonString, null, " ");
        } else {
          result = data;
        };
      }
      if (result instanceof Object) {
        result = JSON.stringify(result, null, " ");
      }
      concatenatedStatements = concatenatedStatements + ";'';";
    } catch (error) {
      if (error.message === "Unexpected end of input") continue;
      linesResult.push('');
      if (error.message === "Invalid or unexpected token") continue;
      if (lastError?.message === error.message) continue;
      result = "^ "+error;
      lastError = error;
    }

    linesResult.push(result);

    lineNumber++;
  }

  return linesResult;
}

function App() {
  const [lines, setLines] = useState([]);
  const [jsLines, setJsLines] = useState('');
  const [mdLines, setMdLines] = useState('');

  function handleEditorChange(value) {
    setLines(value.split('\r\n'))
  }

  function handleEditorChange2(value) {
    setMdLines(value.split('\r\n'))
  }

  useEffect(() => {

    const processLines = async (lines) => {
      let mdLines = [];
      const results = await playgroundContext(lines);

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const currentLineEval = results[lineIndex] || '';

        mdLines.push(<Markdown contentEditable className="line" key={lineIndex} options={{ forceBlock: true }}>{
          // `[${lineIndex + 1}] ` +
          String(currentLineEval).replace(/\n\n/g, '<br>').toString()}</Markdown>)
      }

      setJsLines(results.join(`
`));
      setMdLines(mdLines);
    }

    processLines(lines);

  }, [lines])

  return (
    <div className="container">
      {/* Js input*/}
      <Editor
        className="input"
        width="33vw"
        height="100vh"
        defaultLanguage="typescript"
        theme="'dark'"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
      {/* Js output*/}
      <Editor
        className="input"
        width="33vw"
        height="100vh"
        defaultLanguage="markdown"
        theme="'dark'"
        value={jsLines}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange2}
      />
      {/* Md */}
      <div className="output">
        {mdLines}
      </div>
    </div>
  )
}

export default App
