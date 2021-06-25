import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination"
import Busqueda from "./Busqueda";

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            albumes: [],
            albumesAll: [],
            musicos: [],
            musicosPages: null,
            activeMusico: 1,
            grupos: [],
            gruposPages: null,
            activeGrupo: 1,
        }
    }

    componentDidMount() {
        const url = 'http://localhost/amirMusic/api/'

        // recuperamos los albumes
        fetch(url + 'album/')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    albumes: res,
                    albumesAll: res
                })   // Se cambia el state y re-renderiza
            })
            .catch(error => {
                console.error('Error ' + error)
            })
        // recuperamos los musicos
        fetch(url + 'musico/')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    musicos: res,
                    musicosPages: res.length / 5,
                })
            })
            .catch(error => {
                console.error('Error ' + error)
            })
        // recuperamos los grupos
        fetch(url + 'grupo/')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    grupos: res,
                    gruposPages: res.length / 5,
                })
            })
            .catch(error => {
                console.error('Error ' + error)
            })
    }

    handleClick_grupo(number) {
        this.setState({ activeGrupo: number })
    }

    check_grupo = (album) => {
        return this.state.grupos.filter((grupo) => grupo.url === album.grupo)[0]['nombre']
    }


    handleBuscar(value) {
        console.log('handleBuscar - App | value: ' + value);
        let albumes = this.state.albumesAll.filter((album) => album.titulo.includes(value));
        if (value === "") {
            this.setState((prevState) => { return { albumes: prevState.albumesAll } })
        } else {
            this.setState({ albumes: albumes })
        }
    }

    render() {
        let itemsMusicos = []
        for (let number = 1; number <= this.state.musicosPages; number++) {
            itemsMusicos.push(
                <Pagination.Item key={number} active={this.state.activeMusico === number}
                    onClick={() => this.setState({ activeMusico: number })}>
                    {number}
                </Pagination.Item>
            );
        }
        let itemsGrupos = []
        for (let number = 1; number <= this.state.gruposPages; number++) {
            this.setState()
            itemsGrupos.push(
                <Pagination.Item key={number} active={this.state.activeGrupo === number}
                    onClick={() => this.setState({ activeGrupo: number })}>
                    {number}
                </Pagination.Item>
            );
        }

        return (
            <Container fluid>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            src="img/epublibre.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#home" >Amir Music</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                        <Busqueda handleBuscar={(value) => this.handleBuscar(value)}></Busqueda>
                    </Navbar.Collapse>
                </Navbar>

                <Container>
                    <Row >
                        <h2>Álbumes</h2>
                    </Row>
                    <Row>
                        {this.state.albumes.map((album, index) => {
                            return (
                                <Col key={index} >
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={album.cover} />
                                        <Card.Body>
                                            <Card.Title>{album.titulo}</Card.Title>
                                            <Button variant="primary">Ver detalles</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    <Row>
                        <h2>Músicos</h2>
                    </Row>
                    <Row>
                        {this.state.musicos.slice(this.state.activeMusico, this.state.activeMusico + 5)
                            .map((musico, index) => {
                                return (
                                    <Col key={index} >
                                        {musico.nombre}
                                    </Col>
                                )
                            })}
                    </Row>
                    <Row>
                        <Pagination>{itemsMusicos}</Pagination>
                    </Row>
                    <Row>
                        <h2>Grupos</h2>
                    </Row>
                    <Row>
                        {this.state.grupos.slice(this.state.activeGrupo, this.state.activeGrupo + 5)
                            .map((grupo, index) => {
                                return (
                                    <Col key={index} >
                                        {grupo.nombre}
                                    </Col>
                                )
                            })}
                    </Row>
                    <Row>
                        <Pagination>{itemsGrupos}</Pagination>
                    </Row>
                </Container>
                <footer className="footer mt-auto bg-dark">
                    <div className="text-center py-4">© 2021 Copyright:
                        <a className="text-light" href="https://github.com/Neo-Stark"> Neo-Stark</a>
                    </div>
                </footer>
            </Container>
        );
    }
}



export default App;
