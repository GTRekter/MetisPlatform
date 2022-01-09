import React, { Component } from 'react';
import FormHeader from './FormHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DictionaryService from '../services/DictionaryService';
import UserService from '../services/UserService';
import RoleService from '../services/RoleService';
import Autocomplete from './Autocomplete';

export default class UserEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            roles: [],
            dictionaries: [],
            selectedDictionaries: [],
            dictionaryAdditionFormVisible: false
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickAddDictionary = this.onClickAddDictionary.bind(this);
        this.onClickDeleteDictionary = this.onClickDeleteDictionary.bind(this);
    }
    componentDidMount() {
        if (this.state.id !== undefined) {
            UserService
                .getUserById(this.state.id)
                .then(response => {
                    this.setState({
                        firstName: response.user.firstName,
                        lastName: response.user.lastName,
                        email: response.user.email,
                        role: response.roles[0].name,
                        selectedDictionaries: response.user.dictionaries,
                    });
                })
            DictionaryService
                .getDictionaries()
                .then((data) => {
                    this.setState({
                        dictionaries: data
                    })
                })
                .catch(function (ex) {
                    console.log('Response parsing failed. Error: ', ex);
                });
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
            .editUser(this.state.id, this.state.firstName, this.state.lastName, this.state.email, this.state.role, this.state.selectedDictionaries)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    onClickToggleDictionaryAdditionForm = () => {
        this.setState({
            dictionaryAdditionFormVisible: !this.state.dictionaryAdditionFormVisible
        })
    }
    onClickAddDictionary = (value) => {
        let selectedDictionaries = this.state.selectedDictionaries;
        let dictionary = this.state.dictionaries.filter(dictionary => dictionary.name === value);
        if (dictionary.length > 0) {
            selectedDictionaries.push(dictionary[0]);
        }
        this.setState({
            selectedDictionaries: selectedDictionaries,
            dictionaryAdditionFormVisible: false
        })
    }
    onClickDeleteDictionary = (id) => {
        this.setState({
            selectedDictionaries: this.state.selectedDictionaries.filter(dictionary => dictionary.id !== id),
        })
    }
    render() {
        let roles = this.state.roles.map((role, index) =>
            <option key={index} value={role.name}>{role.name}</option>
        )
        let selectedDictionariesRows = this.state.selectedDictionaries.map((dictionary, index) =>
            <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{dictionary.name}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickDeleteDictionary(dictionary.id)}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                        </span>
                    </button>
                </td>
            </tr>
        )
        let dictionaries = this.state.dictionaries.map((dictionary) => dictionary.name);
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12">
                        <FormHeader title="User" action="Update" subtitle={`Update the information about the user ${this.state.id}.`} />
                    </div>
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
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Roles</label>
                            <select className="form-control" name="role" value={this.state.role} onChange={this.onChangeInput}>
                                {roles}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <label className='d-block'>Dictionaries</label>
                        <span className="btn bg-gradient-secondary ms-2 btn-sm" role="button" onClick={() => this.onClickToggleDictionaryAdditionForm()}>Add dictionary</span>
                        <div className={!this.state.dictionaryAdditionFormVisible ? "d-none" : ""}>
                            <Autocomplete label="Dictionary" suggestions={dictionaries} onChangeCallback={this.onClickAddDictionary} />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm align-items-center">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Name</th>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedDictionariesRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
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