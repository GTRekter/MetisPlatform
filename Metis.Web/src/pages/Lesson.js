import React, { Component } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import LessonService from '../services/LessonService';

export default class Lesson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            words: [],
            grammarPoints: []
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
    }
    render() {
        // 
        let grammarPoints = ""
        if(this.state.grammarPoints.length === 1) {
            grammarPoints = <div>
                <p className="h4">{this.state.grammarPoints[0].title}</p>
                <div dangerouslySetInnerHTML={{ __html: this.state.grammarPoints[0].description }}></div>
            </div>
        }
        if(this.state.grammarPoints.length > 1) {
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
            </div>
        )
    }
}