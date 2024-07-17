// /Users/morkraksa/Documents/Node Application/node_app_01/src/services/userService.ts
// /Users/morkraksa/Documents/NextTest/testnode/src/services/userService.ts

import UserRepository from "../database/repositories/user.repository";
import { IUser, UserCreationParams } from "../database/model/user.model";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getAllUsers(sort: string = "asc"): Promise<IUser[]> {
    try {
      return this.userRepository.getAllUsers(sort);
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get all users.');
    }
  }

  public async getUserById(id: string): Promise<IUser | null> {
    try {
      return this.userRepository.getUserById(id);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw new Error('Failed to get user by ID.');
    }
  }

  public async createUser(params: UserCreationParams): Promise<IUser | null> {
    try {
      return this.userRepository.createUser(params);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }

  public async updateUser(id: string, params: IUser): Promise<IUser | null> {
    try {
      return this.userRepository.updateUser(id, params);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user.');
    }
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    try {
      return this.userRepository.deleteUser(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user.');
    }
  }

  public async getUser10(num: number): Promise<IUser[]> {
    try {
      return this.userRepository.getUser10(num);
    } catch (error) {
      console.error('Error getting 10 users:', error);
      throw new Error('Failed to get 10 users.');
    }
  }
}
