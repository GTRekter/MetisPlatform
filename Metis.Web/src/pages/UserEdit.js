import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default class UserEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: ""
        }
        this.onChangeInput = this.onChangeInput.bind(this);
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
    }
    render() {
        return (
            <div className="row mt-4">
                <div className="col-lg-9 col-12 mx-auto mt-5">
                    <div className="card">
                        <div className="card-header p-3 pt-2">
                            <div className="icon icon-lg icon-shape bg-gradient-primary shadow text-center border-radius-xl mt-n4 me-3 float-start">
                                <FontAwesomeIcon className='opacity-10' icon={faUser} />
                            </div>
                            <h6 className="mb-0">Edit User</h6>
                        </div>
                        <div className="card-body pt-2">
                            <form className="text-start" onSubmit={this.onSubmit}>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}