import { Component } from 'react'
import {NameInput} from './NameInput'
import {NameList} from './NameList'
import {Drivers} from './Drivers'
import { CurrentUser } from './CurrentUser'
import './BigPrize.css';

const DriverNames = {
    RICH: "Richard Petty",
    TOKYO: "Tokyo Tsunami",
    RICKY: "Ricky Bobby",
    MICKY: "micky Bobby",
    NICKY: "nicky Bobby",
    OICKY: "oicky Bobby",
    PICKY: "picky Bobby",
}

const Page = {
    INPUT: "input",
    SELECT: "select",
    RESULTS: "result"
}
export class BigPrize extends Component {
    ascending = true;
    constructor(props) {
        super(props);
        this.state = {
            page: Page.INPUT,
            participants: [],
            drivers: Object.keys(DriverNames).map(driver => {
                return {name: DriverNames[driver], selected: false}
            }),
            currentUser: null,
            selectionNumber: 1
        }
    }

    addName = async (name) => {
        if (name.trim() === '')  return;
        const names = this.state.participants;
        names.push({name: name.trim(), drivers:[]});
        await this.setState({names})
    }

    enginesReady = async () => {
        await this.setState({currentUser: this.state.participants[0]})
        await this.setState({page: Page.SELECT});
    }

    selectDriver = async (driver) => {
        const name = driver.target.name;
        const drivers = this.state.drivers;
        if (!window.confirm(`Did you mean to pick ${name} for ${this.state.currentUser.name}?`)) {
            return
        };
        drivers.forEach(driver => {
            if (driver.name === name) {
                driver.selected = true;
            }
        })
        await this.setState({drivers})
        const participants = this.state.participants;
        participants.forEach(user => {
            if (user === this.state.currentUser) {
                user.drivers.push(name)
            }
        })
        await this.setState({ participants })
        await this.nextParticipant();
    }

    nextParticipant = async () => {
        const selectionNumber = this.state.selectionNumber+1;
        for (let i = 0; i < this.state.participants.length; i++) {
            if (this.state.currentUser === this.state.participants[i]) {
                if (this.ascending) {
                    if (i + 1 === this.state.participants.length) {
                        this.ascending = false;
                        await this.setState({selectionNumber});
                        return;
                    } else {
                        await this.setState({currentUser: this.state.participants[i+1]});
                        await this.setState({selectionNumber});
                        return;
                    }
                } else {
                    if (i === 0) {
                        this.ascending = true;
                        await this.setState({selectionNumber});
                        return;
                    } else {
                        await this.setState({currentUser: this.state.participants[i-1]});
                        await this.setState({selectionNumber});
                        return;
                    }
                }
            }
        }
    }

    renderPage = () => {
        switch (this.state.page) {
            case Page.INPUT:
                return (
                    <NameInput
                        addName={this.addName}
                        names={this.state.participants}
                        enginesReady={this.enginesReady}
                    />
                )
        
            case Page.SELECT:
                return (
                    <div>
                        <CurrentUser
                            currentUser={this.state.currentUser}
                            selectionNumber={this.state.selectionNumber}
                        />
                        <br />
                        <Drivers
                            selectDriver={this.selectDriver}
                            drivers={this.state.drivers}
                        />
                    </div>
                )
                default: 
                break;
        }
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-9 page">
                        {this.renderPage()}
                    </div>
                    <div className="col-3 name-list">
                        <NameList
                            participants={this.state.participants}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
