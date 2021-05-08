import React from 'react';
import { Row, Col, Card } from 'react-bootstrap'
import "./Results.css";

export class Results extends React.Component {
    constructor(props) {
        super(props);
        this.renderDrivers.bind(this);
        this.renderResults.bind(this);
    }

    renderDrivers(drivers) {
        return drivers.map((driver, idx) => {
            return <li className="drivers list-group-item" key={driver} name={driver}>{driver}</li>
        })
    }

    renderResults() {
        return this.props.participants.map((participant, idx) => {
            return (
                 <Col key={idx} style={{margin: ".5rem"}}>
                 <Card style={{width: "18rem"}} className="card mx-auto text-center">
                     <Card.Body>
                     <Card.Title className="card-header"><strong>{participant.name}</strong></Card.Title>
                     <Card.Text>
                         <ul className="list-group list-group-flush">
                             {this.renderDrivers(participant.drivers)}
                         </ul>
                     </Card.Text>
                     </Card.Body>
                 </Card>
             </Col>
            )
        })
    }

    render(){
        return (
           <Row>
               <Col sm={12}>
                    <h3 style={{marginBottom: "2rem"}}>Selection Results</h3>
                </Col>
                <Col sm={12}>
                    <Row>
                        {this.renderResults()}
                    </Row>
                </Col>
           </Row>
        )
    }
}
