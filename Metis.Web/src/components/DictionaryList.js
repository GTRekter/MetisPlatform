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
        return (
            <div>
                <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center align-middle">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center align-middle">ISO-3166</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.dictionaries.map((dictionary, index) =>
                                <tr key={index}>
                                    <td className="text-center text-wrap align-middle">{dictionary.name}</td>
                                    <td className="text-center text-wrap align-middle">{dictionary.code}</td>
                                    <td className="text-center text-wrap align-middle">
                                        {(() => {
                                            if (!dictionary.primary) {
                                                return (
                                                    <div>
                                                        <button className="btn btn-link text-dark font-weight-normal text-xs mb-0" onClick={() => this.onClickEdit()}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button className="btn btn-link text-danger font-weight-normal text-xs mb-0" onClick={() => this.onClickRemove(dictionary.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        })()}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}