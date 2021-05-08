import React from 'react'
import { Row, Button, Col, Modal } from 'react-bootstrap'

export class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            show: false
        }
        this.disableUndo.bind(this);
    }
    disableUndo() {
        return this.props.selectionNumber === 1
    }
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    handleUndo = () => {
        this.handleClose();
        this.props.undo();
    }

    render(){
        return (
            <>
            <Row>
                <Col sm={12}>
                    <h2>Selecting:</h2>
                </Col>
                <Col sm={{span: 6, offset: 3}}>
                    <h3>{this.props.selectionNumber}. {this.props.currentUser.name}</h3>
                </Col>
                <Col>
                    <Button variant="danger" disabled={this.disableUndo()} onClick={this.handleShow}>Undo</Button>
                </Col>
            </Row>
            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Body style={{textAlign: 'center'}}>
                    <h4>Confirm undo</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    <Button variant="danger" onClick={this.handleUndo}>Undo</Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}
