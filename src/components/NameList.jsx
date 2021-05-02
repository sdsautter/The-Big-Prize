import React from 'react'

export class NameList extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrivers.bind(this);
        this.renderNames.bind(this);
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

    renderNames() {
        return this.props.names.map((name, idx) => {
            return (
                <div key={idx}>
                    <p name={name.name}><strong>{name.name}</strong></p>
                    {this.renderDrivers(name.drivers)}
                </div>
            )
        })
    }

    render(){
        return (
            <div>{this.renderNames()}</div>
        )
    }
}
