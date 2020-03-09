import mongoose from 'mongoose';

const EnderecoSchema = new mongoose.Schema(
  {
    pessoa_id: {
      type: String,
      required: true,
    },
    lat: {
      type: String
    },
    long: {
      type: String
    },
    cep:{
      type: String
    },
    endereco:{
      type: String
    },
    bairro:{
      type: String
    },
    cidade:{
      type: String
    },
    estado:{
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Endereco', EnderecoSchema);
