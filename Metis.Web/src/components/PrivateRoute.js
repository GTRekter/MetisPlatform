import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwtService from "../services/JwtService";

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => JwtService.getToken() !== null 
                ? <Component {...props} /> 
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;