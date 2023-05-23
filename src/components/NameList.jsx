import React from 'react'
import { Col, Row } from 'react-bootstrap';
import "./NameList.css"

export class NameList extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrivers.bind(this);
        this.renderParticipants.bind(this);
        this.participantClass.bind(this);
    }

    renderDrivers(drivers) {
        return drivers.map((driver, idx) => {
            return (
                <span key={`${driver}_${idx}_nameList`} name={driver}><i>{idx !== 0 ? ', ' : ''}{driver}</i></span>
            )        
        })
    }

    participantClass(participant) {
        if (participant !== this.props.currentUser) {
            return 'align-items-center'
        }
        return 'selector align-items-center'
    }

    renderParticipants() {
        return this.props.participants.map((participant, idx) => {
            return (
                <Row className={this.participantClass(participant)} key={`${participant}_${idx}`}>
                    <Col xs={2} className="pingContainer d-flex justify-content-center text-center">
                        <img src="/img/pingpong.png" alt={this.props.number} className="ball"/>
                        <span className="number">{idx+1}</span>
                    </Col>
                    <Col xs={10}>
                        <span className="name" name={participant.name}><strong>{participant.name}</strong></span>
                        <p className="driver">{this.renderDrivers(participant.drivers)}</p>
                    </Col>
                </Row>
            )
        })
    }

    render(){
        return (
            <span>
                <h3 style={{marginTop: "1rem"}}>Official Participants</h3>
                <br />
                    {this.renderParticipants()}
            </span>
        )
    }
}
