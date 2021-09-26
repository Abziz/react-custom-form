import { useSelector } from 'react-redux';
import './App.css';
import CustomFormExample from './components/CustomFormExample';
import MinimalFormExample from './components/MinimalFormExample';

function App() {
	const forms = useSelector(state => state.forms);
	return <div className="flex">
		<div className="flex w-1/2 flex-col p-5 gap-4">
			<MinimalFormExample />
			<CustomFormExample />
		</div>
		<div className="w-1/2">
			<pre><code>{JSON.stringify(forms, null, 2)}</code></pre>
		</div>
	</div>;
}

export default App;
