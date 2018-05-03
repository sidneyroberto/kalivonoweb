import React, { Component } from 'react';
import TabelaTermos from './TabelaTermos';
import axios from 'axios';
import ReactLoading from 'react-loading';
import ModalVisualizacao from './ModalVisualizacao';

class Consulta extends Component {
    constructor() {
        super();
        this.state = {
            filtro: '',
            termos: [],
            termosCarregados: false,
            termoSelecionado: {}
        };

        this.urlApi = 'http://localhost:3000/termos/';

        this.aoPesquisar = this.aoPesquisar.bind(this);
        this.aoVisualizarTermo = this.aoVisualizarTermo.bind(this);
        this.aoEditarTermo = this.aoEditarTermo.bind(this);
        this.aoRemoverTermo = this.aoRemoverTermo.bind(this);
    }

    aoVisualizarTermo(termo) {
        this.setState({ termoSelecionado: termo });
    }

    aoEditarTermo(termo) {
        this.setState({ termoSelecionado: termo });
    }

    aoRemoverTermo(termo) {
        this.setState({ termoSelecionado: termo });
    }

    aoPesquisar(evento) {
        this.setState({ termosCarregados: false });
        const valor = evento.target.value;
        this.setState({
            filtro: valor
        });
        if (evento.target.value) {
            axios
                .get(`${this.urlApi}${evento.target.value}`)
                .then(
                    resposta => this.setState({ termos: resposta.data, termosCarregados: true })
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

                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-2">
                        {
                            this.state.filtro && !this.state.termosCarregados &&
                            <div className="text-center">
                                <ReactLoading type="spin" color="#444" />
                            </div>
                        }
                    </div>
                    <div className="col-md-5"></div>
                </div>

                {
                    this.state.filtro &&
                    <div className="table-responsive">
                        <TabelaTermos
                            idModalVisualizacao="modalVisualizacao"
                            termos={this.state.termos}
                            funcaoVisualizacao={this.aoVisualizarTermo}
                            funcaoRemocao={this.aoRemoverTermo}
                            funcaoEdicao={this.aoEditarTermo} />
                    </div>
                }

                <ModalVisualizacao idModal="modalVisualizacao" termo={this.state.termoSelecionado} />
            </div>
        );
    }
}

export default Consulta;