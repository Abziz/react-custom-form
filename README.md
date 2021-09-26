# react-custom-form component

### Installation
1. clone the repository
2. run `npm install`
3. run `npm start`

### Usage 

1. Quick setup
```jsx
	<CustomForm
		title="Form Example"
		fields={[
			{ type: 'text', name: 'normal-input' },
			{ type: 'checkbox', name: 'normal-checkbox' },
			{ type: 'select', name: 'normal-select', options: ['option 1', 'option 2', 'option 3'] }
		]}
		onFieldChange={(fieldConfig,value,event)=>{...}}
		onSubmit={(event)=>{...}}
	/>
```

1. Check the link for [Advanced usage](src/components/CustomFormExample.jsx)