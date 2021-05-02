import React from 'react'
import {NameInput} from './NameInput'
import {NameList} from './NameList'
import {Drivers} from './Drivers'
import { CurrentUser } from './CurrentUser'

const DriverNames = {
    RICH: "Richard Petty",
    TOKYO: "Tokyo Tsunami",
    BILLY: "Billy Bobby"
}

const Page = {
    INPUT: "input",
    SELECT: "select",
    RESULTS: "result"
}
export class BigPrize extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: Page.INPUT,
            names: [],
            drivers: [
                {
                    name: DriverNames.RICH,
                    selected: false
                },
                {
                    name: DriverNames.TOKYO,
                    selected: false
                },
                {
                    name: DriverNames.BILLY,
                    selected: false
                }
            ],
            currentUser: null
        }
    }

    addName = async (name) => {
        const names = this.state.names;
        names.push({name: name.trim(), drivers:[]});
        await this.setState({names})
    }

    enginesReady = async () => {
        await this.shuffleArray(this.state.names);
        await this.setState({page: Page.SELECT});
        await this.setState({currentUser: this.state.names[0].name})
    }

    shuffleArray = async (names) => {
        const shuffled  = names.sort(() => Math.random() - 0.5)
        const results = [];
        shuffled.forEach(name => {
            if (name.name !== '') {
                results.push(name);
            }
        })
        await this.setState({names: results})
    }

    selectDriver = async (driver) => {
        const name = driver.target.name;
        const drivers = this.state.drivers;
        drivers.forEach(driver => {
            if (driver.name === name) {
                driver.selected = true;
            }
        })
        await this.setState({drivers})
        const names = this.state.names;
        names.forEach(user => {
            if (user.name === this.state.currentUser) {
                user.drivers.push(name)
            }
        })
        await this.setState({names})
        await this.setState({currentUser: this.state.names[1].name})
    }

    renderPage = () => {
        switch (this.state.page) {
            case Page.INPUT:
                return (
                    <NameInput
                        addName={this.addName}
                        names={this.state.names}
                        enginesReady={this.enginesReady}
                    />
                )
        
            case Page.SELECT:
                return (
                    <div>
                        <CurrentUser
                            currentUser={this.state.currentUser}
                        />
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
            <div>
                {this.renderPage()}
                <NameList
                    names={this.state.names}
                />
            </div>
        )
    }
}
