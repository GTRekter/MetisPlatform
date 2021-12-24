import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default class LanguageList extends Component {
    constructor(props) {
        super(props)
        this.onClickRemoveLanguage = this.onClickRemoveLanguage.bind(this);
    }
    onClickRemoveLanguage = (id) => {
        this.props.onClickRemoveLanguageCallback(id);
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
                            this.props.languages.map((language, index) =>
                                <tr key={index}>
                                    <td className="text-center text-wrap align-middle">{language.name}</td>
                                    <td className="text-center text-wrap align-middle">{language.code}</td>
                                    <td className="text-center text-wrap align-middle">
                                        <button className="btn btn-link text-danger font-weight-normal text-xs mb-0" onClick={() => this.onClickRemoveLanguage(language.id)}>
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