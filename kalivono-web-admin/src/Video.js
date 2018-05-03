import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idVideo: '',
            urlValida: false
        };

        this.aoCarregarOPlayer = this.aoCarregarOPlayer.bind(this);
    }

    componentDidMount() {
        this.atualizaId();
    }

    componentDidUpdate() {
        this.atualizaId();
    }

    atualizaId() {
        let id = this.obterIdDoVideo(this.props.urlMidia);
        if (id !== this.state.idVideo) {
            if (id) this.setState({ idVideo: id, urlValida: true });
            else this.setState({ idVideo: '', urlValida: false });
        }
    }

    aoCarregarOPlayer(evento) {
        this.props.funcaoInicializacao(evento);
    }

    obterIdDoVideo(urlVideo) {
        if (urlVideo) {
            let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            let match = urlVideo.match(regExp);
            if (match && match[2].length === 11) {
                return match[2];
            }
        }
        return '';
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 0
            }
        };

        return (
            <div>
                {this.state.urlValida &&
                    <YouTube
                        id={this.props.id}
                        videoId={this.state.idVideo}
                        opts={opts}
                        onReady={this.aoCarregarOPlayer}
                    />
                }
            </div>
        );
    }
}

export default Video;