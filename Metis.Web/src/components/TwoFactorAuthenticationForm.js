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
            <div class="card mt-4" id="2fa">
                <div class="card-header d-flex">
                    <h5 class="mb-0">Two-factor authentication</h5>
                    <span class="badge badge-success ms-auto mb-auto">Enabled</span>
                </div>
                <div class="card-body">
                    <div class="d-flex">
                        <p class="my-auto">Security keys</p>
                        <p class="text-secondary text-sm ms-auto my-auto me-3">No Security Keys</p>
                        <button class="btn btn-sm btn-outline-dark mb-0" type="button">Add</button>
                    </div>
                    <hr class="horizontal dark" />
                    <div class="d-flex">
                        <p class="my-auto">SMS number</p>
                        <p class="text-secondary text-sm ms-auto my-auto me-3">+4012374423</p>
                        <button class="btn btn-sm btn-outline-dark mb-0" type="button">Edit</button>
                    </div>
                    <hr class="horizontal dark" />
                    <div class="d-flex">
                        <p class="my-auto">Authenticator app</p>
                        <p class="text-secondary text-sm ms-auto my-auto me-3">Not Configured</p>
                        <button class="btn btn-sm btn-outline-dark mb-0" type="button">Set up</button>
                    </div>
                </div>
            </div>
        )
    }
}