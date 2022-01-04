import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    function getToken() {
        return sessionStorage.getItem('token') || null;
    }
    return (
        <Route
            {...rest}
            render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;