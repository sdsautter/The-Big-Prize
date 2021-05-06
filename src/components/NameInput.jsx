import React from 'react'

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
                    <button style={{margin: "5px", width:"100%"}} className="btn btn-success" type="submit" disabled={this.inputDisabled()}>Add Hopeful</button>
                </div>
                <div className="col-4">
                    <button style={{margin: "5px", width:"100%"}} className="btn btn-danger" disabled={this.readyDisabled()} onClick={this.props.enginesReady}>Engines Ready!</button>
                </div>
                </div>
            </form>
        )
    }
}
