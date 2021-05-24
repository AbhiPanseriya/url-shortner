import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import Auth from './Auth/Auth';
import Home from './components/Home'
import PrivateRoute from './util/PrivateRoute';

const App = () => {
	require('dotenv').config()
	// const { id } = useParams({});
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path='/auth' exact component={Auth} />
					<Route path='/:id' component={RedirectUrl} />
					<PrivateRoute path="/">
              			<Home />
					</PrivateRoute>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

const RedirectUrl = () => {
	const { id } = useParams();
	const link = document.createElement('a');
	link.href = `${process.env.REACT_APP_SERVER}/${id}`;
	link.click();
	return '';
}

export default App;

