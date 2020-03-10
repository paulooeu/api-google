import EnderecoShema from '../schemas/EnderecoSchema';
import EnderecoPessoa from '../model/Pessoa_Endereco';
import api from 'axios';
import { loadLists } from '../../dados';

class EnderecoController {
  async buscarEnderecoApi(endereco) {
    const { data } = await api.post(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=AIzaSyARzmym-3SfKGGU0fPGFQ7SwIimkVDQF6U`
    );
    const { lat, lng } = data.results[0].geometry.location;
    return {
      latitude: lat,
      longtude: lng,
    };
  }

  buscarEnderecoCredenciado(req, res) {
    //  let enderecoPessoaInstance //= await new EnderecoPessoa().findAllByFilter();
    const enderecoPessoaInstance = loadLists();
    enderecoPessoaInstance.map(async endereco => {
      let logradouro = '';
      logradouro += endereco.numero + ' ';
      logradouro += endereco.tipo_logradouro + ' ';
      logradouro += endereco.logradouro + ' ';
      logradouro += endereco.complemento + ' ';
      logradouro += endereco.bairro + ' ';
      logradouro += endereco.cidade + ' ';
      logradouro += endereco.estado + ' ';

      try {
        await api
          .post(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${logradouro}&key=AIzaSyARzmym-3SfKGGU0fPGFQ7SwIimkVDQF6U`
          )
          .then(function(response) {
            let { lat, lng } = response.data.results[0].geometry.location;
            EnderecoShema.create({
              pessoa_id: endereco.rbase,
              lat: lat,
              long: lng,
            });
            res.json(enderecoPessoaInstance);
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (ex) {
        res.json(enderecoPessoaInstance);
        console.log('nao fopi');
      }
    });
  }
}

export default new EnderecoController();
