import { Component } from 'react'
import {NameInput} from './NameInput'
import {NameList} from './NameList'
import {Drivers} from './Drivers'
import { CurrentUser } from './CurrentUser'
import { Results } from './Results'
import './BigPrize.css';

const DriverNames = {
    MARCO: "Marco Andretti",
    SCOTT: "Scott Dixon",
    // TAKUMA: "Takuma Sato",
    // RINUS: "Rinus VeeKay",
    // ALEX: "Alex Palou",
    // GRAHAM: "Graham Rahal",
    // ALEXANDER: "Alexander Rossi",
    // COLTON: "Colton Herta",
    // MARCUS: "Marcus Ericsson",
    // SPENCER: "Spencer Pigot",
    // JOSEF: "Josef Newgarden",
    // FELIX: "Felix Rosenqvist",
    // PATO: "Pato O'Ward",
    // ED: "Ed Carpenter",
    // ZACH: "Zach Veach",
    // CONOR: "Conor Daly",
    // SANTINO: "Santino Ferrucci",
    // JACK: "Jack Harvey",
    // OLIVER: "Oliver Askew",
    // WILL: "Will Power",
    // TONY: "Tony Kanaan",
    // DALTON: "Dalton Kellett",
    // SIMON: "Simon Pagenaud",
    // FERNANDO: "Fernando Alonso",
    // JAMES: "James Davison",
    // HELIO: "Helio Castroneves",
    // CHARLIE: "Charlie Kimball",
    // MAX: "Max Chilton",
    // SAGE: "Sage Karam",
    // JR: "JR Hildebrand",
    // BEN: "Ben Hanley"
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
        if (!window.confirm(`Ready to pick drivers?`)) {
            return
        };
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
        if (this.state.selectionNumber === this.state.drivers.length) {
            await this.setState({page: Page.RESULTS})
        } else {
            await this.nextParticipant();
        }
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
                    <div className="row">
                        <div className="col-8">
                            <NameInput
                                addName={this.addName}
                                names={this.state.participants}
                                enginesReady={this.enginesReady}
                            />
                        </div>
                        <div className="col-4 name-list">
                            <NameList
                                participants={this.state.participants}
                            />
                        </div>
                    </div>
                )
        
            case Page.SELECT:
                return (
                    <div className="row">
                        <div className="col-8">
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
                        <div className="col-4 name-list">
                            <NameList
                                participants={this.state.participants}
                            />
                        </div>
                    </div>
                )
                case Page.RESULTS:
                    return (
                        <div className="row">
                            <div className="col-12">
                                <Results
                                    participants={this.state.participants}
                                />
                            </div>
                        </div>
                    )
                default: 
                break;
        }
    }
    render(){
        return (
            <div className="container">
                 <h1 style={{marginTop: "1rem"}}>The Big Prize</h1>
                <br />
                {this.renderPage()}
            </div>
        )
    }
}
