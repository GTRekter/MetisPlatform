import React, { Component } from 'react';
import UserService from '../services/UserService';

export default class UserBasicInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        UserService
            .editCurrentUserPassword(this.state.password, this.state.newPassword, this.state.confirmNewPassword)
            .then(() => {
                console.log("success");
            })
    }
    render() {
        return (
            <form className="text-start" onSubmit={this.onSubmit}>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="input-group input-group-static my-3">
                            <label>Current password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="input-group input-group-static my-4">
                            <label>New password</label>
                            <input type="password" className="form-control" name="newPassword" value={this.state.newPassword} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="input-group input-group-static my-3">
                            <label>Confirm New password</label>
                            <input type="password" className="form-control" name="confirmNewPassword" value={this.state.confirmNewPassword} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div class="col-12">
                        <h5 class="mt-5">Password requirements</h5>
                        <p class="text-muted mb-2">
                            Please follow this guide for a strong password:
                        </p>
                        <ul class="text-muted ps-4 mb-0 float-start">
                            <li>
                                <span class="text-sm">One special characters</span>
                            </li>
                            <li>
                                <span class="text-sm">Min 6 characters</span>
                            </li>
                            <li>
                                <span class="text-sm">One number (2 are recommended)</span>
                            </li>
                            <li>
                                <span class="text-sm">Change it often</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row mt-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Edit</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}