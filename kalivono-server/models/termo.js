import mongoose from 'mongoose';
import Multimidia from './multimidia';

var termo = new mongoose.Schema({
    emTerena: {
        type: String,
        required: true
    },
    emPortugues: {
        type: String,
        required: true
    },
    aplicacaoFrase: {
        type: String,
        required: true
    },
    significadoAplicacaoFrase: {
        type: String,
        required: true
    },
    midias: [Multimidia]
});

var Termo = mongoose.model('Termo', termo);
export default Termo;


