import { randomUUID } from 'crypto';
import { mongoose } from './index.js';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: randomUUID
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    stars: { type: Number, required: true },
    count: { type: Number, required: true }
  },
  priceCents: {
    type: Number,
    required: true
  },
  keywords: {
    type: [String],
    required: true,
    default: []
  }
}, {
  timestamps: true,
  versionKey: false,
  id: false,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret._id;
      return ret;
    }
  }
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
