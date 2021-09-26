import { createSlice } from '@reduxjs/toolkit';
const formsSlice = createSlice({
	name: 'forms',
	initialState: {},
	reducers: {
		/**
		 * initializes a new form in the store
		 * @param {{payload:{formId:string,fields:string[], disabled:boolean}}} action 
		 */
		initForm: (state, action) => {
			const { formId, fields = [], disabled = false } = action.payload;
			let values = {};
			fields.forEach(field => values[field] = null);
			state[formId] = { values, disabled };
		},
		/**
		 * Update a single field for a single form
		 * @param {{payload:{formId:string, field:string, value:any}}} action 
		 */
		updateField: (state, action) => {
			const { formId, field, value } = action.payload;
			state[formId].values[field] = value;
		},
		/**
		 * Changes the disabled state of a specific form
		 * @param {{payload:{formId:string}}} action 
		 */
		disableForm: (state, action) => {
			const { formId } = action.payload;
			state[formId].disabled = true;
		},
		/**
		 * Changes the disabled state of a specific form
		 * @param {{payload:{formId:string}}} action 
		 */
		enableForm: (state, action) => {
			const { formId } = action.payload;
			state[formId].disabled = false;
		}
	}
});
export const {
	initForm,
	updateField,
	disableForm,
	enableForm
} = formsSlice.actions;

export default formsSlice.reducer;