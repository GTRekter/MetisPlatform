import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Collapse, Modal } from 'react-bootstrap';
import ReportCard from '../components/ReportCard';
import Pagination from '../components/Pagination';
import UserCreationForm from '../components/UserCreationForm';
import UserEditForm from '../components/UserEditForm';
import UserService from '../services/UserService';

export default class UsersManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: 0,
            activeUsers: 0,
            selectedUser: undefined,
            selectedUserId: undefined,
            displayedUsers: [],
            page: 0,
            pages: undefined,
            usersPerPage: 10,
            searchQuery: '',
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        }
        this.onClickShowCreationForm = this.onClickShowCreationForm.bind(this);
        this.onClickHideCreationForm = this.onClickHideCreationForm.bind(this);
        this.onSubmitCreationUser = this.onSubmitCreationUser.bind(this);

        this.onClickShowEditForm = this.onClickShowEditForm.bind(this);
        this.onClickHideEditForm = this.onClickHideEditForm.bind(this);
        this.onSubmitEditUser = this.onSubmitEditUser.bind(this);

        this.onClickShowDeleteModal = this.onClickShowDeleteModal.bind(this);
        this.onClickHideDeleteModal = this.onClickHideDeleteModal.bind(this);
        this.onClickConfirmDelete = this.onClickConfirmDelete.bind(this);

        this.onClickUpdateUsersByPage = this.onClickUpdateUsersByPage.bind(this);
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
    }
    componentDidMount() {
        UserService
            .getUsersByPage(this.state.page, this.state.usersPerPage)
            .then(response => {
                this.setState({
                    displayedUsers: response
                });
            })
        UserService
            .getUsersCount()
            .then(response => {
                this.setState({
                    users: response,
                    pages: Math.floor(response / this.state.itemsPerPage)
                });
            })
    }

    onClickShowCreationForm() {
        this.setState({
            creationFormVisible: true,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onClickHideCreationForm() {
        this.setState({
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onSubmitCreationUser() {
        UserService
            .getUsersByPage(this.state.page, this.state.usersPerPage)
            .then(response => {
                this.setState({
                    users: this.state.users + 1,
                    displayedUsers: response,
                    creationFormVisible: false
                });
            })
    }

    onClickShowEditForm(id) {
        this.setState({
            selectedUserId: id,
            creationFormVisible: false,
            editFormVisible: true,
            deleteModalVisible: false
        });
    }
    onClickHideEditForm() {
        this.setState({
            selectedUserId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onSubmitEditUser() {
        UserService
            .getUsersByPage(this.state.page, this.state.usersPerPage)
            .then(response => {
                this.setState({
                    displayedUsers: response,
                    editFormVisible: false
                });
            })
    }

    onClickShowDeleteModal(id) {
        this.setState({
            selectedUserId: id,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: true
        });
    }
    onClickHideDeleteModal() {
        this.setState({
            selectedUserId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onClickConfirmDelete = () => {
        UserService
            .deleteUserById(this.state.selectedUserId)
            .then(() => {
                UserService
                    .getUsersByPage(this.state.page, this.state.usersPerPage)
                    .then((response) => {
                        this.setState({
                            users: this.state.users - 1,
                            displayedUsers: response,
                            deleteModalVisible: false
                        });
                    })
            })
    }

    onClickUpdateUsersByPage = (usersPerPage) => {
        UserService
            .getUsersByPage(this.state.page, usersPerPage)
            .then(response => {
                this.setState({
                    displayedUsers: response,
                    usersPerPage: usersPerPage
                });
            })
    }
    onChangeQueryString = (event) => {
        this.setState({
            ...this.state,
            searchQuery: event.target.value
        });
        if (event.target.value === '') {
            UserService
                .getUsersByPage(this.state.page, this.state.usersPerPage, event.target.value)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedUsers: response
                    });
                })
        } else {
            UserService
                .getUsersByPageAndSearchQuery(this.state.page, this.state.usersPerPage, event.target.value)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedUsers: response
                    });
                })
        }
    }

    render() {
        var userPerPageOptions = [];
        for (var index = 1; index <= 4; index++) {
            let value = index * 10;
            userPerPageOptions.push(<li key={index}><span className="dropdown-item pointer" onClick={() => this.onClickUpdateUsersByPage(value)}>{value}</span></li>);
        }
        let rows = this.state.displayedUsers.map((user, index) =>
            <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{user.firstName} {user.lastName}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{user.email}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button"
                        onClick={() => this.onClickShowEditForm(user.id)}
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.editFormVisible}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faEdit} />
                        </span>
                    </button>
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickShowDeleteModal(user.id)}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                        </span>
                    </button>
                </td>
            </tr>
        )
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="Active users" icon={faUser} color="primary" value={this.state.activeUsers} footer={`Total number of users: ${this.state.users}`} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <button className="btn btn-primary"
                            onClick={() => this.onClickShowCreationForm()}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.creationFormVisible}>Add user</button>
                        <div className="dropdown d-inline mx-2">
                            <button className="btn bg-gradient-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Users per page: {this.state.usersPerPage}
                                <FontAwesomeIcon className='text-secondary text-white ms-2' icon={faChevronDown} />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {userPerPageOptions}
                            </ul>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="input-group input-group-outline mb-4">
                            <input type="text" className="form-control" placeholder="Search" name="searchQuery" value={this.state.searchQuery} onChange={(element) => this.onChangeQueryString(element)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Collapse in={this.state.editFormVisible}>
                        <div className="col-12 my-3">
                            <div className="card">
                                <div className="card-body">
                                    <UserEditForm key={this.state.selectedUserId} id={this.state.selectedUserId} onSubmitCallback={this.onSubmitEditUser} onResetCallback={this.onClickHideEditForm} />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <Collapse in={this.state.creationFormVisible}>
                        <div className="col-12 my-3">
                            <div className="card">
                                <div className="card-body">
                                    <UserCreationForm onSubmitCallback={this.onSubmitCreationUser} onResetCallback={this.onClickToggleCreationForm} />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table align-items-center">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Full Name</th>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-3">
                                <Pagination page={this.state.page} pages={this.state.pages} />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.deleteModalVisible} onHide={this.onClickHideDeleteModal}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <FontAwesomeIcon className='h1 text-secondary' icon={faBell} />
                                <h4 className="text-gradient text-danger mt-4">Warning</h4>
                                <p>This operation cannot be undone. If you proceed all the data related to the user will be deleted.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" name="button" className="btn btn-light m-0" onClick={this.onClickHideDeleteModal}>Cancel</button>
                            <button type="button" name="button" className="btn bg-gradient-primary m-0 ms-2" onClick={this.onClickConfirmDelete}>Delete User</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}