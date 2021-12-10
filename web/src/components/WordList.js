import React, { Component } from 'react'
import SpeechService from '../services/SpeechService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'

export default class WordList extends Component {
    constructor(props) {
        super(props)
        this.onClickPronounceWords = this.onClickPronounceWords.bind(this);
    }
    onClickPronounceWords = (string) => {
        SpeechService.synthesizeSpeech(string);
    }
    render() {
        return (
            <div>
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-secondary opacity-7"></th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Korean</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">English</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Roman</th>
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
                                    <td class="text-center">{word.english}</td>
                                    <td class="text-center">{word.roman}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}