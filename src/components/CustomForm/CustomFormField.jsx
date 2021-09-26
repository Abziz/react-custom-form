import React, { useMemo, useState } from 'react';
import _uniqueId from 'lodash/uniqueId';
import _debounce from 'lodash/debounce';
import styles from './CustomForm.module.css';
import PropTypes from 'prop-types';

const propTypes = {
	config: PropTypes.shape({

		/** The name of the form field */
		name: PropTypes.string.isRequired,

		/** 
		 * The type of the form field.
		 * Supports 'text' 'checkbox' and 'select'.
		 * If an unknown string is passed, an input element will be created with the corresponding type.
		 * */
		type: PropTypes.string.isRequired,

		/**
		 * The label for the form field 
		 */
		label: PropTypes.string,

		/**
		 * placeholder text for 'text' and 'select' form fields
		 */
		placeholder: PropTypes.string,

		/** 
		 * options array for select form field
		 */
		options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),

		/**
		 * The disabled state of the form field
		 */
		disabled: PropTypes.bool,

		/**
		 * Render prop that will override the default
		 * form field component that is used.
		 */
		render: PropTypes.elementType,

		/**
		 * a handler that will fire uppon changes to the form field.
		 */
		onChange: PropTypes.func,
	})
};

const DefaultFieldLabel = ({ name, label, id }) => {
	return (
		<label htmlFor={id}>
			{label || name}
		</label>
	);
};
const DefaultInputField = ({ config, onFieldChange }) => {
	const [id] = useState(() => _uniqueId('custom-form-field-'));
	const onChange = useMemo(() => {
		const handler = config.onChange || onFieldChange;
		return handler && _debounce((e) => handler(config, e.target.value, e), 100);
	}, [config, onFieldChange]);
	return <div className={styles.input}>
		<DefaultFieldLabel name={config.name} label={config.label} id={id} />
		<input
			disabled={config.disabled}
			name={config.name}
			id={id}
			placeholder={config.placeholder}
			type={config.type}
			onChange={onChange} />
	</div>;
};

const DefaultSelectField = ({ config, onFieldChange }) => {
	const [id] = useState(() => _uniqueId('custom-form-field-'));
	const onChange = useMemo(() => {
		const handler = config.onChange || onFieldChange;
		return handler && _debounce((e) => handler(config, e.target.value, e), 100);
	}, [config, onFieldChange]);
	return <div className={styles.field}>
		<DefaultFieldLabel name={config.name} label={config.label} id={id} />
		<select
			disabled={config.disabled}
			name={config.name}
			className={styles.select}
			onChange={onChange}
		>
			{config.placeholder && <option selected disabled >{config.placeholder}</option>}
			{config.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
		</select>
	</div>;
};

const DefaultCheckboxField = ({ config, onFieldChange }) => {
	const [id] = useState(() => _uniqueId('custom-form-field-'));
	const { name, type, disabled } = config;
	const onChange = useMemo(() => {
		const handler = config.onChange || onFieldChange;
		return handler && _debounce((e) => handler(config, e.target.checked, e), 100);
	}, [config, onFieldChange]);

	return <div className={styles.checkbox}>
		<div>
			<input id={id} name={name} type={type} onChange={onChange} disabled={disabled} />
		</div>
		<DefaultFieldLabel name={config.name} label={config.label} id={id} />
	</div>;
};

const CustomFormField = ({ config, onFieldChange }) => {
	const defaultRenders = useMemo(() => ({
		'text': DefaultInputField,
		'checkbox': DefaultCheckboxField,
		'select': DefaultSelectField
	}), []);
	const Element = config.render || defaultRenders[config.type] || DefaultInputField;
	return <Element config={config} onFieldChange={onFieldChange} />;
};

CustomFormField.propTypes = propTypes;

export default React.memo(CustomFormField);
