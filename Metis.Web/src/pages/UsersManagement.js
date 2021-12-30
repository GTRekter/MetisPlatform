import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ReportCard from '../components/ReportCard';
import Pagination from '../components/Pagination';

export default class UsersManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: 0,
            activeUsers: 0,
            displayedUsers: [{ id: 1, firstname: "Ivan", lastname: "Porta", email: "ivan.porta@outlook.com" }],
            page: 0,
            pages: 0
        }
        this.onClickDelete = this.onClickDelete.bind(this)
    }
    onClickDelete = (id) => {
        console.log("Delete user " + id)
    }
    render() {
        let rows = this.state.displayedUsers.map((user, index) =>
            <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{user.firstname} {user.lastname}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{user.email}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    <Link className="btn btn-icon btn-2 btn-link btn-sm mx-2" to='/useredit'>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faEdit} />
                        </span>
                    </Link>
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickDelete(user.id)}>
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
                        <Link className="btn btn-primary" to='/usercreation'>Add user</Link>
                    </div>
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
            </div>
        )
    }
}