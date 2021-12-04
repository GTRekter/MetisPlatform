import React, { Component } from 'react';
import { Row, Col, Card, CardTitle, CardText } from 'reactstrap';

export default class ScoreBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordsCount: this.props.wordsCount,
            errorsCount: this.props.errorsCount,
            correctCount: this.props.correctCount
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col sm="4">
                        <Card body>
                            <CardTitle tag="h5">
                                Words 
                            </CardTitle>
                            <CardText>
                                {this.props.wordsCount}
                            </CardText>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body>
                            <CardTitle tag="h5">
                                Errors
                            </CardTitle>
                            <CardText>
                                {this.props.errorsCount}
                            </CardText>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body>
                            <CardTitle tag="h5">
                                Words remanining
                            </CardTitle>
                            <CardText>
                                {this.props.wordsCount - (this.props.errorsCount + this.props.correctCount)}
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}