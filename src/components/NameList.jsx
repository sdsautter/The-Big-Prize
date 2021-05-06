import React from 'react'
import "./NameList.css"

export class NameList extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrivers.bind(this);
        this.renderParticipants.bind(this);
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

    renderParticipants() {
        return this.props.participants.map((participant, idx) => {
            return (
                <li key={idx}>
                    <p name={participant.name}><strong>{participant.name}</strong></p>
                    <p>{this.renderDrivers(participant.drivers)}</p>
                </li>
            )
        })
    }

    render(){
        return (
            <span>
                <h3>Big Prize Participants</h3>
                <ol>{this.renderParticipants()}</ol>
            </span>
        )
    }
}
