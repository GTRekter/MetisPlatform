import React, { Component } from 'react'
import LessonsService from '../services/LessonsService';
import WordList from '../components/WordList';

export default class Dictionary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            lessonsCount: 0
        }
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
        this.onClickUpdateWordsByLessonId = this.onClickUpdateWordsByLessonId.bind(this);
        this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        this.setState({
            words: LessonsService.getAllWords(),
            lessonsCount: LessonsService.getLessonsCount()
        });
    }
    onClickUpdateWordsByLessonId = (element) => {
        var lessonId = element.target.getAttribute("data-index")
        this.setState({
            words: LessonsService.getAllWordsFromLessonId(lessonId)
        });
    };
    onClickUpdateWordsByAll = () => {
        this.setState({
            words: LessonsService.getAllWords()
        });
    };
    onChangeQueryString = (event) => {
        this.setState({
            words: LessonsService.getAllWordsFromString(event.target.value)
        });
    }
    render() {
        var lessonsOptions = [];
        lessonsOptions.push(<li key="0"><span className="dropdown-item pointer" onClick={() => this.onClickUpdateWordsByAll()}>All</span></li>);
        for (var index = 1; index <= this.state.lessonsCount; index++) {
            lessonsOptions.push(<li key={index}><span className="dropdown-item pointer" data-index={index - 1} onClick={(element) => this.onClickUpdateWordsByLessonId(element)}>{index}</span></li>);
        }
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dictionary</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="dropdown px-2 py-2">
                            <span className="btn btn-secondary dropdown-toggle pointer" role="button" id="lessonFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Lesson
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="lessonFilterDropdown">
                                {lessonsOptions}
                            </ul>
                        </div>
                        <div className="input-group mb-3 px-2 py-2">
                            <input type="text" className="form-control" placeholder="Search" aria-label="Word" name="searchQuery" value={this.state.searchQuery} onChange={(element) => this.onChangeQueryString(element)} />
                        </div>
                    </div>
                </div>
                <WordList words={this.state.words} />
            </div>
        )
    }
}