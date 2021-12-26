import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

export default class DictionaryList extends Component {
    constructor(props) {
        super(props)
        this.onClickRemove = this.onClickRemove.bind(this);
    }
    onClickRemove = (id) => {
        this.props.onClickRemoveCallback(id);
    }
    onClickEdit = () => {
        this.props.onClickEditCallback();
    }
    render() {
        let rows = [];
        for (let index = 0; index < this.props.dictionaries.length; index++) {
            let buttons = '';
            if (!this.props.dictionaries[index].primary) {
                buttons = <div>
                    <button className="btn btn-link text-dark font-weight-normal text-xs mb-0" onClick={() => this.onClickEdit()}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-link text-danger font-weight-normal text-xs mb-0" onClick={() => this.onClickRemove(this.props.dictionaries[index].id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            };
            let badge = <span className="badge badge-sm badge-secondary">Disabled</span>
            if(this.props.dictionaries[index].enabled) {
                badge =<span className="badge badge-sm badge-success">Enabled</span>
            }
            rows.push(<tr key={index}>
                <td className="text-center text-wrap align-middle">{this.props.dictionaries[index].name}</td>
                <td className="text-center text-wrap align-middle">{this.props.dictionaries[index].code}</td>
                <td className="align-middle text-center text-sm">
                    {badge}
                </td>
                <td className="text-center text-wrap align-middle">
                    {buttons}          
                </td>
            </tr>);
        }
        return (
            <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center align-middle">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center align-middle">ISO-3166</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center align-middle">State</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}