import React from 'react'
import { Row, Button, Col } from 'react-bootstrap'

export class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.disableUndo.bind(this);
    }
    disableUndo() {
        return this.props.selectionNumber === 1
    }
    render(){
        return (
            <Row>
                <Col sm={12}>
                    <h2>Selecting:</h2>
                </Col>
                <Col sm={{span: 6, offset: 3}}>
                    <h3>{this.props.selectionNumber}. {this.props.currentUser.name}</h3>
                </Col>
                <Col>
                    <Button variant="danger" disabled={this.disableUndo()} onClick={this.props.undo}>Undo</Button>
                </Col>
            </Row>
        )
    }
}
