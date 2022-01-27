import React, { Component } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import LessonService from '../services/LessonService';
import LanguageService from '../services/LanguageService';

export default class Lesson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            words: [],
            grammarPoints: [],
            languages: []
        }
    }
    componentDidMount() {
        let id = this.props.location.state.id
        LessonService
            .getLessonById(id)
            .then(response => {
                this.setState({
                    title: response.title,
                    words: response.words,
                    grammarPoints: response.grammarPoints
                });
            })
        LanguageService
            .getLanguages()
            .then((data) => {
                this.setState({
                    languages: data.filter((language) => language.enabled === true)
                })
            })
    }
    render() {
        let grammarPoints = "";
        if (this.state.grammarPoints.length === 1) {
            grammarPoints = <div>
                <p className="h4">{this.state.grammarPoints[0].title}</p>
                <div dangerouslySetInnerHTML={{ __html: this.state.grammarPoints[0].description }}></div>
            </div>
        }
        if (this.state.grammarPoints.length > 1) {
            let firstNav = this.state.grammarPoints[0].title.trim();
            let nav = this.state.grammarPoints.map((grammarPoint, index) => {
                return <Nav.Item key={index}>
                    <Nav.Link eventKey={grammarPoint.title.trim()}>{grammarPoint.title}</Nav.Link>
                </Nav.Item>
            })
            let panes = this.state.grammarPoints.map((grammarPoint, index) => {
                return <Tab.Pane key={index} eventKey={grammarPoint.title.trim()}>
                    <div dangerouslySetInnerHTML={{ __html: grammarPoint.description }}></div>
                </Tab.Pane>
            })
            grammarPoints = <Tab.Container>
                <Nav variant="pills" defaultActiveKey={firstNav} className="nav-fill p-1">
                    {nav}
                </Nav>
                <Tab.Content>
                    {panes}
                </Tab.Content>
            </Tab.Container>
        }
        let headers = this.state.languages.map((language, index) =>
            <th key={index} className="text-uppercase text-xxs font-weight-bolder opacity-7">{language.name}</th>
        )
        let rows = this.state.words.map((word, index) => {
            let columns = [];
            this.state.languages.forEach((language, index) => {
                let translation = word.translations.filter((translation) => translation.languageId === language.id);
                if (translation.length > 0) {
                    columns.push(<td key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{translation[0].text}</td>)
                } else {
                    columns.push(<td key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4"></td>)
                }
            })
            return (
                <tr key={index}>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                        <button className="btn btn-sm btn-link-secondary" onClick={() => this.onClickPronounceWords(word.text, word.languageId)}>
                            <FontAwesomeIcon icon={faVolumeUp} />
                        </button>
                    </td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{word.text}</td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{word.romanization}</td>
                    {columns}
                </tr>
            )
        });
        return (
            <div>
                <div className="row">
                    <div className="col-xl-12 my-3">
                        <div className="card">
                            <div className="card-body">
                                {grammarPoints}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table align-items-center">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Text</th>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Romanization</th>
                                            {headers}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}