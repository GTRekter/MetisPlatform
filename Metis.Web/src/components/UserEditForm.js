import React, { Component } from 'react';
import FormHeader from './FormHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DictionaryService from '../services/DictionaryService';
import LessonService from '../services/LessonService';
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
            dictionary: "",
            dictionaries: [],
            lessons: [],
            selectedLessons: [],
            lessonAdditionFormVisible: false
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDictionary = this.onChangeDictionary.bind(this);
        this.onClickToggleLessonAdditionForm = this.onClickToggleLessonAdditionForm.bind(this);
        this.onClickAddLesson = this.onClickAddLesson.bind(this);
        this.onClickDeleteLesson = this.onClickDeleteLesson.bind(this);
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
                        selectedLessons: response.user.lessons,
                    });
                })
            DictionaryService
                .getDictionaries()
                .then((data) => {
                    this.setState({
                        dictionaries: data
                    })
                    LessonService
                        .getLessonsByDictionaryId(data[0].id)
                        .then(response => {
                            this.setState({
                                lessons: response,
                            });
                        })
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
            .editUser(this.state.id, this.state.firstName, this.state.lastName, this.state.email, this.state.role, this.state.selectedLessons)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    onChangeDictionary = (event) => {
        LessonService
            .getLessonsByDictionaryId(event.target.value)
            .then(response => {
                this.setState({
                    lessons: response,
                    dictionary: event.target.value
                });
            })
    }
    onClickToggleLessonAdditionForm = () => {
        this.setState({
            lessonAdditionFormVisible: !this.state.lessonAdditionFormVisible
        })
    }
    onClickAddLesson = (value) => {
        let selectedLessons = this.state.selectedLessons;
        let lesson = this.state.lessons.filter(lesson => lesson.title === value);
        if (lesson.length > 0) {
            selectedLessons.push(lesson[0]);
        }
        this.setState({
            selectedLessons: selectedLessons,
            lessonAdditionFormVisible: false
        })
    }
    onClickDeleteLesson = (id) => {
        this.setState({
            selectedLessons: this.state.selectedLessons.filter(lesson => lesson.id !== id),
        })
    }
    render() {
        let roles = this.state.roles.map((role, index) =>
            <option key={index} value={role.name}>{role.name}</option>
        )
        let selectedLessonsRows = this.state.selectedLessons.map((lesson, index) => {
            let dictionary = this.state.dictionaries.filter(dictionary => dictionary.id === lesson.dictionaryId);
            return <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{dictionary[0].name}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{lesson.title}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickDeleteLesson(lesson.id)}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                        </span>
                    </button>
                </td>
            </tr>
        })
        let lessons = this.state.lessons.map((lesson) => lesson.title);
        let dictionaries = this.state.dictionaries.map((dictionary, index) =>
            <option key={index} value={dictionary.id}>{dictionary.name}</option>
        )
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
                        <label className='d-block'>Lessons</label>
                        <span className="btn bg-gradient-secondary ms-2 btn-sm" role="button" onClick={() => this.onClickToggleLessonAdditionForm()}>Add lesson</span>
                        <div className={!this.state.lessonAdditionFormVisible ? "d-none" : ""}>
                            <div className="row">
                                <div className="col-12 col-xl-6">
                                    <div className="input-group input-group-static my-3">
                                        <label className="ms-0">Dictionary</label>
                                        <select className="form-control" name="dictionary" value={this.state.dictionary} onChange={this.onChangeDictionary}>
                                            {dictionaries}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6">
                                    <Autocomplete label="Title" suggestions={lessons} onChangeCallback={this.onClickAddLesson} />
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm align-items-center">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Dictionary</th>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Title</th>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedLessonsRows}
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