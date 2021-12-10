import React, { Component } from 'react';
import korea from '../images/korea.png';
import ReportCard from './ReportCard';

export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    // componentDidMount() {
    //     var mappedJson = DictionaryService.getAllWords();
    //     this.setState({
    //         words: this.shuffle(mappedJson),
    //         currentWord: mappedJson[0],
    //         errors: [],
    //         correct: [],
    //         topics: DictionaryService.getAllTopics(),
    //     });
    // }
    render() {
        return (
            <div>
                {/* <div class="row">
                    <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                        <ReportCard title={} value={} icon={} />
                    </div>
                    <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                        <ReportCard title={} value={} icon={} />
                    </div>
                    <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                        <ReportCard title={} value={} icon={} />
                    </div>
                </div> */}
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body text-center">
                                <img src={korea} id="korea-img" className="img-fluid" alt="korea" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}