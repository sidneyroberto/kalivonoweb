import React, { Component } from 'react';
import ModalMidia from './ModalMidia';
import TabelaMidias from './TabelaMidias';
import axios from 'axios';
import $ from 'jquery';

class NovoTermo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            termo: this.criaNovoTermoLimpo(),
            midia: '',
            mensagemMidia: '',
            midiaSelecionada: {
                tipo: '',
                url: ''
            },
            mensagem: '',
            sucesso: false,
            erro: false
        };
        this.urlApi = 'http://localhost:3000/termos/';

        this.aoAlterarValorDoCampo = this.aoAlterarValorDoCampo.bind(this);
        this.salvar = this.salvar.bind(this);
        this.adicionarMidia = this.adicionarMidia.bind(this);
        this.removerMidia = this.removerMidia.bind(this);
        this.aoVisualizar = this.aoVisualizar.bind(this);
    }

    aoVisualizar(midia) {
        this.setState({ midiaSelecionada: midia });
    }

    removerMidia(midia) {
        let midiasAtuais = this.state.midias;
        midiasAtuais = midiasAtuais.filter(function (m) {
            return m.url !== midia.url;
        });
        this.setState({ midias: midiasAtuais });
    }

    adicionarMidia(evento) {
        this.setState({ mensagemMidia: '' });

        if (this.state.midia) {
            let midiaValida = false, novaMidia = {};
            if (this.state.midia.startsWith('https://m.youtube.com/')
                || this.state.midia.startsWith('https://www.youtube.com/')) {
                novaMidia.tipo = 'video';
                midiaValida = true;
            } else if (this.state.midia.startsWith('https://m.imgur.com/')
                || this.state.midia.startsWith('https://imgur.com/')
                || this.state.midia.startsWith('https://i.imgur.com/')) {
                novaMidia.tipo = 'imagem';
                midiaValida = true;
            }

            if (midiaValida) {
                novaMidia.url = this.state.midia;
                let verificaSeJaExiste = function (midia) {
                    return novaMidia.url === midia.url && novaMidia.tipo === midia.tipo;
                };
                if (this.state.termo.midias.filter(verificaSeJaExiste).length === 0) {
                    let copiaMidias = this.state.termo.midias;
                    copiaMidias.push(novaMidia);
                    let novoTermo = this.state.termo;
                    novoTermo.midias = copiaMidias;
                    this.setState({ termo: novoTermo });
                    this.setState({ midia: '' });
                } else {
                    this.setState({ mensagemMidia: 'Mídia repetida' });
                }
            } else {
                this.setState({ mensagemMidia: 'Mídia inválida' });
            }
        } else {
            this.setState({ mensagemMidia: 'Nenhuma URL informada' });
        }

    }

    aoAlterarValorDoCampo(evento) {
        let alvo = evento.target.name;
        let valor = evento.target.value;

        if (alvo !== 'midia') {
            const novoTermo = { ...this.state.termo };
            novoTermo[alvo] = valor;
            this.setState({
                termo: novoTermo
            });
        } else {
            console.log(alvo);
            this.setState({
                [alvo]: valor
            });
        }
    }

    salvar(evento) {
        evento.preventDefault();
        this.setState({ erro: false, sucesso: false });

        if (this.state.termo.midias.length === 0) {
            this.setState({ mensagemMidia: 'É preciso adicionar ao menos uma mídia' });
        } else {
            axios
                .post(this.urlApi, this.state.termo)
                .then((termo) => {
                    this.setState({
                        mensagem: 'Termo salvo',
                        termo: this.criaNovoTermoLimpo(),
                        sucesso: true
                    });
                    $('html, body').animate(
                        {
                            scrollTop: $("#inicio").offset().top
                        },
                        500
                    );
                })
                .catch((erro) => {
                    console.log(erro);
                    this.setState({
                        mensagem: 'Ocorreu um erro ao tentar salvar o termo',
                        erro: true
                    });
                });
        }
    }

    criaNovoTermoLimpo() {
        return {
            emTerena: '',
            emPortugues: '',
            aplicacaoFrase: '',
            significadoAplicacaoFrase: '',
            midias: []
        };
    }

    render() {
        return (
            <div className="container" id="inicio">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Novo termo</h3>
                    </div>
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
                    <div className="col-md-6">
                        <form onSubmit={this.salvar}>
                            <div className="form-group">
                                <label>Significado em Terena:</label>
                                <input type="text" className="form-control" name="emTerena" value={this.state.termo.emTerena} required onChange={this.aoAlterarValorDoCampo} />
                            </div>
                            <div className="form-group">
                                <label>Significado em Português:</label>
                                <input type="text" className="form-control" name="emPortugues" value={this.state.termo.emPortugues} required onChange={this.aoAlterarValorDoCampo} />
                            </div>
                            <div className="form-group">
                                <label>Aplicação em uma frase:</label>
                                <textarea className="form-control" name="aplicacaoFrase" value={this.state.termo.aplicacaoFrase} required onChange={this.aoAlterarValorDoCampo}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Significado da aplicação em frase:</label>
                                <textarea className="form-control" name="significadoAplicacaoFrase" value={this.state.termo.significadoAplicacaoFrase} required onChange={this.aoAlterarValorDoCampo}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Adicionar URL de mídia:</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" name="midia" value={this.state.midia} onChange={this.aoAlterarValorDoCampo} />
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-secondary" onClick={this.adicionarMidia}>Adicionar</button>
                                    </span>
                                </div>
                            </div>
                            {
                                this.state.mensagemMidia &&
                                < div className="form-group">
                                    <span className="alert alert-warning">{this.state.mensagemMidia}</span>
                                </div>
                            }
                            <TabelaMidias
                                midias={this.state.termo.midias}
                                funcaoDeRemocao={this.removerMidia}
                                funcaoDeVisualizacao={this.aoVisualizar}
                                idModal="modalMidia" />
                            <input type="submit" className="btn btn-primary" value="Salvar" />
                        </form>
                    </div>

                </div>

                <ModalMidia id="modalMidia" midia={this.state.midiaSelecionada} />
            </div >
        );
    }
}

export default NovoTermo;