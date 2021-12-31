import React, { Component } from 'react';
import UserService from '../services/UserService';
import RoleService from '../services/RoleService';

export default class UserEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            roles: []
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.state.id !== undefined) {
            UserService
                .getUserById(this.state.id)
                .then(response => {
                    this.setState({
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        role: response.role
                    });
                })
            RoleService
                .getRoles()
                .then(response => {
                    this.setState({
                        roles: response,
                        role: response[0].name
                    });
                })
        }
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onReset = (event) => {
        event.preventDefault();
        console.log("Reset edit user ")
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        UserService
            .editUser(this.state.id, this.state.firstName, this.state.lastName, this.state.email)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        // let roles = this.state.roles.map((role, index) =>
        //     <option key={index} value={role.name}>{role.name}</option>
        // )
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    {/* <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Roles</label>
                            <select className="form-control" name="role" value={this.state.role} onChange={this.onChangeInput}>
                                {roles}
                            </select>
                        </div>
                    </div> */}
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Edit User</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}