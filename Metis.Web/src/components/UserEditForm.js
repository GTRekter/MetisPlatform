import React, { Component } from 'react';
import UserService from '../services/UserService';

export default class UserEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: ""
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Component did mount");
        if (this.props.id !== undefined) {
            UserService
                .getUserById(this.props.id)
                .then(response => {
                    this.setState({
                        firstname: response.firstname,
                        lastname: response.lastname,
                        email: response.email
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
        console.log("Edit user ")
        this.props.onSubmitCallback();
    }
    render() {
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="input-group input-group-static my-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="username" value={this.state.firstname} onChange={this.onChangeInput} />
                </div>
                <div className="input-group input-group-static my-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.onChangeInput} />
                </div>
                <div className="input-group input-group-static my-3">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChangeInput} />
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                    <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Edit User</button>
                </div>
            </form>
        );
    }
}