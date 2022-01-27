import React, { Component } from 'react';
import korea from '../images/korea.png';
import StatisticService from '../services/StatisticService';
import StatisticGraph from './StatisticGraph';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weeklyStatisticsPercentage: []
        }
    }
    componentDidMount() {
        StatisticService
            .getStatisticsByCurrentUserLastWeek()
            .then((statistics) => {
                
                this.setState({
                    weeklyStatisticsPercentage: statistics.map(statistic => (statistic.correct/(statistic.correct+statistic.incorrect))*100),
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
                                    <StatisticGraph lablel="Incorrect" statistics={this.state.weeklyStatisticsPercentage} />
                                </div>
                            </div>
                            <div className="card-body">
                                <h6 className="mb-0 ">Last week performance</h6>
                                <p className="text-sm ">Number of correct words</p>
                                {/* <hr className="dark horizontal" />
                                <div className="d-flex ">
                                    <i className="material-icons text-sm my-auto me-1">schedule</i>
                                    <p className="mb-0 text-sm"> campaign sent 2 days ago </p>
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