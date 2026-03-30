import { mongoose } from './index.js';

const deliveryOptionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  deliveryDays: {
    type: Number,
    required: true
  },
  priceCents: {
    type: Number,
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

export const DeliveryOption = mongoose.models.DeliveryOption || mongoose.model('DeliveryOption', deliveryOptionSchema);
