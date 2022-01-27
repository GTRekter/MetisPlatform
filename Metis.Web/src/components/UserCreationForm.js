import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import LanguageService from '../services/LanguageService';
import LessonService from '../services/LessonService';
import UserService from '../services/UserService';
import RoleService from '../services/RoleService';
import FormHeader from './FormHeader';
import Autocomplete from './Autocomplete';

export default class UserCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            roleId: "",
            enabled: true,
            languageId: 0,
            roles: [],
            languages: [],
            lessons: [],
            selectedLessons: [],
            lessonAdditionFormVisible: false
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onClickToggleLessonAdditionForm = this.onClickToggleLessonAdditionForm.bind(this);
        this.onClickAddLesson = this.onClickAddLesson.bind(this);
        this.onClickDeleteLesson = this.onClickDeleteLesson.bind(this);
    }
    componentDidMount() {
        LanguageService
            .getLanguages()
            .then((data) => {
                this.setState({
                    languages: data.filter((language) => language.enabled === true),
                    languageId: data.filter((language) => language.enabled === true)[0].id
                })
                LessonService
                    .getLessonsByLanguageId(data[0].id)
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
                    roleId: response[0].id
                });
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
    onReset = (event) => {
        event.preventDefault();
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        UserService
            .addUser(this.state.firstname, this.state.lastname, this.state.email, this.state.enabled, this.state.roleId, this.state.languageId, this.state.selectedLessons)
            .then(() => {
                this.props.onSubmitCallback();
                this.setState({
                    firstname: "",
                    lastname: "",
                    email: "",
                    roleId: this.state.roles[0].id,
                    languageId: this.state.languages.filter((language) => language.enabled === true)[0].id
                });
            })
    }
    onClickToggleLessonAdditionForm = () => {
        this.setState({
            lessonAdditionFormVisible: !this.state.lessonAdditionFormVisible
        })
    }
    onChangeLanguage = (event) => {
        this.setState({
            language: event.target.value
        });
        LessonService
            .getLessonsByLanguageId(event.target.value)
            .then(response => {
                this.setState({
                    lessons: response
                });
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
        let selectedLessonsRows = this.state.selectedLessons.map((lesson, index) => {
            let language = this.state.languages.filter(language => language.id === lesson.languageId);
            return <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{language[0].name}</td>
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
        let roles = this.state.roles.map((role, index) =>
            <option key={index} value={role.id}>{role.name}</option>
        )
        let languages = this.state.languages.map((language, index) =>
            <option key={index} value={language.id}>{language.name}</option>
        )
        let lessons = this.state.lessons.map((lesson) => lesson.title);
        let studentRole = this.state.roles.filter((role) => Number(role.id) === Number(this.state.roleId));
        let isStudent = false;
        if(studentRole.length > 0) {
            isStudent = studentRole[0].name.toLowerCase() === "student";
        }
        let lessonSection = <div className="col-12">
            <label className='d-block'>Lessons</label>
            <span className="btn bg-gradient-secondary ms-2 btn-sm" role="button" onClick={() => this.onClickToggleLessonAdditionForm()}>Add lesson</span>
            <div className={!this.state.lessonAdditionFormVisible ? "d-none" : ""}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Language</label>
                            <select className="form-control" name="language" value={this.state.language} onChange={this.onChangeLanguage}>
                                {languages}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <Autocomplete label="Title" suggestions={lessons} onChangeCallback={this.onClickAddLesson} />
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-sm align-items-center">
                    <thead>
                        <tr>
                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Language</th>
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
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12">
                        <FormHeader title="User" action="Creation" subtitle="Enter all the information about the user." />
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChangeInput} />
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
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Roles</label>
                            <select className="form-control" name="roleId" value={this.state.roleId} onChange={this.onChangeInput}>
                                {roles}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-12">
                        <div className="input-group input-group-static my-3">
                            <div className="form-check form-switch ms-1 is-filled">
                                <input className="form-check-input" name="enabled" type="checkbox" value={this.state.enabled} checked={this.state.enabled} onChange={this.onChangeInput} />
                                <label className="form-check-label">Enabled</label>
                            </div>
                        </div>
                    </div>
                    {isStudent ? lessonSection : null}
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Create User</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}