import React, { Component } from 'react';
import korea from '../images/korea.png';
import StatisticService from '../services/StatisticService';
import JwtService from '../services/JwtService';
import StatisticGraph from './StatisticGraph';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: 0,
            correctWeeklyStatistics: [],
            incorrectWeeklyStatistics: []
        }
    }
    componentDidMount() {
        var id = JwtService.getCurrentUserId();
        StatisticService
            .getStatisticsByUserIdLastWeek(id)
            .then((statistics) => {
                this.setState({
                    correctWeeklyStatistics: statistics.map(statistic => statistic.correct),
                    incorrectWeeklyStatistics: statistics.map(statistic => statistic.incorrect)
                })
            })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 mt-4 mb-4">
                        <div className="card z-index-2 ">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                <div className="bg-gradient-success  shadow-success  border-radius-lg py-3 pe-1">
                                    <StatisticGraph lablel="Incorrect" statistics={this.state.correctWeeklyStatistics} />
                                </div>
                            </div>
                            <div className="card-body">
                                <h6 className="mb-0 ">Last week performance</h6>
                                <p className="text-sm ">Number of correct words</p>
                                {/* <hr class="dark horizontal" />
                                <div class="d-flex ">
                                    <i class="material-icons text-sm my-auto me-1">schedule</i>
                                    <p class="mb-0 text-sm"> campaign sent 2 days ago </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 my-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <img src={korea} id="korea-img" className="img-fluid" alt="korea" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}