import { createSlice } from '@reduxjs/toolkit'
import { TutorialText } from '../../utils/TutorialText';

const code = "code";

export enum CodeLanguages {
    javascript = "javascript",
    typescript = "typescript",
    python = "python",
    ruby = "ruby",
    rust = "rust",
    scala = "scala",
    haskell = "haskell"
}

type CodeAction = {
    type: string,
    payload: CodeState
}

type CodeState = {
    code: string,
    language: CodeLanguages
}

export const codeSlice = createSlice({
    name: code,
    initialState: {
        code: TutorialText,
        language: CodeLanguages.javascript
    },
    reducers: {
        updatedCode: (state: CodeState, action: CodeAction) => {
            state.code = action.payload.code
        },
        updatedLanguage: (state: CodeState, action: CodeAction) => {
            state.language = action.payload.language
        }
    }
})

export const { updatedCode, updatedLanguage } = codeSlice.actions

export const selectCode = (state) => state[code].code;
export const selectLanguage = (state) => state[code].language;

export default codeSlice.reducer