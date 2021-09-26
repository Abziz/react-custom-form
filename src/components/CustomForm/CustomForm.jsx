
import CustomFormField from './CustomFormField';
import styles from './CustomForm.module.css';
import PropTypes from 'prop-types';

const propTypes = {
	/**
	 * Form fields configuration
	 */
	fields: PropTypes.arrayOf(PropTypes.object).isRequired,
	/** 
	 * on submit handler that will trigger uppon clicking the submit button
	 */
	onSubmit: PropTypes.func,
	/**
	 * on change handler that will trigger uppon the change of any field
	 */
	onFieldChange: PropTypes.func,
};

const CustomForm = ({ title, fields, onSubmit, onFieldChange, submitDisabled }) => {
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<h4>{title}</h4>
			{fields.map((config, i) =>
				<CustomFormField
					key={i}
					config={config}
					onFieldChange={onFieldChange} />)}
			<div className={styles.submit}>
				<button type="submit" disabled={submitDisabled}>
					Submit
				</button>
			</div>
		</form>
	);
};

CustomForm.propTypes = propTypes;

export default CustomForm;