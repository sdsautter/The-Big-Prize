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
                <div className="col-3 driver">
                    <button key={idx} className="btn btn-secondary" name={driver.name} disabled={driver.selected} onClick={this.props.selectDriver}>{driver.name}</button>
                </div>
            )
        })
    }

    render(){
        return (
            <div class="row">{this.renderDrivers()}</div>
        )
    }
}
