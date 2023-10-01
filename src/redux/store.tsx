import { configureStore } from '@reduxjs/toolkit'
import { textSlice } from './slices/textSlice'
import { markupSlice } from './slices/markupSlice'
import { codeSlice } from './slices/codeSlices'

export const store = configureStore({
    reducer: {
        code: codeSlice.reducer,
        text: textSlice.reducer,
        markup: markupSlice.reducer
    }
})