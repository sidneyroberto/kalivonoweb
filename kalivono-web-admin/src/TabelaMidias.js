import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class TabelaMidias extends Component {

    constructor(props) {
        super(props);

        this.executaRemocao = this.executaRemocao.bind(this);
        this.executaVisualizacao = this.executaVisualizacao.bind(this);

    }

    executaVisualizacao(midia) {
        this.props.funcaoDeVisualizacao(midia);
    }

    executaRemocao(midia) {
        this.props.funcaoDeRemocao(midia);
    }

    render() {
        const listaMidias = this.props.midias ? this.props.midias.map((midia) =>
            <tr key={midia.url}>
                <td>{midia.url}</td>
                <td>
                    {midia.tipo === 'imagem' && <FontAwesome name="image" />}
                    {midia.tipo === 'video' && <FontAwesome name="video" />}
                </td>
                <td>
                    <button type="button" className="btn btn-link" onClick={() => this.executaVisualizacao(midia)} data-toggle="modal" data-target={`#${this.props.idModal}`}>
                        <FontAwesome name="eye" />
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-link" onClick={() => this.executaRemocao(midia)} >
                        <FontAwesome name="trash" />
                    </button>
                </td>
            </tr>
        ) : [];

        return (
            <div>
                {listaMidias.length > 0 &&
                    <table className="table table-striped table-hover text-center" >
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Tipo</th>
                                <th>Visualizar</th>
                                <th>Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaMidias}
                        </tbody>
                    </table >
                }
            </div>
        );
    }
}

export default TabelaMidias;
