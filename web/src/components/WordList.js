import React, { Component } from 'react'
import LessonsService from '../services/LessonsService';
import { Table } from 'reactstrap';

export default class WordList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: []
        }
    }
    componentDidMount() {
        const mappedJson = LessonsService.getAllWords();
        this.setState({ 
            words: mappedJson
        });
    }
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