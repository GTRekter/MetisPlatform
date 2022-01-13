import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Collapse, Modal } from 'react-bootstrap';
import ReportCard from '../components/ReportCard';
import Pagination from '../components/Pagination';
import DictionaryCreationForm from '../componentsDictionaryCreationForm';
import DictionaryEditForm from '../components/DictionaryEditForm';
import DictionaryService from '../services/DictionaryService';

export default class DictionariesManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayedDictionaries: [],
            dictionaries: 0,
            activeWords: 0,
            page: 0,
            pages: undefined,
            dictionariesPerPage: 10,
            searchQuery: '',
            selectedDictionaryId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        }
        this.onClickToggleCreationForm = this.onClickToggleCreationForm.bind(this);
        this.onClickHideCreationForm = this.onClickHideCreationForm.bind(this);
        this.onSubmitCreationDictionary = this.onSubmitCreationDictionary.bind(this);

        this.onClickShowEditForm = this.onClickShowEditForm.bind(this);
        this.onClickHideEditForm = this.onClickHideEditForm.bind(this);
        this.onSubmitEditDictionary = this.onSubmitEditDictionary.bind(this);

        this.onClickShowDeleteModal = this.onClickShowDeleteModal.bind(this);
        this.onClickHideDeleteModal = this.onClickHideDeleteModal.bind(this);
        this.onClickConfirmDelete = this.onClickConfirmDelete.bind(this);

        this.onClickUpdateDictionariesByPage = this.onClickUpdateDictionariesByPage.bind(this);
        this.onChangeQueryString = this.onChangeQueryString.bind(this);
        this.onClickChangePage = this.onClickChangePage.bind(this);
    }
    componentDidMount() {
        DictionaryService
            .getDictionariesByPage(this.state.page, this.state.wordsPerPage)
            .then(response => {
                this.setState({
                    displayedDictionaries: response
                });
            })
        DictionaryService
            .getDictionaiesCount()
            .then(response => {
                this.setState({
                    dictionaries: response,
                    pages: Math.floor(response / this.state.dictionariesPerPage) + 1
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
    onSubmitCreationDictionary() {
        DictionaryService
            .getDictionariesByPage(this.state.page, this.state.wordsPerPage)
            .then(response => {
                this.setState({
                    dictionaries: this.state.dictionaries + 1,
                    displayedDictionaries: response,
                    creationFormVisible: false,
                    pages: Math.floor((this.state.dictionaries + 1) / this.state.dictionariesPerPage) + 1
                });
            })
    }
    onClickShowEditForm(id) {
        this.setState({
            selectedWordId: id,
            creationFormVisible: false,
            editFormVisible: true,
            deleteModalVisible: false
        });
    }
    onClickHideEditForm() {
        this.setState({
            selectedWordId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onSubmitEditDictionary() {
        DictionaryService
            .getDictionariesByPage(this.state.page, this.state.wordsPerPage)
            .then(response => {
                this.setState({
                    displayedDictionaries: response,
                    editFormVisible: false
                });
            })
    }
    onClickShowDeleteModal(id) {
        this.setState({
            selectedWordId: id,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: true
        });
    }
    onClickHideDeleteModal() {
        this.setState({
            selectedWordId: undefined,
            creationFormVisible: false,
            editFormVisible: false,
            deleteModalVisible: false
        })
    }
    onClickConfirmDelete = () => {
        DictionaryService
            .deleteDictionaryById(this.state.selectedDictionaryId)
            .then(() => {
                DictionaryService
                    .getDictionariesByPage(this.state.page, this.state.dictionariesPerPage)
                    .then((response) => {
                        this.setState({
                            dictionaries: this.state.dictionaries - 1,
                            displayedWords: response,
                            deleteModalVisible: false
                        });
                    })
            })
    }
    onClickUpdateDictionariesByPage = (dictionariesPerPage) => {
        if (this.state.searchQuery === '') {
            DictionaryService
                .getDictionariesCount()
                .then(response => {
                    this.setState({
                        dictionaries: response,
                        pages: Math.floor(response / dictionariesPerPage) + 1
                    });
                })
            DictionaryService
                .getDictionariesByPage(this.state.page, dictionariesPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedDictionaries: response,
                        dictionariesPerPage: dictionariesPerPage
                    });
                })
        } else {
            DictionaryService
                .getDictionariesBySearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        dictionaries: response,
                        pages: Math.floor(response / dictionariesPerPage) + 1
                    });
                })
            DictionaryService
                .getDictionariesByPageAndSearchQuery(this.state.page, dictionariesPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedDictionaries: response,
                        dictionariesPerPage: dictionariesPerPage
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
            DictionaryService
                .getDictionariesCount()
                .then(response => {
                    this.setState({
                        dictionaries: response,
                        pages: Math.floor(response / this.state.dictionariesPerPage) + 1
                    });
                })
            DictionaryService
                .getDictionariesByPage(this.state.page, this.state.dictionariesPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedDictionaries: response
                    });
                })
        } else {
            DictionaryService
                .getDictionariesBySearchQueryCount(event.target.value)
                .then(response => {
                    this.setState({
                        dictionaries: response,
                        pages: Math.floor(response / this.state.dictionariesPerPage) + 1
                    });
                })
            DictionaryService
                .getDictionariesByPageAndSearchQuery(this.state.page, this.state.dictionariesPerPage, event.target.value)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedDictionaries: response
                    });
                })
        }
    }
    onClickChangePage = (page) => {
        if (this.state.searchQuery === '') {
            DictionaryService
                .getDictionariesCount()
                .then(response => {
                    this.setState({
                        dictionaries: response,
                        pages: Math.floor(response / this.state.dictionariesPerPage) + 1
                    });
                })
            DictionaryService
                .getDictionariesByPage(page, this.state.dictionariesPerPage)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedDictionaries: response,
                        page: page
                    });
                })
        } else {
            DictionaryService
                .getDictionariesBySearchQueryCount(this.state.searchQuery)
                .then(response => {
                    this.setState({
                        dictionaries: response,
                        pages: Math.floor(response / this.state.dictionariesPerPage) + 1
                    });
                })
            DictionaryService
                .getDictionariesByPageAndSearchQuery(page, this.state.dictionariesPerPage, this.state.searchQuery)
                .then(response => {
                    this.setState({
                        ...this.state,
                        displayedDictionaries: response,
                        page: page
                    });
                })
        }
    }
    render() {
        var dictionaryPerPageOptions = [];
        for (var index = 1; index <= 4; index++) {
            let value = index * 10;
            dictionaryPerPageOptions.push(<li key={index}><span className="dropdown-item pointer" onClick={() => this.onClickUpdateDictionariesByPage(value)}>{value}</span></li>);
        }
        let rows = this.state.displayedDictionaries.map((dictionary, index) => {
            return (
                <tr key={index}>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{dictionary.name}</td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{dictionary.code}</td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{dictionary.enabled}</td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                        <button className="btn btn-icon btn-2 btn-link btn-sm" type="button"
                            onClick={() => this.onClickShowEditForm(word.id)}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.editFormVisible}>
                            <span className="btn-inner--icon">
                                <FontAwesomeIcon className='opacity-10' icon={faEdit} />
                            </span>
                        </button>
                        <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickShowDeleteModal(dictionary.id)}>
                            <span className="btn-inner--icon">
                                <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                            </span>
                        </button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-md-4 py-4">
                        <ReportCard title="Active dictionaries" icon={faUser} color="primary" value={this.state.activeDictionaries} footer={`Total number of dictionaries: ${this.state.dictionaries}`} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <button className="btn btn-primary"
                            onClick={() => this.onClickToggleCreationForm()}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.creationFormVisible}>Add dictionary</button>
                        <div className="dropdown d-inline mx-2">
                            <button className="btn bg-gradient-primary dropdown-toggle" type="button" id="itemsPerPageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Dictionaries per page: {this.state.wordsPerPage}
                                <FontAwesomeIcon className='text-secondary text-white ms-2' icon={faChevronDown} />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="itemsPerPageDropdown">
                                {dictionaryPerPageOptions}
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
                                    <DictionaryEditForm key={this.state.selectedDictionaryId} id={this.state.selectedDictionaryId} onSubmitCallback={this.onSubmitEditDictionary} onResetCallback={this.onClickHideEditForm} />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <Collapse in={this.state.creationFormVisible}>
                        <div className="col-12 my-3">
                            <div className="card">
                                <div className="card-body">
                                    <DictionaryCreationForm onSubmitCallback={this.onSubmitCreationWord} onResetCallback={this.onClickHideCreationForm} />
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
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Name</th>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Code</th>
                                            <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Enabled</th>
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
                                <p>This operation cannot be undone. If you proceed all the data related to the dictionary will be deleted.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" name="button" className="btn btn-light m-0" onClick={this.onClickHideDeleteModal}>Cancel</button>
                            <button type="button" name="button" className="btn bg-gradient-primary m-0 ms-2" onClick={this.onClickConfirmDelete}>Delete Dictionary</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}