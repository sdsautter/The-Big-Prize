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
                <label>
                Name: <span>   </span>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                </label>
                <button style={{margin: "5px"}} className="btn btn-success" type="submit" disabled={this.inputDisabled()}>Add Hopeful</button>
                <button style={{margin: "5px"}} className="btn btn-danger" disabled={this.readyDisabled()} onClick={this.props.enginesReady}>Engines Ready!</button>
            </form>
        )
    }
}
