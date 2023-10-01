import { useDispatch, useSelector } from "react-redux";
import { CodeLanguages, selectCode, selectLanguage, updatedCode, updatedLanguage } from "../redux/slices/codeSlices";
import { handleEditorDidMount } from "../utils/Monaco";
import { VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react";
import { Editor } from "@monaco-editor/react";
import styles from "./Code.module.scss";

export function Code({ setDisableSetSeconds }) {
    const dispatch = useDispatch();
    const language = useSelector(selectLanguage);
    const code = useSelector(selectCode);

    function handleCodeChange(lines?: string) {
        if (!lines) return;

        dispatch(updatedCode({ code: lines, language }));

        setDisableSetSeconds(false);
    }

    function setLanguage(event: Event) {
        const selectedLanguage = event?.target?.value;

        if (!(selectedLanguage in CodeLanguages)) return;

        dispatch(updatedLanguage({ code, language: selectedLanguage }));
    }

    return <div>
        <Editor
            className="input"
            defaultLanguage={language}
            height="100%"
            width="100%"
            theme="'dark'"
            onMount={handleEditorDidMount}
            onChange={handleCodeChange}
        />
        <VSCodeDropdown
            className={styles.dropdown}
            onChange={(event: Event) => setLanguage(event)}
        >
            {Object.values(CodeLanguages).map((l, i) => <VSCodeOption key={i}> {l}</VSCodeOption>)}
        </VSCodeDropdown>
    </div>
}