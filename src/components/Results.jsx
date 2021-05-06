import React from 'react';

export class Results extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrivers.bind(this);
        this.renderResults.bind(this);
    }

    renderDrivers(drivers) {
        return drivers.map((driver, idx) => {
            return <li className="list-group-item" key={driver} name={driver}>{driver}</li>
        })
    }

    renderResults() {
        return this.props.participants.map((participant, idx) => {
            return (
                <div key={idx} className="col">
                    <div className="card mx-auto text-center" style={{width: "18rem"}}>
                        <div className="card-header">
                            <strong>{participant.name}</strong>
                        </div>
                        <ul className="list-group list-group-flush">
                            {this.renderDrivers(participant.drivers)}
                        </ul>
                    </div>
                </div>
            )
        })
    }

    render(){
        return (
            <div className="row">
                <h3 style={{marginBottom: "2rem"}}>Selection Results</h3>
                {this.renderResults()}
            </div>
        )
    }
}
