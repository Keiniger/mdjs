import { createSlice } from '@reduxjs/toolkit'

const markup = "markup";

export enum MarkupLanguages {
    markdown = "markdown",
    pug = "pug",
    asciidoc = "asciidoc",
    orgmode = "orgmode",
    html = "html",
    jsx = "jsx"
}

export const markupSlice = createSlice({
    name: markup,
    initialState: {
        value: ""
    },
    reducers: {
        updatedMarkup: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updatedMarkup } = markupSlice.actions

export const selectMarkup = (state) => state[markup].value;

export default markupSlice.reducer
