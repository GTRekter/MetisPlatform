import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import LessonService from '../services/LessonService';

export default class Lessons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: 0,
            activeLessons: 0,
            selectedLesson: undefined,
            selectedLessonId: undefined,
            displayedLessons: [],
            page: 0,
            pages: undefined,
            lessonsPerPage: 10,
            searchQuery: '',
        }
        this.onClickUpdateLessonsByPage = this.onClickUpdateLessonsByPage.bind(this);
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
        this.onClickChangePage = this.onClickChangePage.bind(this);
    }
    componentDidMount() {
        LessonService
            .getLessonsByCurrentUserAndPage(this.state.page, this.state.lessonsPerPage)
            .then(response => {
                this.setState({
                    displayedLessons: response
                });
            })
        LessonService
            .getLessonsByCurrentUserCount()
            .then(response => {
                this.setState({
                    lessons: response,
                    pages: Math.floor(response / this.state.lessonsPerPage) + 1
                });
            })
    }
    onClickUpdateLessonsByPage = (lessonsPerPage) => {
        if (this.state.searchQuery === '') {
            LessonService
                .getLessonsByCurrentUserCount()
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByCurrentUserAndPage(this.state.page, lessonsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response,
                        lessonsPerPage: lessonsPerPage
                    });
                })
        } else {
            LessonService
                .getLessonsByCurrentUserAndSearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByCurrentUserAndPageAndSearchQuery(this.state.page, lessonsPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response,
                        lessonsPerPage: lessonsPerPage
                    });
                })
        }
    }
    onChangeQueryString = (event) => {
        this.setState({
            ...this.state,
            searchQuery: event.target.value
        });
        if (event.target.value === '') {
            LessonService
                .getLessonsByCurrentUserCount()
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByCurrentUserAndPage(this.state.page, this.state.lessonsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response
                    });
                })
        } else {
            LessonService
                .getLessonsByCurrentUserAndSearchQueryCount(event.target.value)
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByCurrentUserAndPageAndSearchQuery(this.state.page, this.state.lessonsPerPage, event.target.value)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response
                    });
                })
        }
    }
    onClickChangePage = (page) => {
        if (this.state.searchQuery === '') {
            LessonService
                .getLessonsByCurrentUserCount()
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByCurrentUserAndPage(page, this.state.lessonsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response,
                        page: page
                    });
                })
        } else {
            LessonService
                .getLessonsByCurrentUserAndSearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByCurrentUserAndPageAndSearchQuery(page, this.state.lessonsPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response,
                        page: page
                    });
                })
        }
    }
    render() {
        let lessonPerPageOptions = [];
        for (var index = 1; index <= 4; index++) {
            let value = index * 10;
            lessonPerPageOptions.push(<li key={index}><span className="dropdown-item pointer" onClick={() => this.onClickUpdateLessonsByPage(value)}>{value}</span></li>);
        }
        let items = this.state.displayedLessons.map((lesson, index) => {
            return <div key={index} className="col-12 col-md-3">
                <Link className="card"  to={{ pathname: '/lesson', state: { id: lesson.id } }}>
                {/* <Link className="card" to={`/lesson/${lesson.id}`} state={{ id: lesson.id }}> */}
                    <div className="card-header mx-4 p-3 text-center">
                        <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                        </div>
                    </div>
                    <div className="card-body pt-0 p-3 text-center">
                        <h6 className="text-center mb-0">{lesson.title}</h6>
                        <span className="text-xs">{lesson.description}</span>
                        {/* <hr className="horizontal dark my-3" />
                        <h5 className="mb-0">{lesson.assignedOn}</h5> */}
                    </div>
                </Link>
            </div>
        })
        return (
            <div>
                <div className="row">
                    <div className="col-8">
                        <div className="dropdown d-inline mx-2">
                            <button className="btn bg-gradient-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Lessons per page: {this.state.lessonsPerPage}
                                <FontAwesomeIcon className='text-secondary text-white ms-2' icon={faChevronDown} />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {lessonPerPageOptions}
                            </ul>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="input-group input-group-outline mb-4">
                            <input type="text" className="form-control" placeholder="Search" name="searchQuery" value={this.state.searchQuery} onChange={(element) => this.onChangeQueryString(element)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {items}
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="mt-3">
                                <Pagination page={this.state.page} pages={this.state.pages} onClickChangePageCallback={this.onClickChangePage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}