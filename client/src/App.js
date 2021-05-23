import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth/Auth';
import Home from './components/Home'
import PrivateRoute from './util/PrivateRoute';

const App = () => {
	require('dotenv').config()
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path='/auth' exact component={Auth} />
					<PrivateRoute path="/">
              			<Home />
            		</PrivateRoute>	
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
