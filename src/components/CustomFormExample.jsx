import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateField, disableForm, enableForm, initForm } from "../app/features/forms/formsSlice";
import CustomForm from "./CustomForm/CustomForm";

export default function CustomFormExample() {
	const formId = 'custom-form';
	const form = useSelector(state => state.forms[formId]);
	const dispatch = useDispatch();
	const renderText = ({ config, onFieldChange }) => {
		return <div>
			<label id="my-label">My own Label</label>
			<input
				name={config.name}
				type="email"
				id="my-label"
				placeholder="my own input"
				// can use config.onChange if supplied
				onChange={(e) => onFieldChange(config, e.target.value, e)} />
		</div>;
	};

	const fields = useMemo(() => [
		{ type: 'text', name: 'normal-input', label: "Simple text input" },
		{ type: 'password', name: 'password-input', label: "Password works too" }, // will work
		{ type: 'number', placeholder: 'Enter a number', name: 'number-input', label: "Number work too" }, // will work
		{ type: 'checkbox', name: 'normal-checkbox', label: "Cool checkbox" },
		{ type: 'text', name: 'with-render', label: "Custom Text", render: renderText },
		{ type: 'select', name: 'normal-select', placeholder: "select placeholder", options: ['option 1', 'option 2', 'option 3'] },
		// with individual on change - in this example store is not updated
		{ type: 'checkbox', name: 'test', label: "individual onChange", onChange: (config, value, e) => alert(value) }
	], []);

	useEffect(() => {
		if (!form) {
			dispatch(initForm({ formId, fields: fields.map(x => x.name), disabled: true }));
			return;
		}
		if (fields.every(({ name }) => !!form.values[name])) {
			dispatch(enableForm({ formId }));
			return;
		}
		dispatch(disableForm({ formId }));
	}, [form, fields, dispatch]);

	const onFieldChange = useCallback((config, value, e) => {
		dispatch(updateField({ formId, field: config.name, value }));
	}, [dispatch]);

	const onSubmit = useCallback((e) => {
		e.preventDefault();
		// submit form;
	}, []);

	return (
		<CustomForm
			title="Example form 2"
			fields={fields}
			onFieldChange={onFieldChange}
			onSubmit={onSubmit}
			submitDisabled={form?.disabled} />
	);
}