import React, { Component } from 'react';
import $ from 'jquery';
import Video from './Video';
import Imagem from './Imagem';

class ModalMidia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idVideo: '',
            urlValida: false
        };

        this.aoCarregarOPlayer = this.aoCarregarOPlayer.bind(this);
    }

    aoCarregarOPlayer(evento) {
        evento.target.stopVideo();
        $(`#${this.props.id}`).on('hidden.bs.modal', () => {
            evento.target.stopVideo();
        });
    }

    render() {
        var classeDialog = 'modal-dialog';
        classeDialog += this.props.midia.tipo === 'video' ? ' modal-lg' : '';

        return (
            <div className="modal fade" id={this.props.id}>
                <div className={classeDialog}>
                    <div className="modal-content   ">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                {this.props.midia.tipo === 'imagem' ? 'Imagem' : 'Vídeo'}
                            </h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body text-center">
                            {this.props.midia.tipo === 'imagem' && <Imagem urlMidia={this.props.midia.url} />}
                            {this.props.midia.tipo === 'video' &&
                                <Video
                                    id="playerVideo"
                                    urlMidia={this.props.midia.url}
                                    funcaoInicializacao={this.aoCarregarOPlayer} />
                            }
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ModalMidia;