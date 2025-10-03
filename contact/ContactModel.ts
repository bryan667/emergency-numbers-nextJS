import { Schema, model, models, Document } from 'mongoose';
import {v4 as uuidv4} from 'uuid'

export interface Contacts extends Document {
  id: string;
  upvotes: number;
  downvotes: number;
  contactName: string;
  contactType?: string;
  phoneNumber?: string[];
  email?: string[];
  quarter?: string;
  city?: string;
  state?: string;
  region?: string;
  postcode?: string;
  country?: string;
  countryCode?: string;
  scope: "quarter" | "city" | "state" | "region" | "country";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema(
  {
    id: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    contactName: {
      type: String,
      required: true,
      unique: true,
    },
    contactType: String,
    phoneNumber: [String],
    email: [String],
    quarter: String,
    city: String,
    state: String,
    region: String,
    postcode: String,
    country: String,
    countryCode: String,
    scope: {
      type: String,
      enum: ['quarter', 'city', 'state', 'region', 'country'],
      required: true,
    },
  },
  { timestamps: true }
);

const ContactModel = models.Contact || model<Contacts>('Contact', ContactSchema);
export default ContactModel
