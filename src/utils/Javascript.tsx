import customEval from "./CustomEval";

export function processBeforeEval(linesBefore, currentLine) {
  currentLine = currentLine.replace(/console.log/g, "").replace(/alert/g, "");

  return `${linesBefore}\n${currentLine}`;
}

export async function evalJsLines(lines: string) {
  if (!lines) return "";
  const linesResult = [];

  let concatenatedStatements = "";
  let lastErrorMsg;

  const onWindows = window.navigator.userAgent.includes("indows");
  const splittedLines = lines.split(onWindows ? "\r\n" : "\n" );

  for (const line of splittedLines) {
    try {
      concatenatedStatements = processBeforeEval(concatenatedStatements, line);

      const result = await customEval(concatenatedStatements);

      if (!window.python) {
        concatenatedStatements += ";'';";
      }

      linesResult.push(result);
    } catch (error: unknown) {
      if (window.python) continue;

      if (!(error instanceof Error)) continue;

      const errorMsg = error.message;

      if (errorMsg === "Unexpected end of input") continue;
      linesResult.push("");

      if (
        lastErrorMsg === errorMsg ||
        errorMsg === "Invalid or unexpected token"
      )
        continue;
      linesResult.push("^ " + error);

      lastErrorMsg = errorMsg;
    }
  }
  return linesResult.join(`\n`);
}
