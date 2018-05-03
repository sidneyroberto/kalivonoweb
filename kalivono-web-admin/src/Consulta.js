import React, { Component } from 'react';
import TabelaTermos from './TabelaTermos';
import axios from 'axios';

class Consulta extends Component {
    constructor() {
        super();
        this.state = {
            filtro: '',
            termos: []
        };

        this.urlApi = 'http://localhost:3000/termos/';

        this.aoPesquisar = this.aoPesquisar.bind(this);
    }

    aoPesquisar(evento) {
        const valor = evento.target.value;
        this.setState({
            filtro: valor
        });
        if (evento.target.value) {
            axios
                .get(`${this.urlApi}${evento.target.value}`)
                .then(
                    resposta => this.setState({ termos: resposta.data })
                );
        }

        console.log(this.state.termos);
    }

    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <h3>Consulta de termos</h3>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <input type="text" name="filtro" value={this.state.filtro} className="form-control" placeholder="Digite o termo" onChange={this.aoPesquisar} />
                    </div>
                    <div className="col-md-2"></div>
                </div>

                <br />

                {
                    this.state.filtro &&
                    <div className="table-responsive">
                        <TabelaTermos termos={this.state.termos} />
                    </div>
                }
            </div>
        );
    }
}

export default Consulta;