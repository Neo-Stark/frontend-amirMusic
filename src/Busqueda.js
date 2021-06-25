import React from "react";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";


class Busqueda extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            busqueda : ""
        }
    }

    handleSubmit(event, value) {
        event.preventDefault()
        console.log(value)
        this.props.handleBuscar(value) // Pasar hacia arriba el valor
    }

    // onChange bindeada para que coja el this
    render() {
        return (
            <Form className="d-flex"
              onSubmit={(e)=>this.handleSubmit(e,this.state.busqueda)}
              >
            <FormControl
              type="search"
              placeholder="Buscar"
              className="mr-2"
              aria-label="Search"
              onChange={(e) => this.setState({busqueda: e.target.value})}
            />
            <Button variant="outline-success" onClick={(e)=>this.handleSubmit(e, this.state.busqueda)}>Buscar</Button>
          </Form>
        )
    }
}
export default Busqueda