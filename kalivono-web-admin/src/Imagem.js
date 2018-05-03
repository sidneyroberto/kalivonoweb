import React, { Component } from 'react';

class Imagem extends Component {

    render() {
        return (
            <img alt="Imagem" className="img-thumbnail" src={this.props.urlMidia} />
        );
    }
}

export default Imagem;