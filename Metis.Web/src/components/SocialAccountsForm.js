import React, { Component } from 'react';

export default class SocialAccountsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div class="card mt-4" id="accounts">
                <div class="card-header">
                    <h5>Accounts</h5>
                    <p class="text-sm">Here you can setup and manage your integration settings.</p>
                </div>
                <div class="card-body pt-0">
                    <div class="d-flex">
                        <img class="width-48-px" src="../../../assets/img/small-logos/logo-asana.svg" alt="logo_asana" />
                        <div class="my-auto ms-3">
                            <div class="h-100">
                                <h5 class="mb-0">Asana</h5>
                                <p class="mb-0 text-sm">Organize your team</p>
                            </div>
                        </div>
                        <div class="form-check form-switch ms-auto my-auto">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault4" />
                        </div>
                    </div>
                    <hr class="horizontal dark" />
                    <div class="d-flex">
                        <img class="width-48-px" src="../../../assets/img/small-logos/logo-asana.svg" alt="logo_asana" />
                        <div class="my-auto ms-3">
                            <div class="h-100">
                                <h5 class="mb-0">Asana</h5>
                                <p class="mb-0 text-sm">Organize your team</p>
                            </div>
                        </div>
                        <div class="form-check form-switch ms-auto my-auto">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault4" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}