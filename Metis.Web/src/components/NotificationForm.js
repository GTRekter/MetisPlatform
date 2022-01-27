import React, { Component } from 'react';

export default class NotificationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        return (

            <div className="card mt-4" id="notifications">
                <div className="card-header">
                    <h5>Notifications</h5>
                    <p className="text-sm">Choose how you receive notifications. These notification settings apply to the things you are watching.</p>
                </div>
                <div className="card-body pt-0">
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th className="ps-1" colspan="4">
                                        <p className="mb-0">Activity</p>
                                    </th>
                                    <th className="text-center">
                                        <p className="mb-0">Email</p>
                                    </th>
                                    <th className="text-center">
                                        <p className="mb-0">Push</p>
                                    </th>
                                    <th className="text-center">
                                        <p className="mb-0">SMS</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="ps-1" colspan="4">
                                        <div className="my-auto">
                                            <span className="text-dark d-block text-sm">Mentions</span>
                                            <span className="text-xs font-weight-normal">Notify when another user mentions you in a comment</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault11" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault12" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault13" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="ps-1" colspan="4">
                                        <div className="my-auto">
                                            <span className="text-dark d-block text-sm">Comments</span>
                                            <span className="text-xs font-weight-normal">Notify when another user comments your item.</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault14" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault15" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault16" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="ps-1" colspan="4">
                                        <div className="my-auto">
                                            <span className="text-dark d-block text-sm">Follows</span>
                                            <span className="text-xs font-weight-normal">Notify when another user follows you.</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault17" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault18" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault19" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="ps-1" colspan="4">
                                        <div className="my-auto">
                                            <p className="text-sm mb-0">Log in from a new device</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault20" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault21" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                                            <input className="form-check-input" checked="" type="checkbox" id="flexSwitchCheckDefault22" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}