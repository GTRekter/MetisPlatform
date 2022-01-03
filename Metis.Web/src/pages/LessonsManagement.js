import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Collapse, Modal } from 'react-bootstrap';
import ReportCard from '../components/ReportCard';
import Pagination from '../components/Pagination';
import LessonCreationForm from '../components/LessonCreationForm';
import LessonEditForm from '../components/LessonEditForm';
import LessonService from '../services/LessonService';

export default class LessonsManagement extends Component {
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
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        }
        this.onClickToggleCreationForm = this.onClickToggleCreationForm.bind(this);
        this.onClickHideCreationForm = this.onClickHideCreationForm.bind(this);
        this.onSubmitCreationLesson = this.onSubmitCreationLesson.bind(this);

        this.onClickShowEditForm = this.onClickShowEditForm.bind(this);
        this.onClickHideEditForm = this.onClickHideEditForm.bind(this);
        this.onSubmitEditLesson = this.onSubmitEditLesson.bind(this);

        this.onClickShowDeleteModal = this.onClickShowDeleteModal.bind(this);
        this.onClickHideDeleteModal = this.onClickHideDeleteModal.bind(this);
        this.onClickConfirmDelete = this.onClickConfirmDelete.bind(this);

        this.onClickUpdateLessonsByPage = this.onClickUpdateLessonsByPage.bind(this);
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
        this.onClickChangePage = this.onClickChangePage.bind(this);
    }
    componentDidMount() {
        LessonService
            .getLessonsByPage(this.state.page, this.state.lessonsPerPage)
            .then(response => {
                this.setState({
                    displayedLessons: response
                });
            })
        LessonService
            .getLessonsCount()
            .then(response => {
                this.setState({
                    lessons: response,
                    pages: Math.floor(response / this.state.lessonsPerPage) + 1
                });
            })
    }

    onClickToggleCreationForm() {
        this.setState({
            creationFormVisible: !this.state.creationFormVisible,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onClickHideCreationForm() {
        this.setState({
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onSubmitCreationLesson() {
        LessonService
            .getLessonsByPage(this.state.page, this.state.lessonsPerPage)
            .then(response => {
                this.setState({
                    lessons: this.state.lessons + 1,
                    displayedLessons: response,
                    creationFormVisible: false
                });
            })
    }

    onClickShowEditForm(id) {
        this.setState({
            selectedLessonId: id,
            creationFormVisible: false,
            editFormVisible: true,
            deleteModalVisible: false
        });
    }
    onClickHideEditForm() {
        this.setState({
            selectedLessonId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onSubmitEditLesson() {
        LessonService
            .getLessonsByPage(this.state.page, this.state.lessonsPerPage)
            .then(response => {
                this.setState({
                    displayedLessons: response,
                    editFormVisible: false
                });
            })
    }

    onClickShowDeleteModal(id) {
        this.setState({
            selectedLessonId: id,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: true
        });
    }
    onClickHideDeleteModal() {
        this.setState({
            selectedLessonId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onClickConfirmDelete = () => {
        LessonService
            .deleteLessonById(this.state.selectedLessonId)
            .then(() => {
                LessonService
                    .getLessonsByPage(this.state.page, this.state.lessonsPerPage)
                    .then((response) => {
                        this.setState({
                            lessons: this.state.lessons - 1,
                            displayedLessons: response,
                            deleteModalVisible: false
                        });
                    })
            })
    }

    onClickUpdateLessonsByPage = (lessonsPerPage) => {
        if (this.state.searchQuery === '') {
            LessonService
                .getLessonsCount()
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByPage(this.state.page, lessonsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response,
                        lessonsPerPage: lessonsPerPage
                    });
                })
        } else {
            LessonService
                .getLessonsBySearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByPageAndSearchQuery(this.state.page, lessonsPerPage, this.state.searchQuery)
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
                .getLessonsCount()
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByPage(this.state.page, this.state.lessonsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response
                    });
                })
        } else {
            LessonService
                .getLessonsBySearchQueryCount(event.target.value)
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByPageAndSearchQuery(this.state.page, this.state.lessonsPerPage, event.target.value)
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
                .getLessonsCount()
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByPage(page, this.state.lessonsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedLessons: response,
                        page: page
                    });
                })
        } else {
            LessonService
                .getLessonsBySearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        lessons: response,
                        pages: Math.floor(response / this.state.lessonsPerPage) + 1
                    });
                })
            LessonService
                .getLessonsByPageAndSearchQuery(page, this.state.lessonsPerPage, this.state.searchQuery)
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
        var lessonPerPageOptions = [];
        for (var index = 1; index <= 4; index++) {
            let value = index * 10;
            lessonPerPageOptions.push(<li key={index}><span className="dropdown-item pointer" onClick={() => this.onClickUpdateLessonsByPage(value)}>{value}</span></li>);
        }
        let rows = this.state.displayedLessons.map((lesson, index) =>
            <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{lesson.title}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button"
                        onClick={() => this.onClickShowEditForm(lesson.id)}
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.editFormVisible}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faEdit} />
                        </span>
                    </button>
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickShowDeleteModal(lesson.id)}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                        </span>
                    </button>
                </td>
            </tr>
        )
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="Active lessons" icon={faUser} color="primary" value={this.state.activeLessons} footer={`Total number of lessons: ${this.state.lessons}`} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <button className="btn btn-primary"
                            onClick={() => this.onClickToggleCreationForm()}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.creationFormVisible}>Add lesson</button>
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
                    <Collapse in={this.state.editFormVisible}>
                        <div className="col-12 my-3">
                            <div className="card">
                                <div className="card-body">
                                    <LessonEditForm key={this.state.selectedLessonId} id={this.state.selectedLessonId} onSubmitCallback={this.onSubmitEditLesson} onResetCallback={this.onClickHideEditForm} />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <Collapse in={this.state.creationFormVisible}>
                        <div className="col-12 my-3">
                            <div className="card">
                                <div className="card-body">
                                    <LessonCreationForm onSubmitCallback={this.onSubmitCreationLesson} onResetCallback={this.onClickHideCreationForm} />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table align-items-center">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Title</th>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-3">
                                <Pagination page={this.state.page} pages={this.state.pages} onClickChangePageCallback={this.onClickChangePage} />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.deleteModalVisible} onHide={this.onClickHideDeleteModal}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <FontAwesomeIcon className='h1 text-secondary' icon={faBell} />
                                <h4 className="text-gradient text-danger mt-4">Warning</h4>
                                <p>This operation cannot be undone. If you proceed all the data related to the lesson will be deleted.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" name="button" className="btn btn-light m-0" onClick={this.onClickHideDeleteModal}>Cancel</button>
                            <button type="button" name="button" className="btn bg-gradient-primary m-0 ms-2" onClick={this.onClickConfirmDelete}>Delete Lesson</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}