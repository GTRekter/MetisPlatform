import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
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
                    <Col xs="4">
                        <Card className='bg-primary text-white h-100'>
                            <CardBody>
                                <Row>
                                    <Col xs="6" md="3">
                                        <FileTrayFullOutline color={'#FFFFFF'} width="100%" height="100%" />
                                    </Col>
                                    <Col xs="6" md="9">
                                        <p className='h3'>{this.props.wordsCount}</p>
                                        <p className="d-none d-md-block">Total Words</p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="4">
                        <Card className='bg-warning text-white h-100'>
                            <CardBody>
                                <Row>
                                    <Col xs="6" md="3">
                                        <LibraryOutline color={'#FFFFFF'} width="100%" height="100%" />
                                    </Col>
                                    <Col xs="6" md="9">
                                        <p className='h3'>{this.props.wordsCount - (this.props.errorsCount + this.props.correctCount)}</p>
                                        <p className="d-none d-md-block">Words remanining</p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="4">
                        <Card className='bg-danger text-white h-100'>
                            <CardBody>
                                <Row>
                                    <Col xs="6" md="3">
                                        <AlertCircleOutline color={'#FFFFFF'} width="100%" height="100%" />
                                    </Col>
                                    <Col xs="6" md="9">
                                        <p className='h3'>{this.props.errorsCount}</p>
                                        <p className="d-none d-md-block">Errors</p>
                                    </Col>
                                </Row>
                            </CardBody>
                            {/* <CardFooter>
                                <Row>
                                    <Col md="9">
                                        View all
                                    </Col>
                                    <Col md="3">
                                        <ArrowForwardOutline color={'#FFFFFF'} width="20px" height="20px" />
                                    </Col>
                                </Row>
                            </CardFooter> */}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}