import Termo from '../models/termo';
import sanitize from 'mongo-sanitize';

class TermoController {

    static buscar(req, res) {
        var filtro = sanitize(req.params.filtro);
        Termo
            .find(
                {
                    $or: [
                        { emTerena: { '$regex': filtro, '$options': 'i' } },
                        { emPortugues: { '$regex': filtro, '$options': 'i' } }
                    ]
                })
            .exec()
            .then(
                (termos) => res.json(termos),
                (erro) => {
                    console.log(erro);
                    res.status(500).json('Ocorreu um erro ao realizar a consulta');
                }
            );
    }

    static salvar(req, res) {
        Termo
            .create(req.body)
            .then(
                (termo) => res.status(201).json(termo),
                (erro) => {
                    console.log(erro);
                    res.status(500).json('Ocorreu um erro ao tentar salvar o termo');
                }
            );
    }

    static atualizar(req, res) {
        let id = sanitize(req.params.id);
        let termo = req.params.body;
        Termo
            .findByIdAndUpdate(id, termo)
            .exec()
            .then(
                (termo) => res.json(termo),
                (erro) => {
                    console.log(erro);
                    res.status(500).json('Ocorreu um erro ao tentar atualizar o termo');
                }
            );
    }

    static remover(req, res) {
        var id = sanitize(req.params.id);
        Termo
            .remove({ "_id": id })
            .exec()
            .then(
                () => res.status(204).end(),
                (erro) => {
                    console.log(erro);
                    res.status(500).json('Ocorreu um erro ao tentar remover o termo');
                }
            );
    }
}

export default TermoController;