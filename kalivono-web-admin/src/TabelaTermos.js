import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class TabelaTermos extends Component {

    render() {
        const listaTermos = this.props.termos ? this.props.termos.map((termo) =>
            <tr key={termo._id}>
                <td>{termo.emTerena}</td>
                <td>{termo.emPortugues}</td>
                <td>
                    <button type="button" className="btn btn-link">
                        <FontAwesome name='eye' />
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
                                <th>Visualizar</th>
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