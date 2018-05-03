import mongoose from 'mongoose';

var Multimidia = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['imagem', 'video', 'audio'],
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export default Multimidia;