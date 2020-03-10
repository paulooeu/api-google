const SIN = require('../tools/database_gis')


class PessoaEndereco {
    constructor() {
        this.query = `
        SELECT DISTINCT TOP 100
          ep.id,
          ISNULL(ep.numero,'')  numero,
        ISNULL(ep.estado,'')  estado,
        ISNULL(ep.cidade,'')  cidade,
        ISNULL(ep.bairro,'')  bairro,
        ISNULL(ep.complemento,'') complemento,
        ISNULL(ep.cep,'') cep,
        ISNULL(ep.id,'') rbase,
        c.nome_cliente nome,
        ISNULL(ep.latitude,'') latitude,
        ISNULL(ep.longitude,'') longitude,
          'E' status
          FROM endereco_pessoa ep
          INNER JOIN pessoa p ON ep.pessoa_id = p.id
          INNER JOIN cliente c ON p.id = c.pessoa_id
          WHERE ep.latitude<>0 OR ep.longitude<>0
UNION

     SELECT DISTINCT TOP 100
          ep.id,
        ISNULL(ep.numero,'')  numero,
      ISNULL(ep.estado,'')  estado,
      ISNULL(ep.cidade,'')  cidade,
      ISNULL(ep.bairro,'')  bairro,
      ISNULL(ep.complemento,'') complemento,
      ISNULL(ep.cep,'') cep,
      ISNULL(ep.id,'') rbase,
      c.nome_cliente nome,
      ISNULL(ep.latitude,'') latitude,
      ISNULL(ep.longitude,'') longitude,
          'N' status
        FROM endereco_pessoa ep
        INNER JOIN pessoa p ON ep.pessoa_id = p.id
        INNER JOIN cliente c ON p.id = c.pessoa_id
        WHERE ep.latitude=0 OR ep.longitude=0

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
