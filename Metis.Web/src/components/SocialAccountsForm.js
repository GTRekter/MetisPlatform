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
            <div className="card mt-4" id="accounts">
                <div className="card-header">
                    <h5>Accounts</h5>
                    <p className="text-sm">Here you can setup and manage your integration settings.</p>
                </div>
                <div className="card-body pt-0">
                    <div className="d-flex">
                        <img className="width-48-px" src="../../../assets/img/small-logos/logo-asana.svg" alt="logo_asana" />
                        <div className="my-auto ms-3">
                            <div className="h-100">
                                <h5 className="mb-0">Asana</h5>
                                <p className="mb-0 text-sm">Organize your team</p>
                            </div>
                        </div>
                        <div className="form-check form-switch ms-auto my-auto">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault4" />
                        </div>
                    </div>
                    <hr className="horizontal dark" />
                    <div className="d-flex">
                        <img className="width-48-px" src="../../../assets/img/small-logos/logo-asana.svg" alt="logo_asana" />
                        <div className="my-auto ms-3">
                            <div className="h-100">
                                <h5 className="mb-0">Asana</h5>
                                <p className="mb-0 text-sm">Organize your team</p>
                            </div>
                        </div>
                        <div className="form-check form-switch ms-auto my-auto">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault4" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}