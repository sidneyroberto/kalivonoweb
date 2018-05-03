import React, { Component } from 'react';
import ModalMidia from './ModalMidia';
import TabelaMidias from './TabelaMidias';

class NovoTermo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emTerena: '',
            emPortugues: '',
            aplicacaoFrase: '',
            significadoAplicacaoFrase: '',
            midia: '',
            midias: [],
            mensagemMidia: '',
            midiaSelecionada: {
                tipo: '',
                url: ''
            }
        };

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
                if (this.state.midias.filter(verificaSeJaExiste).length === 0) {
                    var copiaMidias = this.state.midias;
                    copiaMidias.push(novaMidia)
                    this.setState({ midias: copiaMidias });
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
        this.setState({
            [evento.target.name]: evento.target.value
        });
    }

    salvar(evento) {
        evento.preventDefault();
        console.log(this.state);

        /**
         * TODO Salvar o termo
         */

        this.setState({
            emTerena: '',
            emPortugues: '',
            aplicacaoFrase: '',
            significadoAplicacaoFrase: '',
            midia: '',
            midias: []
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Novo termo</h3>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.salvar}>
                            <div className="form-group">
                                <label>Significado em Terena:</label>
                                <input type="text" className="form-control" name="emTerena" value={this.state.emTerena} required onChange={this.aoAlterarValorDoCampo} />
                            </div>
                            <div className="form-group">
                                <label>Significado em Português:</label>
                                <input type="text" className="form-control" name="emPortugues" value={this.state.emPortugues} required onChange={this.aoAlterarValorDoCampo} />
                            </div>
                            <div className="form-group">
                                <label>Aplicação em uma frase:</label>
                                <textarea className="form-control" name="aplicacaoFrase" value={this.state.aplicacaoFrase} required onChange={this.aoAlterarValorDoCampo}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Significado da aplicação em frase:</label>
                                <textarea className="form-control" name="significadoAplicacaoFrase" value={this.state.significadoAplicacaoFrase} required onChange={this.aoAlterarValorDoCampo}></textarea>
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
                            <TabelaMidias
                                midias={this.state.midias}
                                funcaoDeRemocao={this.removerMidia}
                                funcaoDeVisualizacao={this.aoVisualizar}
                                idModal="modalMidia" />
                            <input type="submit" className="btn btn-primary" value="Salvar" />
                        </form>
                    </div>

                </div>

                <ModalMidia id="modalMidia" midia={this.state.midiaSelecionada} />
            </div>
        );
    }
}

export default NovoTermo;