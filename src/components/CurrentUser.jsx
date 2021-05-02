import React from 'react'

export class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    render(){
        return (
            <div>
                <h3>Selecting:</h3>
                <p>{this.props.currentUser}</p>
            </div>
        )
    }
}
