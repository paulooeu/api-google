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
  async converterJson(req, res) {
    let enderecoPessoaInstance = await new EnderecoPessoa().findAllByFilter();
    res.json(enderecoPessoaInstance);
  }

  buscarEnderecoCredenciado(req, res) {
    //let enderecoPessoaInstance = await new EnderecoPessoa().findAllByFilter();
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
            let isCorrigido = true;
            if (lat == endereco.latitude && lng == endereco.longitude) {
              isCorrigido = false;
            }
            EnderecoShema.create({
              rbase: endereco.rbase,
              latitude: lat,
              longitude: lng,
              latitude_antiga: endereco.latitude,
              longitude_antiga: endereco.longitude,
              status: endereco.status,
              nome: endereco.nome,
              correcao: isCorrigido,
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (ex) {
        res.json(ex);
      }
    });
    res.json(enderecoPessoaInstance);
  }
  async buscarEndereco(req, res) {
    const enderecos = await EnderecoShema.find();
    return res.json(enderecos);
  }
}

export default new EnderecoController();
