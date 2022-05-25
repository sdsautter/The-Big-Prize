import { Component } from 'react'
import {NameInput} from './NameInput'
import {NameList} from './NameList'
import {Drivers} from './Drivers'
import { CurrentUser } from './CurrentUser'
import { Results } from './Results'
import './BigPrize.css';
import { Container, Row, Col } from 'react-bootstrap'

const DriverNames = {
    // Row 1
    SCOTT: {
        name: "Scott Dixon",
        number: "9",
    },
    ALEX: {
        name: "Alex Palou",
        number: "10",
    },
    VEEKAY: {
        name: "Rinus VeeKay",
        number: "21",
    },
    // Row 2
    ED: {
        name: "Ed Carpenter",
        number: "33",
    },
    MARCUS: {
        name: "Marcus Ericsson",
        number: "8",
    },
    TONY: {
        name: "Tony Kanaan",
        number: "1",
    },
    // Row 3
    PATO: {
        name: "Pato O'Ward",
        number: "5",
    },
    FELIX: {
        name: "Felix Rosenqvist",
        number: "7",
    },
    ROMAIN: {
        name: "Romain Grosjean",
        number: "28"
    },
    // Row 4
    TAKUMA: {
        name: "Takuma Sato",
        number: "51",
    },
    WILL: {
        name: "Will Power",
        number: "12",
    },
    JIMMIE : {
        name: "Jimmie Johnson",
        number: "48"
    },
    // Row 5
    DAVID: {
        name: "David Malukas",
        number: "18"
    },
    JOSEF: {
        name: "Josef Newgarden",
        number: "2",
    },
    SANTINO: {
        name: "Santino Ferrucci",
        number: "23",
    },
    // Row 6
    SIMON: {
        name: "Simon Pagenaud",
        number: "60",
    },
    JR: {
        name: "JR Hildebrand",
        number: "11",
    },
    CONOR: {
        name: "Conor Daly",
        number: "20",
    },
    // Row 7
    CALLUM: {
        name: "Callum Ilott",
        number: "24"
    },
    ALEXANDER: {
        name: "Alexander Rossi",
        number: "27",
    },
    GRAHAM: {
        name: "Graham Rahal",
        number: "15",
    },
    // Row 8
    SAGE: {
        name: "Sage Karam",
        number: "24",
    },
    MARCO: {
        name: "Marco Andretti",
        number: "98"
    },
    DEVLIN: {
        name: "Devlin DeFrancesco",
        number: "29"
    },
    // Row 9
    COLTON: {
        name: "Colton Herta",
        number: "26",
    },
    SCOTT_MC: {
        name: "Scott McLaughlin",
        number: "3"
    },
    HELIO: {
        name: "Helio Castroneves",
        number: "06",
    },
    // Row 10
    KYLE: {
        name: "Kyle Kirkwood",
        number: "14"
    },
    DALTON: {
        name: "Dalton Kellett",
        number: "4",
    },
    JUAN: {
        name: "Juan Pablo Montoya",
        number: "6"
    },
    // Row 11
    CHRISTIAN: {
        name: "Christian Lundgaard",
        number: "30"
    },
    JACK: {
        name: "Jack Harvey",
        number: "45"
    },
    STEFAN: {
        name: "Stefan Wilson",
        number: "25"
    },

    // PREVIOUS DRIVERS
    // RYAN: {
    //     name: "Ryan Hunter-Reay",
    //     number: 28,
    // },
    // JAMES_HINCH: {
    //     name: "James Hinchcliffe",
    //     number: 29,
    // },
    
   
    // SPENCER: {
    //     name: "Spencer Pigot",
    //     number: 45,
    // },
    // ZACH: {
    //     name: "Zach Veach",
    //     number: 26,
    // },
    // OLIVER: {
    //     name: "Oliver Askew",
    //     number: 7,
    // },
    // FERNANDO: {
    //     name: "Fernando Alonso",
    //     number: 66,
    // },
    // JAMES: {
    //     name: "James Davison",
    //     number: 51,
    // },
    // CHARLIE: {
    //     name: "Charlie Kimball",
    //     number: 4,
    // },
    // MAX: {
    //     name: "Max Chilton",
    //     number: 59,
    // },
    // BEN: {
    //     name: "Ben Hanley",
    //     number: 81,
    // }
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
        await this.setState({currentUser: this.state.participants[0]})
        await this.setState({page: Page.SELECT});
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
        await this.setState({selectionNumber});
        for (let i = 0; i < this.state.participants.length; i++) {
            if (this.state.currentUser === this.state.participants[i]) {
                if (this.ascending) {
                    if (i + 1 === this.state.participants.length) {
                        this.ascending = false;
                        return;
                    } else {
                        await this.setState({currentUser: this.state.participants[i+1]});
                        return;
                    }
                } else {
                    if (i === 0) {
                        this.ascending = true;
                        return;
                    } else {
                        await this.setState({currentUser: this.state.participants[i-1]});
                        return;
                    }
                }
            }
        }
    }

    undo = async () => {
        const selectionNumber = this.state.selectionNumber - 1;
        await this.setState({selectionNumber});
        for (let i = 0; i < this.state.participants.length; i++) {
            if (this.state.currentUser === this.state.participants[i]) {
                if (this.ascending) {
                    if (i === 0) {
                        this.ascending = false;
                        const removedDriver = this.state.participants[i].drivers[this.state.participants[i].drivers.length-1];
                        await this.enableDriver(removedDriver)
                        this.state.participants[i].drivers.pop();
                        await this.setState({currentUser: this.state.participants[i]});
                        await this.setState({participants: this.state.participants});
                        return;
                    } else {
                        const participant = this.state.participants[i-1];
                        const removedDriver = participant.drivers[participant.drivers.length-1];
                        await this.enableDriver(removedDriver)
                        participant.drivers.pop();
                        await this.setState({currentUser: participant});
                        await this.setState({participants: this.state.participants});
                        return;
                    }
                } else {
                    if (i + 1 === this.state.participants.length) {
                        this.ascending = true;
                        const removedDriver = this.state.participants[i].drivers[this.state.participants[i].drivers.length-1];
                        await this.enableDriver(removedDriver)
                        this.state.participants[i].drivers.pop();
                        await this.setState({currentUser: this.state.participants[i]});
                        await this.setState({participants: this.state.participants});
                        return;
                    } else {
                        const participant = this.state.participants[i+1];
                        const removedDriver = participant.drivers[participant.drivers.length-1];
                        await this.enableDriver(removedDriver)
                        participant.drivers.pop();
                        await this.setState({currentUser: participant});
                        await this.setState({participants: this.state.participants});
                        return;
                    }
                }
            }
        }
    }

    enableDriver = async(removedDriver) => {
        this.state.drivers.forEach(async driver => {
            if (removedDriver === driver.name) {
                driver.selected = false;
                await this.setState({drivers: this.state.drivers})
                return;
            }
        })
    }

    renderPage = () => {
        switch (this.state.page) {
            case Page.INPUT:
                return (
                    <Row className="">
                        <Col md={8} sm={12}>
                            <h1 style={{marginTop: "1rem"}}>The Official Big Prize™</h1>
                            <img style={{maxWidth: "50%"}} src="/img/indy500.png" alt="indy500" />
                            <br />
                            <NameInput
                                addName={this.addName}
                                names={this.state.participants}
                                enginesReady={this.enginesReady}
                            />
                        </Col>
                        <Col md={4} sm={12} className="name-list">
                            <NameList
                                participants={this.state.participants}
                            />
                        </Col>
                    </Row>
                )
        
            case Page.SELECT:
                return (
                    <Row>
                        <Col md={8} sm={12}>
                            <h1 style={{marginTop: "1rem"}}>The Official Big Prize™</h1>
                            <img style={{maxWidth: "50%"}} src="/img/indy500.png" alt="indy500" />
                            <br />
                            <CurrentUser
                                currentUser={this.state.currentUser}
                                selectionNumber={this.state.selectionNumber}
                                undo={this.undo}
                            />
                            <br />
                            <Drivers
                                selectDriver={this.selectDriver}
                                drivers={this.state.drivers}
                            />
                        </Col>
                        <Col md={4} sm={12} className="name-list">
                            <NameList
                                currentUser={this.state.currentUser}
                                participants={this.state.participants}
                            />
                        </Col>
                    </Row>
                )
                case Page.RESULTS:
                    return (
                        <Row>
                            <Col xs={12}>
                                <h1 style={{marginTop: "1rem"}}>The Official Big Prize™</h1>
                            </Col>
                            <Col xs={12}>
                            <img style={{maxWidth: "30%"}} src="/img/indy500.png" alt="indy500" />
                            </Col>
                            <br />
                            <Col>              
                                <Results
                                    participants={this.state.participants}
                                />
                            </Col>
                        </Row>
                    )
                default: 
                break;
        }
    }
    render(){
        return (
            <Container>
                {this.renderPage()}
            </Container>   
        )
    }
}
