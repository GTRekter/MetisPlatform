import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

import data from '../data/lesson01.json';

export default class WordList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: []
        }
    }
    componentDidMount() {
        this.loadDictionaryFromFile();
    }
    loadDictionaryFromFile = () => {
        const mappedJson = data.words.map(item => {
            return {
                korean: item.korean,
                english: item.english,
                roman: item.roman
            }
        });
        this.setState({ 
            words: mappedJson
        });
    };
    render() {
        return (
            <Table data-element-id="words">
                <thead>
                    <tr>
                        <th>Korean</th>
                        <th>English</th>
                        <th>Roman</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.words.map(word =>
                            <tr>
                                <td>{word.korean}</td>
                                <td>{word.english}</td>
                                <td>{word.roman}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }
}