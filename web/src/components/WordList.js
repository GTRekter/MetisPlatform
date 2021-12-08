import React, { Component } from 'react'
import SpeechService from '../services/SpeechService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'

export default class WordList extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
        this.onClickPronounceWords = this.onClickPronounceWords.bind(this);
    }
    onClickPronounceWords = (string) => {
        SpeechService.synthesizeSpeech(string);
    }
    render() {
        return (
            <div className="word-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='w-10'></th>
                            <th className='w-30'>Korean</th>
                            <th className='w-30'>English</th>
                            <th className='w-30'>Roman</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.words.map((word, index) =>
                                <tr key={index} className='align-middle'>
                                    <td>
                                        <button className="btn btn-link mx-1 link-dark" onClick={() => this.onClickPronounceWords(word.korean)}>
                                            <FontAwesomeIcon icon={faVolumeUp} />
                                        </button>
                                    </td>
                                    <td>{word.korean}</td>
                                    <td>{word.english}</td>
                                    <td>{word.roman}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}