const SIN = require('../tools/database_gis')


class PessoaEndereco {
    constructor() {
        this.query = `
        SELECT
        ep.id,
        ISNULL(ep.tipo_logradouro,' ')  tipo_logradouro,
        ISNULL(ep.logradouro,' ')  logradouro,
        ISNULL(ep.numero,' ')  numero,
        ISNULL(ep.estado,' ')  estado,
        ISNULL(ep.cidade,' ')  cidade,
        ISNULL(ep.bairro,' ')  bairro,
        ISNULL(ep.complemento,' ') complemento,
        ISNULL(ep.cep,' ') cep,
        ISNULL(ep.id,' ') rbase,
        ISNULL(c1.nome_credenciado,' ')  nome,
        ISNULL(ep.latitude,' ') latitude,
        ISNULL(ep.longitude,' ') longitude,
        'E' status
        FROM endereco_pessoa ep
        INNER JOIN pessoa p ON ep.pessoa_id = p.id
      INNER JOIN credenciado c1 ON p.id = c1.pessoa_id

        WHERE (ep.latitude<>0 OR ep.longitude<>0)   AND c1.status_id =1

UNION

   SELECT
        ep.id,
    ISNULL(ep.tipo_logradouro,' ')  tipo_logradouro,
    ISNULL(ep.logradouro ,' ')  logradouro,
    ISNULL(ep.numero,' ')  numero,
    ISNULL(ep.estado,' ')  estado,
    ISNULL(ep.cidade,' ')  cidade,
    ISNULL(ep.bairro,' ')  bairro,
    ISNULL(ep.complemento,' ') complemento,
    ISNULL(ep.cep,' ') cep,
    ISNULL(ep.id,' ') rbase,
    IsNULL(c1.nome_credenciado,' ')  nome,
    ISNULL(ep.latitude,' ') latitude,
    ISNULL(ep.longitude,' ') longitude,
        'N' status
      FROM endereco_pessoa ep
      INNER JOIN pessoa p ON ep.pessoa_id = p.id
       INNER JOIN credenciado c1 ON p.id = c1.pessoa_id

      WHERE (ep.latitude=0 OR ep.longitude=0)  AND c1.status_id =1



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
