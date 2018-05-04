import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';

class TabelaTermos extends Component {

    constructor(props) {
        super(props);

        this.aoExecutarEdicao = this.aoExecutarEdicao.bind(this);
        this.aoExecutarRemocao = this.aoExecutarRemocao.bind(this);
        this.aoExecutarVisualizacao = this.aoExecutarVisualizacao.bind(this);
    }

    aoExecutarVisualizacao(termo) {
        this.props.funcaoVisualizacao(termo);
    }

    aoExecutarRemocao(termo) {
        this.props.funcaoRemocao(termo);
    }

    aoExecutarEdicao(termo) {
        this.props.funcaoEdicao(termo);
    }

    render() {
        const listaTermos = this.props.termos ? this.props.termos.map((termo) =>
            <tr key={termo._id}>
                <td>{termo.emTerena}</td>
                <td>{termo.emPortugues}</td>
                <td>
                    <button onClick={() => this.aoExecutarVisualizacao(termo)} data-tip data-for="tipVisualizar" type="button" data-toggle="modal" data-target={`#${this.props.idModalVisualizacao}`} className="btn btn-link">
                        <FontAwesome name='eye' />
                        <ReactTooltip id="tipVisualizar" type="info">
                            <span>Visualizar termo</span>
                        </ReactTooltip>
                    </button>
                    <button onClick={() => this.aoExecutarEdicao(termo)} data-tip data-for="tipEditar" type="button" className="btn btn-link">
                        <FontAwesome name='edit' />
                        <ReactTooltip id="tipEditar" type="info">
                            <span>Editar termo</span>
                        </ReactTooltip>
                    </button>
                    <button onClick={() => this.aoExecutarRemocao(termo)} data-tip data-for="tipRemover" data-toggle="modal" data-target={`#${this.props.idModalRemocao}`} type="button" className="btn btn-link">
                        <FontAwesome name='trash' />
                        <ReactTooltip id="tipRemover" type="info">
                            <span>Remover termo</span>
                        </ReactTooltip>
                    </button>
                </td>
            </tr>
        ) : [];

        return (
            <div>
                {
                    listaTermos.length > 0 &&
                    < table className="table table-striped table-hover text-center" >
                        <thead>
                            <tr>
                                <th>Terena</th>
                                <th>Português</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaTermos}
                        </tbody>
                    </table >
                }
            </div>
        );
    }
}

export default TabelaTermos;