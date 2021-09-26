import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './features/forms/formsSlice';

export default configureStore({
	reducer: {
		forms: formsReducer
	}
});


