import React from 'react'

export class Drivers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yep: ''
        }
    }

    renderDrivers = () => {
        return this.props.drivers.map((driver, idx) => {
            return (
                <button key={idx} name={driver.name} disabled={driver.selected} onClick={this.props.selectDriver}>{driver.name}</button>
            )
        })
    }

    render(){
        return (
            <div>{this.renderDrivers()}</div>
        )
    }
}
