import { Document } from 'mongoose';

export interface Exercise extends Document {
  name: string;
  description?: string;
  category?: string;
}
