import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectText, updatedText } from '../redux/slices/textSlice';
import { handleEditorDidMount } from '../utils/Monaco';

export function Text({ setDisableSetSeconds }) {
    const text = useSelector(selectText);
    const dispatch = useDispatch();

    function handleTextChange(lines?: string) {
        dispatch(updatedText(lines));

        setDisableSetSeconds(true);
    }

    return <div>
        <Editor
            className="input"
            defaultLanguage="markdown"
            height="100%"
            width="100%"
            theme="'dark'"
            value={text}
            onMount={handleEditorDidMount}
            onChange={handleTextChange}
        />
    </div>
}