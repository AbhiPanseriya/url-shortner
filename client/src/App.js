import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth/Auth';
import Home from './components/Home';
import PrivateRoute from './util/PrivateRoute';
import RedirectUrl from './components/RedirectUrl';

const App = () => {
	require('dotenv').config()
	// const { id } = useParams({});
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path='/auth' exact component={Auth} />
					<Route path='/:id' >
						<RedirectUrl />
					</Route>
					<PrivateRoute path="/">
              			<Home />
					</PrivateRoute>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;

