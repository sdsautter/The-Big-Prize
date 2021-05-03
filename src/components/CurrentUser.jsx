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
                <h2>Selecting:</h2>
                <div>
                    <strong>{this.props.selectionNumber}. {this.props.currentUser.name}</strong>
                </div>
            </div>
        )
    }
}
