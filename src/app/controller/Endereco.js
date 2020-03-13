import EnderecoShema from '../schemas/EnderecoSchema';
import EnderecoPessoa from '../model/Pessoa_Endereco';
import api from 'axios';
import removerAcentos from "remover-acentos";
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



  async buscarEnderecoCredenciado(req, res) {
    let enderecoPessoaInstance = await new EnderecoPessoa().findAllByFilter();
    //let enderecoPessoaInstance = loadLists();
    let contador = 0;
    var palavraSemAcento = "";
    var caracterComAcento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ`´";
    var caracterSemAcento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC  ";

    enderecoPessoaInstance.map(async endereco => {
      palavraSemAcento=""
      let logradouro = '';
      logradouro += endereco.tipo_logradouro + ' ';
      logradouro += endereco.logradouro + ' ';
      logradouro += endereco.complemento + ' ';
      logradouro += endereco.numero + ' ';
      logradouro += endereco.bairro + ' ';
      logradouro += endereco.cidade + ' ';
      logradouro += endereco.estado + ' ,';
      logradouro += endereco.nome + ' ';
      for (var i = 0; i < logradouro.length; i++)    {
        var char = logradouro.substr(i, 1);
        var indexAcento = caracterComAcento.indexOf(char);
        if (indexAcento != -1) {
        palavraSemAcento += caracterSemAcento.substr(indexAcento, 1);
        } else {
        palavraSemAcento += char;
        }
      }
      logradouro =palavraSemAcento

      try {
        await api
          .post(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${logradouro}&key=AIzaSyARzmym-3SfKGGU0fPGFQ7SwIimkVDQF6U`
          )
          .then(function(response) {
            if (response.data.results[0]) {
              let { lat, lng } = response.data.results[0].geometry.location;
              let isCorrigido = true;
              if (lat == endereco.latitude && lng == endereco.longitude) {
                isCorrigido = false;
              }

              const enderecoExistente = EnderecoShema.findOne({
                where:{rbase:endereco.rbase}
              })
                  if(!enderecoExistente){
                    EnderecoShema.create({
                      rbase: endereco.rbase,
                      latitude: lat,
                      longitude: lng,
                      latitude_antiga: endereco.latitude,
                      longitude_antiga: endereco.longitude,
                      endereco_antigo: logradouro,
                      status: endereco.status,
                      nome: endereco.nome,
                      correcao: isCorrigido,
                    });
                  }

            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (ex) {
        res.json(ex);
      }
      contador++
    });

    res.json(contador);
  }
  async buscarEndereco(req, res) {
    const enderecos = await EnderecoShema.find();
    return res.json(enderecos);
  }
}

export default new EnderecoController();
