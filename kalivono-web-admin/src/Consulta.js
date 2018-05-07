import React, { Component } from 'react';
import TabelaTermos from './TabelaTermos';
import axios from 'axios';
import ReactLoading from 'react-loading';
import ModalVisualizacao from './ModalVisualizacao';
import ModalRemocao from './ModalRemocao';

class Consulta extends Component {
    constructor() {
        super();
        this.state = {
            filtro: '',
            termos: [],
            termosCarregados: false,
            termoSelecionado: {},
            erro: false,
            sucesso: false,
            mensagem: ''
        };

        this.urlApi = 'http://localhost:3000/termos/';

        this.aoPesquisar = this.aoPesquisar.bind(this);
        this.aoVisualizarTermo = this.aoVisualizarTermo.bind(this);
        this.aoRemoverTermo = this.aoRemoverTermo.bind(this);
        this.removerTermo = this.removerTermo.bind(this);
    }

    aoVisualizarTermo(termo) {
        this.setState({ termoSelecionado: termo });
    }

    aoRemoverTermo(termo) {
        this.setState({ termoSelecionado: termo });
    }

    aoPesquisar(evento) {
        this.setState({
            termosCarregados: false,
            erro: false,
            sucesso: false
        });
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

    removerTermo() {
        this.setState({ erro: false, sucesso: false });

        axios
            .delete(`${this.urlApi}${this.state.termoSelecionado._id}`)
            .then(
                () => {
                    let id = this.state.termoSelecionado._id;
                    let termosAux = this.state.termos.filter((termo) => {
                        return termo._id !== id;
                    });
                    this.setState({
                        sucesso: true,
                        mensagem: 'Termo removido',
                        termos: termosAux
                    });
                }
            )
            .catch((erro) => {
                console.log(erro);
                this.setState({
                    erro: true,
                    mensagem: 'Ocorreu um erro ao tentar remover o termo'
                });
            });
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
                    this.state.sucesso &&
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="alert alert-success">{this.state.mensagem}</span>
                            </div>
                        </div>
                        <br />
                    </div>
                }

                {
                    this.state.erro &&
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="alert alert-danger">{this.state.mensagem}</span>
                            </div>
                        </div>
                        <br />
                    </div>
                }

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
                            idModalRemocao="modalRemocao"
                            termos={this.state.termos}
                            funcaoVisualizacao={this.aoVisualizarTermo}
                            funcaoRemocao={this.aoRemoverTermo} />
                    </div>
                }

                <ModalVisualizacao
                    idModal="modalVisualizacao"
                    termo={this.state.termoSelecionado} />
                <ModalRemocao
                    idModal="modalRemocao"
                    funcaoRemocao={this.removerTermo}
                    nomeTermo={this.state.termoSelecionado.emTerena} />
            </div>
        );
    }
}

export default Consulta;