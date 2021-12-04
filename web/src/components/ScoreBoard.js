import React, { Component } from 'react';
import { Row, Col, Card, CardTitle, CardText, CardFooter } from 'reactstrap';
import { FileTrayFullOutline, AlertCircleOutline, LibraryOutline } from 'react-ionicons'

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
                        <Card className='bg-primary text-white h-100' body>
                            <CardText>
                                <Row>
                                    <Col md="3">
                                        <FileTrayFullOutline color={'#FFFFFF'} width="100%" height="100%" />
                                    </Col>
                                    <Col md="9">
                                        <p className='h3'>{this.props.wordsCount}</p>
                                        <p>Total Words</p>
                                    </Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card className='bg-warning text-white h-100' body>
                            <CardText>
                                <Row>
                                    <Col md="3">
                                        <LibraryOutline color={'#FFFFFF'} width="100%" height="100%" />
                                    </Col>
                                    <Col md="9">
                                        <p className='h3'>{this.props.wordsCount - (this.props.errorsCount + this.props.correctCount)}</p>
                                        <p>Words remanining</p>
                                    </Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card className='bg-danger text-white h-100' body>
                            <CardText>
                                <Row>
                                    <Col md="3">
                                        <AlertCircleOutline color={'#FFFFFF'} width="100%" height="100%" />
                                    </Col>
                                    <Col md="9">
                                        <p className='h3'>{this.props.errorsCount}</p>
                                        <p>Errors</p>
                                    </Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}