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
                    <h3>{this.props.selectionNumber}. {this.props.currentUser.name}</h3>
                </div>
            </div>
        )
    }
}
