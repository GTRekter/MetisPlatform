import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Collapse, Modal } from 'react-bootstrap';
import ReportCard from '../components/ReportCard';
import Pagination from '../components/Pagination';
import GrammarPointCreationForm from '../components/GrammarPointCreationForm';
import GrammarPointEditForm from '../components/GrammarPointEditForm';
import GrammarPointService from '../services/GrammarPointService';

export default class GrammarPointsManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grammarPoints: 0,
            activeGrammarPoints: 0,
            selectedGrammarPoint: undefined,
            selectedGrammarPointId: undefined,
            displayedGrammarPoints: [],
            page: 0,
            pages: undefined,
            grammarPointsPerPage: 10,
            searchQuery: '',
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        }
        this.onClickToggleCreationForm = this.onClickToggleCreationForm.bind(this);
        this.onClickHideCreationForm = this.onClickHideCreationForm.bind(this);
        this.onSubmitCreationGrammarPoint = this.onSubmitCreationGrammarPoint.bind(this);

        this.onClickShowEditForm = this.onClickShowEditForm.bind(this);
        this.onClickHideEditForm = this.onClickHideEditForm.bind(this);
        this.onSubmitEditGrammarPoint = this.onSubmitEditGrammarPoint.bind(this);

        this.onClickShowDeleteModal = this.onClickShowDeleteModal.bind(this);
        this.onClickHideDeleteModal = this.onClickHideDeleteModal.bind(this);
        this.onClickConfirmDelete = this.onClickConfirmDelete.bind(this);

        this.onClickUpdateGrammarPointsByPage = this.onClickUpdateGrammarPointsByPage.bind(this);
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
        this.onClickChangePage = this.onClickChangePage.bind(this);
    }
    componentDidMount() {
        GrammarPointService
            .getGrammarPointsByPage(this.state.page, this.state.grammarPointsPerPage)
            .then(response => {
                this.setState({
                    displayedGrammarPoints: response
                });
            })
        GrammarPointService
            .getGrammarPointsCount()
            .then(response => {
                this.setState({
                    grammarPoints: response,
                    pages: Math.floor(response / this.state.grammarPointsPerPage) + 1
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
    onSubmitCreationGrammarPoint() {
        GrammarPointService
            .getGrammarPointsByPage(this.state.page, this.state.grammarPointsPerPage)
            .then(response => {
                this.setState({
                    grammarPoints: this.state.grammarPoints + 1,
                    displayedGrammarPoints: response,
                    creationFormVisible: false
                });
            })
    }

    onClickShowEditForm(id) {
        this.setState({
            selectedGrammarPointId: id,
            creationFormVisible: false,
            editFormVisible: true,
            deleteModalVisible: false
        });
    }
    onClickHideEditForm() {
        this.setState({
            selectedGrammarPointId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onSubmitEditGrammarPoint() {
        GrammarPointService
            .getGrammarPointsByPage(this.state.page, this.state.grammarPointsPerPage)
            .then(response => {
                this.setState({
                    displayedGrammarPoints: response,
                    editFormVisible: false
                });
            })
    }

    onClickShowDeleteModal(id) {
        this.setState({
            selectedGrammarPointId: id,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: true
        });
    }
    onClickHideDeleteModal() {
        this.setState({
            selectedGrammarPointId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onClickConfirmDelete = () => {
        GrammarPointService
            .deleteGrammarPointById(this.state.selectedGrammarPointId)
            .then(() => {
                GrammarPointService
                    .getGrammarPointsByPage(this.state.page, this.state.grammarPointsPerPage)
                    .then((response) => {
                        this.setState({
                            grammarPoints: this.state.grammarPoints - 1,
                            displayedGrammarPoints: response,
                            deleteModalVisible: false
                        });
                    })
            })
    }

    onClickUpdateGrammarPointsByPage = (grammarPointsPerPage) => {
        if (this.state.searchQuery === '') {
            GrammarPointService
                .getGrammarPointsCount()
                .then(response => {
                    this.setState({
                        grammarPoints: response,
                        pages: Math.floor(response / grammarPointsPerPage) + 1
                    });
                })
            GrammarPointService
                .getGrammarPointsByPage(this.state.page, grammarPointsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedGrammarPoints: response,
                        grammarPointsPerPage: grammarPointsPerPage
                    });
                })
        } else {
            GrammarPointService
                .getGrammarPointsBySearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        grammarPoints: response,
                        pages: Math.floor(response / grammarPointsPerPage) + 1
                    });
                })
            GrammarPointService
                .getGrammarPointsByPageAndSearchQuery(this.state.page, grammarPointsPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedGrammarPoints: response,
                        grammarPointsPerPage: grammarPointsPerPage
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
            GrammarPointService
                .getGrammarPointsCount()
                .then(response => {
                    this.setState({
                        grammarPoints: response,
                        pages: Math.floor(response / this.state.grammarPointsPerPage) + 1
                    });
                })
            GrammarPointService
                .getGrammarPointsByPage(this.state.page, this.state.grammarPointsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedGrammarPoints: response
                    });
                })
        } else {
            GrammarPointService
                .getGrammarPointsBySearchQueryCount(event.target.value)
                .then(response => {
                    this.setState({
                        grammarPoints: response,
                        pages: Math.floor(response / this.state.grammarPointsPerPage) + 1
                    });
                })
            GrammarPointService
                .getGrammarPointsByPageAndSearchQuery(this.state.page, this.state.grammarPointsPerPage, event.target.value)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedGrammarPoints: response
                    });
                })
        }
    }
    onClickChangePage = (page) => {
        if (this.state.searchQuery === '') {
            GrammarPointService
                .getGrammarPointsCount()
                .then(response => {
                    this.setState({
                        grammarPoints: response,
                        pages: Math.floor(response / this.state.grammarPointsPerPage) + 1
                    });
                })
            GrammarPointService
                .getGrammarPointsByPage(page, this.state.grammarPointsPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedGrammarPoints: response,
                        page: page
                    });
                })
        } else {
            GrammarPointService
                .getGrammarPointsBySearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        grammarPoints: response,
                        pages: Math.floor(response / this.state.grammarPointsPerPage) + 1
                    });
                })
            GrammarPointService
                .getGrammarPointsByPageAndSearchQuery(page, this.state.grammarPointsPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedGrammarPoints: response,
                        page: page
                    });
                })
        }
    }

    render() {
        var grammarPointPerPageOptions = [];
        for (var index = 1; index <= 4; index++) {
            let value = index * 10;
            grammarPointPerPageOptions.push(<li key={index}><span className="dropdown-item pointer" onClick={() => this.onClickUpdateGrammarPointsByPage(value)}>{value}</span></li>);
        }
        let rows = this.state.displayedGrammarPoints.map((grammarPoint, index) =>
            <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{grammarPoint.title}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button"
                        onClick={() => this.onClickShowEditForm(grammarPoint.id)}
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.editFormVisible}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faEdit} />
                        </span>
                    </button>
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickShowDeleteModal(grammarPoint.id)}>
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
                        <ReportCard title="Active grammarPoints" icon={faUser} color="primary" value={this.state.activeGrammarPoints} footer={`Total number of grammarPoints: ${this.state.grammarPoints}`} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <button className="btn btn-primary"
                            onClick={() => this.onClickToggleCreationForm()}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.creationFormVisible}>Add grammarPoint</button>
                        <div className="dropdown d-inline mx-2">
                            <button className="btn bg-gradient-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                GrammarPoints per page: {this.state.grammarPointsPerPage}
                                <FontAwesomeIcon className='text-secondary text-white ms-2' icon={faChevronDown} />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {grammarPointPerPageOptions}
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
                                    <GrammarPointEditForm key={this.state.selectedGrammarPointId} id={this.state.selectedGrammarPointId} onSubmitCallback={this.onSubmitEditGrammarPoint} onResetCallback={this.onClickHideEditForm} />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <Collapse in={this.state.creationFormVisible}>
                        <div className="col-12 my-3">
                            <div className="card">
                                <div className="card-body">
                                    <GrammarPointCreationForm onSubmitCallback={this.onSubmitCreationGrammarPoint} onResetCallback={this.onClickHideCreationForm} />
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
                                <p>This operation cannot be undone. If you proceed all the data related to the grammarPoint will be deleted.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" name="button" className="btn btn-light m-0" onClick={this.onClickHideDeleteModal}>Cancel</button>
                            <button type="button" name="button" className="btn bg-gradient-primary m-0 ms-2" onClick={this.onClickConfirmDelete}>Delete GrammarPoint</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}