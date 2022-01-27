import React, { Component } from 'react';

export default class TwoFactorAuthenticationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="card mt-4" id="2fa">
                <div className="card-header d-flex">
                    <h5 className="mb-0">Two-factor authentication</h5>
                    <span className="badge badge-success ms-auto mb-auto">Enabled</span>
                </div>
                <div className="card-body">
                    <div className="d-flex">
                        <p className="my-auto">Security keys</p>
                        <p className="text-secondary text-sm ms-auto my-auto me-3">No Security Keys</p>
                        <button className="btn btn-sm btn-outline-dark mb-0" type="button">Add</button>
                    </div>
                    <hr className="horizontal dark" />
                    <div className="d-flex">
                        <p className="my-auto">SMS number</p>
                        <p className="text-secondary text-sm ms-auto my-auto me-3">+4012374423</p>
                        <button className="btn btn-sm btn-outline-dark mb-0" type="button">Edit</button>
                    </div>
                    <hr className="horizontal dark" />
                    <div className="d-flex">
                        <p className="my-auto">Authenticator app</p>
                        <p className="text-secondary text-sm ms-auto my-auto me-3">Not Configured</p>
                        <button className="btn btn-sm btn-outline-dark mb-0" type="button">Set up</button>
                    </div>
                </div>
            </div>
        )
    }
}