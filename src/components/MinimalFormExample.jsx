import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateField, initForm } from "../app/features/forms/formsSlice";
import CustomForm from "./CustomForm/CustomForm";

export default function MinimalFormExample() {
	const formId = 'custom-form-minimal';
	const dispatch = useDispatch();
	useEffect(() => {
		console.log("effect");
		dispatch(initForm({ formId }));
	}, [dispatch]);
	const fields = useMemo(() => [
		{ type: 'text', name: 'normal-input' },
		{ type: 'checkbox', name: 'normal-checkbox' },
		{ type: 'select', name: 'normal-select', options: ['option 1', 'option 2', 'option 3'] }
	], []);

	const onFieldChange = useCallback((config, value, e) => {
		dispatch(updateField({ formId, field: config.name, value }));
	}, [dispatch]);

	const onSubmit = useCallback((e) => {
		e.preventDefault();
	}, []);

	return (
		<CustomForm
			title="Minimal Form Example"
			fields={fields}
			onFieldChange={onFieldChange}
			onSubmit={onSubmit}
		/>
	);

}
