import mongoose from 'mongoose';

const EnderecoSchema = new mongoose.Schema(
  {
    rbase: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
    },
    status: {
      type: String,
    },
    latitude_antiga: {
      type: String,
    },
    longitude_antiga: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    correcao: {
      type: String,
    },
    endereco_antigo:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Endereco', EnderecoSchema);
