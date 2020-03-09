import EnderecoShema from '../schemas/EnderecoSchema';
import EnderecoPessoa from '../model/Pessoa_Endereco';
import api from 'axios';

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

  async buscarEnderecoCredenciado(req, res) {
    const enderecoPessoaInstance = await new EnderecoPessoa().findAllByFilter();

    enderecoPessoaInstance.map(async endereco => {
      let logradouro = '';

      logradouro +=
        endereco.numero
          .replace(/ /g, '+')
          .replace('.', '+')
          .replace(',', '+') + '+';
      logradouro +=
        endereco.tipo_logradouro
          .replace(/ /g, '+')
          .replace('.', '+')
          .replace(',', '+') + '+';
      logradouro +=
        endereco.logradouro
          .replace(/ /g, '+')
          .replace('.', '+')
          .replace(',', '+') + '+';
      logradouro +=
        endereco.complemento
          .replace(/ /g, '+')
          .replace('.', '+')
          .replace(',', '+') + '+';
      logradouro +=
        endereco.bairro
          .replace(/ /g, '+')
          .replace('.', '+')
          .replace(',', '+') + ',+';
      logradouro +=
        endereco.cidade
          .replace(/ /g, '+')
          .replace('.', '+')
          .replace(',', '+') + ',+';
      logradouro +=
        endereco.estado
          .replace(/ /g, '+')
          .replace('.', '+')
          .replace(',', '+') + '';

      let google;
      try {
        console.log("CADE ESSA DISGRACA")
        console.log(`'${logradouro}'`)
        google = await api.post(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${logradouro}&key=AIzaSyARzmym-3SfKGGU0fPGFQ7SwIimkVDQF6U`
        );
        console.log(google);
      } catch (ex) {
        console.log(ex);
      }

      //buscarEnderecoApi(logradouro)
      let { lat, lng } = google.data.results[0].geometry.location;
      EnderecoShema.create({
        pessoa_id: endereco.pessoa_id,
        lat: latitude,
        long: longtude,
      });
    });

    res.json(enderecoPessoaInstance);
    // } catch (ex) {
    //   return res.status(500).json({ msg: ex.message });
    // }
  }
}
export default new EnderecoController();
