import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default class WordTypeList extends Component {
    constructor(props) {
        super(props)
        this.onClickRemoveWordType = this.onClickRemoveWordType.bind(this);
    }
    onClickRemoveWordType = (id) => {
        this.props.onClickRemoveWordTypeCallback(id);
    }
    render() {
        return (
            <div>
                <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center align-middle">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center align-middle">Description</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.wordTypes.map((wordType, index) =>
                                <tr key={index}>
                                    <td className="text-center text-wrap align-middle">{wordType.name}</td>
                                    <td className="text-center text-wrap align-middle">{wordType.description}</td>
                                    <td className="text-center text-wrap align-middle">
                                        <button className="btn btn-link text-danger font-weight-normal text-xs mb-0" onClick={() => this.onClickRemoveWordType(wordType.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
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