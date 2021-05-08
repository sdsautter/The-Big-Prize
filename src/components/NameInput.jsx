import React from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import "./NameInput.css"

export class NameInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            show: false
        }
    }
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    readyDisabled = () => {
        if (this.props?.names?.length > 0) {
            return false;
        }
        return true;
    }

    inputDisabled = () => {
        return this.state.name.trim() === ''
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addName(this.state.name);
        this.setState({name: ''})
    }

    handleChange = async e => {
        await this.setState({name: e.target.value});
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                        <h3>Participant Name</h3>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={8}>
                        <input style={{width: "100%", textAlign: "center"}} type="text" value={this.state.name} onChange={this.handleChange} />
                    </Col>
                </Row>
                <br />
                <Row className="justify-content-md-center">
                    <Col lg={4} md={6} sm={6}>
                        <Button style={{margin: "5px", marginBottom: "1rem", width:"100%", height: "90%"}} variant="success" type="submit" disabled={this.inputDisabled()}><span style={{fontSize: "1.8rem"}}>Add Participant</span></Button>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                        <span>
                            <Button style={{margin: "5px", width:"100%", height: "90%"}} className="readyBtn" variant="light" disabled={this.readyDisabled()} onClick={this.handleShow}><span className="readyText">Engines Ready!</span></Button>
                        </span>
                    </Col>
                </Row>
            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Body style={{textAlign: 'center', color:'black'}}>
                    Are you ready to select drivers?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.enginesReady}>Vroom</Button>
                </Modal.Footer>
            </Modal>
            </form>
        )
    }
}
