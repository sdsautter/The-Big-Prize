import React from 'react'
import './Drivers.css';

export class Drivers extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrivers.bind(this);
    }

    renderDrivers() {
        return this.props.drivers.map((driver, idx) => {
            return (
                <div key={idx} className="col col-md-2 driver">
                    <button className="btn btn-secondary" name={driver.name} disabled={driver.selected} onClick={this.props.selectDriver}>
                        #{driver.number} {driver.name}
                    </button>
                </div>
            )
        })
    }

    render(){
        return (
            <div className="row">{this.renderDrivers()}</div>
        )
    }
}
