import './App.css'
import Editor from '@monaco-editor/react';
import { ReactNode, useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx'
import customEval from './utils/CustomEval';

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

function processBeforeEval(linesBefore, currentLine) {
  currentLine = currentLine
    .replace(/console.log/g, "")
    .replace(/alert/g, "");

  return `${linesBefore}\n${currentLine}`;
}

async function evalJsLines(lines: string) {
  if (!lines) return '';
  const linesResult = [];

  let concatenatedStatements = '';
  let lastErrorMsg;

  const splittedLines = lines.split('\r\n')
  for (let line of splittedLines) {
    try {
      concatenatedStatements = processBeforeEval(concatenatedStatements, line);
      const result = await customEval(concatenatedStatements);
      
      if (!window.python) {
        concatenatedStatements += ";'';";
      }

      linesResult.push(result);
    } catch (error: unknown) {
      if(window.python) continue;
      if (!(error instanceof Error)) continue;

      const errorMsg = error.message;

      if (errorMsg === "Unexpected end of input") continue;
      linesResult.push('');

      if (lastErrorMsg === errorMsg || errorMsg === "Invalid or unexpected token") continue;
      linesResult.push("^ " + error);

      lastErrorMsg = errorMsg;
    }
  }

  return linesResult.join(`\n`);
}

function evalMdLines(lines: string): ReactNode[] {
  return lines.split('\n').map((line, i) =>
    <Markdown className="line" key={i} options={{ forceBlock: true }}>
      {String(line).toString()}
    </Markdown>
  );
}


function App() {
  const [jsInput, setJsInput] = useState<string | undefined>('');
  const [jsOutput, setJsOutput] = useState<string | undefined>('');
  const [mdOutput, setMdOutput] = useState<ReactNode>();
  const [seconds, setSeconds] = useState(0);
  const [disableSetSeconds, setDisableSetSeconds] = useState(false);

  function handleJsInputChange(lines?: string) {
    setJsInput(lines);
    setDisableSetSeconds(false);
  }

  function handleJsOutputChange(lines?: string) {
    setJsOutput(lines);
    setDisableSetSeconds(true);
  }

  useEffect(() => {
    const processLines = async (lines?: string) => {
      if (disableSetSeconds) return
      setJsOutput(await evalJsLines(lines));
    }
    processLines(jsInput);
  }, [jsInput, seconds])

  useEffect(() => {
    const mdLines = evalMdLines(jsOutput)
    setMdOutput(mdLines);
  }, [jsOutput])


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="container">
      <Editor
        className="input"
        width="33vw"
        height="100vh"
        defaultLanguage={window.python ? "python" : "javascript"}
        theme="'dark'"
        onMount={handleEditorDidMount}
        onChange={handleJsInputChange}
      />
      <Editor
        className="input"
        width="33vw"
        height="100vh"
        defaultLanguage="markdown"
        theme="'dark'"
        value={jsOutput}
        onMount={handleEditorDidMount}
        onChange={handleJsOutputChange}
      />
      <div className="output">
        {mdOutput}
      </div>
    </div>
  )
}

export default App
