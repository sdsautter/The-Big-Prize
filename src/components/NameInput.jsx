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
                <input type="submit" value="Add Hopeful" />
                <button disabled={this.readyDisabled()} onClick={this.props.enginesReady}>Engines Ready!</button>
            </form>
        )
    }
}
