import { mongoose } from './index.js';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  },
  deliveryOptionId: {
    type: String,
    required: true
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

export const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
