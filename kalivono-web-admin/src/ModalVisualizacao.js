import React, { Component } from 'react';
import TabelaMidias from './TabelaMidias';
import ModalMidia from './ModalMidia';

class ModalVisualizacao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            midiaSelecionada: {
                tipo: '',
                url: ''
            }
        };

        this.aoVisualizarMidia = this.aoVisualizarMidia.bind(this);
    }

    aoVisualizarMidia(midia) {
        this.setState({ midiaSelecionada: midia });
    }

    render() {
        return (
            <div>
                <div className="modal fade" id={this.props.idModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">{this.props.termo.emTerena}</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p><b>Significado em português:</b>&nbsp;{this.props.termo.emPortugues}</p>
                                        <p><b>Aplicação em uma frase:</b>&nbsp;{this.props.termo.aplicacaoFrase}</p>
                                        <p><b>Significado da aplicação em frase:</b>&nbsp;{this.props.termo.significadoAplicacaoFrase}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <TabelaMidias
                                                midias={this.props.termo.midias}
                                                somenteLeitura={true}
                                                funcaoDeVisualizacao={this.aoVisualizarMidia}
                                                idModal="modalMidia" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            </div>

                        </div>
                    </div>
                </div>

                <ModalMidia id="modalMidia" midia={this.state.midiaSelecionada} />
            </div>
        );
    }
}

export default ModalVisualizacao;