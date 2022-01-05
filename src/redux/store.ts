import {configureStore} from '@reduxjs/toolkit';
import { appReducers } from './slices';

export default configureStore({
    reducer: appReducers
})