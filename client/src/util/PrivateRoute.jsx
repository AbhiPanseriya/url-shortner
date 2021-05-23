import { Route, Redirect } from 'react-router-dom';
import { isAutheticated } from '../Auth/Auth';

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route 
            {...rest} 
            render = { ({ location }) =>
                isAutheticated() ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/auth", state: { from: location } }} />
                )
            }
        />
    )
}

export default PrivateRoute
