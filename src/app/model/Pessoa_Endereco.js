const SIN = require('../tools/database_gis')


class PessoaEndereco {
    constructor() {
        this.query = `
        SELECT top 2
          ISNULL(numero,'') numero,
          ISNULL(tipo_logradouro,'') tipo_logradouro,
          ISNULL(logradouro,'') logradouro,
          ISNULL(complemento,'') complemento,
          ISNULL(bairro,'') bairro,
          ISNULL(cidade,'') cidade,
          ISNULL(estado,'') estado,

          ISNULL(cep,'') cep,
          ISNULL(pessoa_id,'') pessoa_id,
          ISNULL(latitude,'') latitude,
          ISNULL(longitude,'') longitude
        FROM ENDERECO_PESSOA

                     `
    }

    async findAllByFilter() {
     const replacements = {}

    const result = await SIN.query(this.query,{
          replacements: replacements,
          type: SIN.QueryTypes.SELECT
      }
  )

  return result

    }
    queryAppend(query) {
      this.query += '\n' + query
  }

  }
    module.exports = PessoaEndereco
