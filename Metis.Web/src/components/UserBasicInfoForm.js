import React, { Component } from 'react';
import UserService from '../services/UserService';
import LanguageService from '../services/LanguageService';

export default class UserBasicInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            languageId: "",
            languages: [],
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        UserService
            .getCurrentUser()
            .then(user => {
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role : user.role
                })
            })
        LanguageService
            .getLanguages()
            .then((data) => {
                this.setState({
                    languages: data.filter((language) => language.enabled === true),
                    languageId: data.filter((language) => language.enabled === true)[0].id
                })
            })
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
            .editCurrentUser(this.state.firstName, this.state.lastName, this.state.email, this.state.languageId)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        let languages = this.state.languages.map((language, index) =>
            <option key={index} value={language.id}>{language.name}</option>
        )
        return (
            <form className="text-start" onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Language</label>
                            <select className="form-control" name="languageId" value={this.state.languageId} onChange={this.onChangeInput}>
                                {languages}
                            </select>
                        </div>
                    </div>
                    {/* <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Birth Date</label>
                            <input type="date" className="form-control" />
                        </div>
                    </div> */}
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="example@email.com"  name="email" value={this.state.email} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    {/* <div className="col-12 col-md-6">
                        <div className="input-group input-group-static">
                            <label>Your location</label>
                            <input type="text" className="form-control" placeholder="Sydney, A" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static">
                            <label>Phone Number</label>
                            <input type="number" className="form-control" placeholder="+40 735 631 620" />
                        </div>
                    </div> */}
                </div>
                <div className="row mt-4">
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