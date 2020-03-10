import { Router } from 'express';
import EnderecoController from './app/controller/Endereco';
const routes = new Router();

routes.post('/buscarEndereco', EnderecoController.buscarEnderecoApi);
routes.post('/buscarEnderecoCredenciado', EnderecoController.buscarEnderecoCredenciado);

routes.post('/converterJson', EnderecoController.converterJson);


export default routes;
