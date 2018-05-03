import express from 'express';
import TermoController from '../controllers/TermoController';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json('Olá!');
});

router.get('/termos/:filtro', TermoController.buscar);
router.post('/termos', TermoController.salvar);
router.delete('/termos/:id', TermoController.remover);

export default router;
