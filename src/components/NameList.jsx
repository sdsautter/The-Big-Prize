import React from 'react'
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
            if (idx === 0) {
                return (
                    <span key={driver} name={driver}><i>{driver}</i></span>
                )
            }
            return (
                <span key={driver} name={driver}><i>, {driver}</i></span>
            )        
        })
    }

    participantClass(participant) {
        if (participant !== this.props.currentUser) {
            return ''
        }
        return 'selector'
    }

    renderParticipants() {
        return this.props.participants.map((participant, idx) => {
            return (
                <li className={this.participantClass(participant)} key={idx}>
                    <span name={participant.name}><strong>{participant.name}</strong></span>
                    <p>{this.renderDrivers(participant.drivers)}</p>
                </li>
            )
        })
    }

    render(){
        return (
            <span>
                <h3>Big Prize Participants</h3>
                <ol className="list">
                    {this.renderParticipants()}
                </ol>
            </span>
        )
    }
}
