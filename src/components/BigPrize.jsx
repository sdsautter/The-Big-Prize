import { Component } from 'react'
import {NameInput} from './NameInput'
import {NameList} from './NameList'
import {Drivers} from './Drivers'
import { CurrentUser } from './CurrentUser'
import { Results } from './Results'
import './BigPrize.css';
import { Row, Col } from 'react-bootstrap'

const DriversArray = [
    {
        name: "Scott McLaughlin",
        number: "3",
    },
    {
        name: "Will Power",
        number: "12",
    },
    {
        name: "Josef Newgarden",
        number: "2",
    },
    {
        name: "Alexander Rossi",
        number: "7",
    },
    {
        name: "Kyle Larson",
        number: "17",
    },
    {
        name: "Santino Ferrucci",
        number: "14"
    },
    {
        name: "Rinus VeeKay",
        number: "21"
    },
    {
        name: "Pato O'Ward",
        number: "5"
    },
    {
        name: "Felix Rosenqvist",
        number: "60"
    },
    {
        name: "Takuma Sato",
        number: "75"
    },
    {
        name: "Kyle Kirkwood",
        number: "27"
    },
    {
        name: "Ryan Hunter-Reay",
        number: "23"
    },
    {
        name: "Colton Herta",
        number: "26"
    },
    {
        name: "Alex Palou",
        number: "10"
    },
    {
        name: "Callum Ilott",
        number: "6"
    },
    {
        name: "Marcus Armstrong",
        number: "11"
    },
    {
        name: "Ed Carpenter",
        number: "20"
    },
    {
        name: "Kyffin Simpson",
        number: "4"
    },
    {
        name: "Marco Andretti",
        number: "98"
    },
    {
        name: "Helio Castroneves",
        number: "06"
    },
    {
        name: "Scott Dixon",
        number: "9"
    },
    {
        name: "Agustin Canapino",
        number: "78"
    },
    {
        name: "Sting Ray Robb",
        number: "41"
    },
    {
        name: "Christian Rasmussen",
        number: "33"
    },
    {
        name: "Tom Blomqvist",
        number: "66"
    },
    {
        name: "Romain Grosjean",
        number: "77"
    },
    {
        name: "Linus Lundqvist",
        number: "8"
    },
    {
        name: "Christian Lundgaard",
        number: "45"
    },
    {
        name: "Conor Daly",
        number: "24"
    },
    {
        name: "Pietro Fittipaldi",
        number: "30"
    },
    {
        name: "Katherine Legge",
        number: "51"
    },
    {
        name: "Marcus Ericsson",
        number: "28"
    },
    {
        name: "Graham Rahal",
        number: "15"
    },
];

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
            drivers: DriversArray.map(({name, number}, idx) => {
                return {name: name, number:  number, selected: false}
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
        console.log("selected: ", driver);
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
                            <Col md={8} sm={12} style={{marginLeft: '5%'}}>
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
                        <Col md={8} sm={12} style={{marginLeft: '5%'}}>
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
                        <Col md={3} sm={12} className="name-list">
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
            <div style={{maxWidth: '95vw'}}>
                {this.renderPage()}
            </div>   
        )
    }
}
