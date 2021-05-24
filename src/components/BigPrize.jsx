import { Component } from 'react'
import {NameInput} from './NameInput'
import {NameList} from './NameList'
import {Drivers} from './Drivers'
import { CurrentUser } from './CurrentUser'
import { Results } from './Results'
import './BigPrize.css';
import { Container, Row, Col } from 'react-bootstrap'

const DriverNames = {
    DIXON: {
        name: "Scott Dixon",
        number: 9
    }, 
    HERTA: {
        name: "Colton Herta",
        number: 26
    },
    VEEKAY: {
        name: "Rinus VeeKay",
        number: 21
    },
    CARPENTER: {
        name: "Ed Carpenter",
        number: 20
    },
    KANAAN: {
        name: "Tony Kanaan",
        number: 48
    },
    PALOU: {
        name: "Alex Palou",
        number: 10
    },
    HUNTER_REAY: {
        name: "Ryan Hunter-Reay",
        number: 28
    },
    CASTRONEVES: {
        name: "Helio Castroneves",
        number: "06"
    },
    MARCUS: {
        name: "Marcus Ericsson",
        number: 8,
    },
    ROSSI: {
        name: "Alexander Rossi",
        number: 27
    },
    JONES: {
        name: "Ed Jones",
        number: 18
    },
    OWARD: {
        name: "Pato O'Ward",
        number: 5
    },
    FITTIPALDI: {
        name: "Pietro Fittipaldi",
        number: 51
    },
    ROSENQVIST: {
        name: "Felix Rosenqvist",
        number: 7
    },
    SATO: {
        name: "Takuma Sato",
        number: 30
    },
    HINCHCLIFFE: {
        name: "James Hinchcliffe",
        number: 29
    },
    MCLAUGHLIN: {
        name: "Scott McLaughlin",
        number: 3
    },
    RAHAL: {
        name: "Graham Rahal",
        number: 15
    },
    DALY: {
        name: "Conor Daly",
        number: 47
    },
    HARVEY: {
        name: "Jack Harvey",
        number: 60
    },
    NEWGARDEN: {
        name: "Josef Newgarden",
        number: 2
    },
    HILDEBRAND: {
        name: "JR Hildebrand",
        number: 1
    },
    FERRUCCI: {
        name: "Santino Ferrucci",
        number: 45
    },
    MONTOYA: {
        name: "Juan Pablo Montoya",
        number: 86
    },
    ANDRETTI: {
        name: "Marco Andretti",
        number: 98
    },
    PAGENAUD: {
        name: "Simon Pagenaud",
        number: 22
    },
    BOURDAIS: {
        name: "Sebastien Bourdais",
        number: 14
    },
    WILSON: {
        name: "Stefan Wilson",
        number: 25
    },
    CHILTON: {
        name: "Max Chilton",
        number: 59
    },
    KELLETT: {
        name: "Dalton Kellett",
        number: 4
    },
    KARAM: {
        name: "Sage Karam",
        number: 24
    },
    POWER: {
        name: "Will Power",
        number: 12
    },
    SILVESTRO: {
        name: "Simona De Silvestro",
        number: 16
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
