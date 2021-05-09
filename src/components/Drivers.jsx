import React from 'react'
import './Drivers.css';
import { Button, Row, Col } from 'react-bootstrap'

export class Drivers extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrivers.bind(this);
    }

    renderDrivers() {
        return this.props.drivers.map((driver, idx) => {
            const imgSrc = `/img/cars/${driver.number}.png`
            return (
                <Col md={4} key={idx} className="driver">
                    <Button className="driver-button" name={driver.name} disabled={driver.selected} onClick={this.props.selectDriver}>
                        #{driver.number} {driver.name}
                        <img style={{width: "100%"}}src={imgSrc} name={driver.name} alt={driver.name}></img>
                    </Button>
                </Col>
            )
        })
    }

    render(){
        return (
            <Row>
                {this.renderDrivers()}
            </Row>
        )
    }
}
