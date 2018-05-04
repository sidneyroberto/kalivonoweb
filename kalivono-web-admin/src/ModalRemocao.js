import React, { Component } from 'react';

class ModalRemocao extends Component {

    constructor(props) {
        super(props);

        this.aoRemover = this.aoRemover.bind(this);
    }

    aoRemover() {
        this.props.funcaoRemocao();
    }

    render() {
        return (
            <div className="modal fade" id={this.props.idModal}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Remover termo</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            Deseja realmente remover o termo "{this.props.nomeTermo}"
                        </div>

                        <div className="modal-footer">
                            <button type="button" onClick={this.aoRemover} className="btn btn-danger" data-dismiss="modal">Remover</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ModalRemocao;