import React, { Component } from 'react';
import UserService from '../services/UserService';
import UserBasicInfoForm from '../components/UserBasicInfoForm';
import PasswordChangeForm from '../components/PasswordChangeForm';
// import TwoFactorAuthenticationForm from '../components/TwoFactorAuthenticationForm';
// import SocialAccountsForm from '../components/SocialAccountsForm';
// import NotificationForm from '../components/NotificationForm';
import JwtService from '../services/JwtService';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileImage: '',
            firstName: '',
            lastName: ''
        }
        this.onClickDelete = this.onClickDelete.bind(this)
    }
    componentDidMount() {
        UserService
            .getCurrentUser()
            .then(user => {
                this.setState({
                    profileImage: user.profileImage,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role : user.role
                })
            })
    }
    onClickDelete = () => {
        UserService
            .deleteCurrentUser()
            .then(() => {
                JwtService.removeToken();
                this.props.history.push('/login');
            })
    }
    render() {
        return (
            <div className="col-lg-12 mt-lg-0 mt-4">
                <div className="card card-body" id="profile">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-sm-auto col-4">
                            <div className="avatar avatar-xl position-relative">
                                <img src={this.state.profileImage} alt="bruce" className="w-100 rounded-circle shadow-sm" />
                            </div>
                        </div>
                        <div className="col-sm-auto col-8 my-auto">
                            <div className="h-100">
                                <h5 className="mb-1 font-weight-bolder">{this.state.firstName}</h5>
                                <p className="mb-0 font-weight-normal text-sm">{this.state.lastName} / {this.state.role}</p>
                            </div>
                        </div>
                        {/* <div className="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
                            <label className="form-check-label mb-0">
                                <small id="profileVisibility">Switch to invisible</small>
                            </label>
                            <div className="form-check form-switch ms-2 my-auto">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault23" checked="" />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="card-header">
                        <h5>Basic Info</h5>
                    </div>
                    <div className="card-body pt-0">
                        <UserBasicInfoForm />
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="card-header">
                        <h5>Change Password</h5>
                    </div>
                    <div className="card-body pt-0">
                        <PasswordChangeForm />
                    </div>
                </div>
                {/* <TwoFactorAuthenticationForm />
                <SocialAccountsForm />
                <NotificationForm /> */}
                <div className="card mt-4" id="delete">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-sm-0 mb-4">
                            <div className="w-50">
                                <h5>Delete Account</h5>
                                <p className="text-sm mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                            </div>
                            <div className="w-50 text-end">
                                {/* <button className="btn btn-outline-secondary mb-3 mb-md-0 ms-auto" type="button" name="button">Deactivate</button> */}
                                <button className="btn bg-gradient-danger mb-0 ms-2" type="button" name="button" onClick={this.onClickDelete}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}