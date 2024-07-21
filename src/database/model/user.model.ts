import { Schema, model } from 'mongoose';
// import * as joi from 'joi';

export interface IUser {
  name?: string;
  age? : number;
  gender?: 'Male' | 'Female' | 'Other';
  // file?: File;
  email?: string;
}
export interface UserCreationParams {
  name?: string;
  age? : number;
  gender?: 'Male' | 'Female' | 'Other';
  // file?: File;
  email?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  // file: { type: Buffer, required: true },
  email: { type: String, required: true, unique: true },

});

const User = model<IUser>('User', userSchema);

export default User;