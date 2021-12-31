import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit, faBell } from '@fortawesome/free-solid-svg-icons';
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
            selectedUserId: undefined,
            displayedUsers: [],
            page: 0,
            pages: undefined,
            usersPerPage: 20,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        }
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onSubmitEditUser = this.onSubmitEditUser.bind(this);
        this.onSubmitCreationUser = this.onSubmitCreationUser.bind(this);
        this.onClickShowEditForm = this.onClickShowEditForm.bind(this);
        this.onClickToggleEditForm = this.onClickToggleEditForm.bind(this);
        this.onClickToggleCreationForm = this.onClickToggleCreationForm.bind(this);
        this.onClickToggleDeleteModal = this.onClickToggleDeleteModal.bind(this);
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
    onSubmitEditUser() {
        console.log("User edited");
        this.setState({
            editFormVisible: false
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
    onClickToggleCreationForm() {
        this.setState({
            creationFormVisible: !this.state.creationFormVisible,
            editFormVisible: false
        })
    }
    onClickShowEditForm(id) {
        console.log("User selected: " + id);
        this.setState({
            selectedUserId: id,
            creationFormVisible: false,
            editFormVisible: true,
        })  
    }
    onClickToggleEditForm() {
        this.setState({
            creationFormVisible: false,
            editFormVisible: false
        })
    }
    onClickToggleDeleteModal() {
        this.setState({
            deleteModalVisible: !this.state.deleteModalVisible
        })
    }
    onClickDelete = (id) => {
        console.log("Delete user " + id)
    }
    render() {
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
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickToggleDeleteModal(user.id)}>
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
                    <div className="col-12">
                        <button className="btn btn-primary"
                            onClick={() => this.onClickToggleCreationForm()}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.creationFormVisible}>Add user</button>
                    </div>
                    <Collapse in={this.state.editFormVisible}>
                        <div className="col-12 my-3">
                            <div className="card">
                                <div className="card-body">
                                    <UserEditForm id={this.state.selectedUserId} onSubmitCallback={this.onSubmitEditUser} onResetCallback={this.onClickToggleEditForm} />
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
                <Modal show={this.state.deleteModalVisible} onHide={this.onClickToggleDeleteModal}>
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="py-3 text-center">
                                <FontAwesomeIcon className='h1 text-secondary' icon={faBell} />
                                <h4 class="text-gradient text-danger mt-4">Warning</h4>
                                <p>This operation cannot be undone. If you proceed all the data related to the user will be deleted.</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" name="button" className="btn btn-light m-0" onClick={this.onClickToggleDeleteModal}>Cancel</button>
                            <button type="button" name="button" className="btn bg-gradient-primary m-0 ms-2" onClick={this.onClickDelete}>Delete User</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}