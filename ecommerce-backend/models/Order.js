import { randomUUID } from 'crypto';
import { mongoose } from './index.js';

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: randomUUID
  },
  orderTimeMs: {
    type: Number,
    required: true
  },
  totalCostCents: {
    type: Number,
    required: true
  },
  products: [{
    _id: false,
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    estimatedDeliveryTimeMs: { type: Number, required: true }
  }]
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

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
