import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faSpellCheck, faLayerGroup, faChalkboardTeacher, faProjectDiagram, faFont, faComments } from '@fortawesome/free-solid-svg-icons'
import JwtService from '../services/JwtService';
import UserService from '../services/UserService';
import defaultUserProfile from '../images/defaultUserProfile.png';

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: false,
            isTeacher: false,
            firstName: '',
            lastName: '',
            profileImage: ''
        }
        this.onClickLogout = this.onClickLogout.bind(this);
    }
    componentDidMount() {
        this.setState({
            isAdmin: JwtService.isAdmin(),
            isTeacher: JwtService.isTeacher()
        })
        UserService
            .getCurrentUser()
            .then(user => {
                this.setState({
                    profileImage: user.profileImage,
                    firstName: user.firstName,
                    lastName: user.lastName
                })
            })
    }
    onClickLogout = () => {
        JwtService.removeToken();
        this.props.history.push('/login');
    }
    render() {
        let adminLinks = <ul className="navbar-nav">
            <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Admin</h6>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/usermanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faUsers} />
                    </div>
                    <span className="nav-link-text ms-1">Users</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/lessonmanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faChalkboardTeacher} />
                    </div>
                    <span className="nav-link-text ms-1">Lessons</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/grammarpointmanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faProjectDiagram} />
                    </div>
                    <span className="nav-link-text ms-1">Grammar Points</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/wordmanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faFont} />
                    </div>
                    <span className="nav-link-text ms-1">Words</span>
                </Link>
            </li>
        </ul>
        let teacherLinks = <ul className="navbar-nav">
            <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Teacher</h6>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/studentmanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faUsers} />
                    </div>
                    <span className="nav-link-text ms-1">Students</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/lessonmanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faChalkboardTeacher} />
                    </div>
                    <span className="nav-link-text ms-1">Lessons</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/grammarpointmanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faProjectDiagram} />
                    </div>
                    <span className="nav-link-text ms-1">Grammar Points</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/wordmanagement'>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className='opacity-10' icon={faFont} />
                    </div>
                    <span className="nav-link-text ms-1">Words</span>
                </Link>
            </li>
        </ul>
        let userProfileSrc = this.state.profileImage ? this.state.profileImage : defaultUserProfile;
        return (
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
                <div className="collapse navbar-collapse w-auto max-height-vh-100 mt-4" id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item mb-2 mt-0">
                            <a data-bs-toggle="collapse" href="#ProfileNav" className="nav-link text-white" aria-controls="ProfileNav" role="button" aria-expanded="false">
                                <img className="avatar" src={userProfileSrc} alt={this.state.firstName} />
                                <span className="nav-link-text ms-2 ps-1">{this.state.firstName}</span>
                            </a>
                            <div className="collapse" id="ProfileNav">
                                <ul className="nav ">
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to='/profile'>
                                            <span className="sidenav-normal ms-3 ps-1"> My Profile </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link text-white" onClick={this.onClickLogout}>
                                            <span className="sidenav-normal ms-3 ps-1"> Logout </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <hr className="horizontal light mt-0" />
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon className='opacity-10' icon={faHome} />
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/dictionary'>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon className='opacity-10' icon={faSpellCheck} />
                                </div>
                                <span className="nav-link-text ms-1">Dictionary</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/lessons'>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon className='opacity-10' icon={faChalkboardTeacher} />
                                </div>
                                <span className="nav-link-text ms-1">Lessons</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/flashcards'>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon className='opacity-10' icon={faLayerGroup} />
                                </div>
                                <span className="nav-link-text ms-1">Flashcards</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/pronunciation'>
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon className='opacity-10' icon={faComments} />
                                </div>
                                <span className="nav-link-text ms-1">Pronunciation</span>
                            </Link>
                        </li>
                    </ul>
                    {this.state.isTeacher ? teacherLinks : null}
                    {this.state.isAdmin ? adminLinks : null}
                </div>
            </aside>
        )
    }
}