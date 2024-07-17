// /Users/morkraksa/Documents/Node Application/node_app_01/src/database/repositories/user.repository.ts
// /Users/morkraksa/Documents/NextTest/testnode/src/database/repositories/user.repository.ts

import User, { IUser } from "../model/user.model";



class UserRepository {

  public async getAllUsers(sort: string = "asc"): Promise<IUser[]> {
    try{
      let sortQuery = {};
      if (sort === "asc") {
        sortQuery = { name: 1 }; // Sort by name in ascending order
      } else if (sort === "desc") {
        sortQuery = { name: -1 }; // Sort by name in descending order
      }
      return User.find().sort(sortQuery);
    }catch(error){
      console.error('Error getting users:', error);
      throw new Error('Failed to get users.');
    }
  }

  public async getUserById(id: string): Promise<IUser | null> {
    try {
      return User.findOne({ _id: id });
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw new Error('Failed to get user by ID.');
    }
  }


  public async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      return User.findOne({ email });
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw new Error('Failed to get user by email.');
    }
  }

  public async createUser(data: IUser): Promise<IUser | null> {
    try {
      const newUser = new User(data);
      return newUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }

  public async updateUser(id: string, data: IUser): Promise<IUser | null> {
    try {
      return User.findByIdAndUpdate(id, data, {new: true});
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user.');
    }
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    try {
      return User.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user.');
    }
  }


  public async getUser10(num: number): Promise<IUser[]> {
    try {
      return User.find().limit(num);
    } catch (error) {
      console.error('Error getting 10 users:', error);
      throw new Error('Failed to get 10 users.');
    }
  }
}

export default UserRepository;
