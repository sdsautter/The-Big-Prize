import React from 'react'
import "./NameInput.css"

export class NameInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
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
                <div className="row">
                    <label>
                        <h3>Participant Name</h3>
                    <div style={{marginTop: "1rem"}} className="row">
                        <div className="col-8 offset-2">
                            <input style={{width: "100%", textAlign: "center"}} type="text" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    </label>
                </div>
                <br />
                <div className="row">
                <div className="col-4 offset-2">
                    <button style={{margin: "5px", width:"100%", height: "100%"}} className="btn btn-success" type="submit" disabled={this.inputDisabled()}><span style={{fontSize: "1.8rem"}}>Add Participant</span></button>
                </div>
                <div className="col-4">
                    <button style={{margin: "5px", width:"100%", height: "100%"}} className="btn readyBtn" disabled={this.readyDisabled()} onClick={this.props.enginesReady}><span className="readyText">Engines Ready!</span></button>
                </div>
                </div>
            </form>
        )
    }
}
