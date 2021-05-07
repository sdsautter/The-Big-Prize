import { Component } from 'react'
import {NameInput} from './NameInput'
import {NameList} from './NameList'
import {Drivers} from './Drivers'
import { CurrentUser } from './CurrentUser'
import { Results } from './Results'
import './BigPrize.css';

const DriverNames = {
    MARCO: {
        name: "Marco Andretti",
        number: 98,
    },
    SCOTT: {
        name: "Scott Dixon",
        number: 9,
    },
    TAKUMA: {
        name: "Takuma Sato",
        number: 30,
    },
    RINUS: {
        name: "Rinus VeeKay",
        number: 21,
    },
    RYAN: {
        name: "Ryan Hunter-Reay",
        number: 28,
    },
    JAMES_HINCH: {
        name: "James Hinchcliffe",
        number: 29,
    },
    ALEX: {
        name: "Alex Palou",
        number: 55,
    },
    GRAHAM: {
        name: "Graham Rahal",
        number: 15,
    },
    ALEXANDER: {
        name: "Alexander Rossi",
        number: 27,
    },
    COLTON: {
        name: "Colton Herta",
        number: 88,
    },
    MARCUS: {
        name: "Marcus Ericsson",
        number: 8,
    },
    SPENCER: {
        name: "Spencer Pigot",
        number: 45,
    },
    JOSEF: {
        name: "Josef Newgarden",
        number: 1,
    },
    FELIX: {
        name: "Felix Rosenqvist",
        number: 10,
    },
    PATO: {
        name: "Pato O'Ward",
        number: 5,
    },
    ED: {
        name: "Ed Carpenter",
        number: 20,
    },
    ZACH: {
        name: "Zach Veach",
        number: 26,
    },
    CONOR: {
        name: "Conor Daly",
        number: 47,
    },
    SANTINO: {
        name: "Santino Ferrucci",
        number: 18,
    },
    JACK: {
        name: "Jack Harvey",
        number: 60,
    },
    OLIVER: {
        name: "Oliver Askew",
        number: 7,
    },
    WILL: {
        name: "Will Power",
        number: 12,
    },
    TONY: {
        name: "Tony Kanaan",
        number: 14,
    },
    DALTON: {
        name: "Dalton Kellett",
        number: 41,
    },
    SIMON: {
        name: "Simon Pagenaud",
        number: 22,
    },
    FERNANDO: {
        name: "Fernando Alonso",
        number: 66,
    },
    JAMES: {
        name: "James Davison",
        number: 51,
    },
    HELIO: {
        name: "Helio Castroneves",
        number: 3,
    },
    CHARLIE: {
        name: "Charlie Kimball",
        number: 4,
    },
    MAX: {
        name: "Max Chilton",
        number: 59,
    },
    SAGE: {
        name: "Sage Karam",
        number: 24,
    },
    JR: {
        name: "JR Hildebrand",
        number: 67,
    },
    BEN: {
        name: "Ben Hanley",
        number: 81,
    }
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
            drivers: Object.keys(DriverNames).map((driver, idx) => {
                return {name: DriverNames[driver].name, number:  DriverNames[driver].number, selected: false}
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
                        <div className="col-md-8 col-sm-12">
                            <NameInput
                                addName={this.addName}
                                names={this.state.participants}
                                enginesReady={this.enginesReady}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 name-list">
                            <NameList
                                participants={this.state.participants}
                            />
                        </div>
                    </div>
                )
        
            case Page.SELECT:
                return (
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
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
                        <div className="col-md-4 col-sm-12 name-list">
                            <NameList
                                currentUser={this.state.currentUser}
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
