import { createSlice } from '@reduxjs/toolkit'

const text = "text";

export const textSlice = createSlice({
    name: text,
    initialState: {
        value: ""
    },
    reducers: {
        updatedText: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updatedText } = textSlice.actions

export const selectText = (state) => state[text].value;

export default textSlice.reducer