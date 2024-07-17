// /Users/morkraksa/Documents/Node Application/node_app_01/src/controllers/user.controller.ts
// /Users/morkraksa/Documents/NextTest/testnode/src/controllers/user.controller.ts
import { Controller, Route, Post, Get, Body, Path, Put, Delete, Query } from 'tsoa';
import { IUser, UserCreationParams } from '../database/model/user.model';
import { UserService } from '../services/userService';



@Route("/v1/users")
export class UserController extends Controller {
  private userService: UserService = new UserService();

  @Get("/")
  public async getAllUsers(@Query("sort") sort: string = "desc"): Promise<IUser[] | null> {
    try {
      return this.userService.getAllUsers(sort);
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get all users.');
    }
  }

  @Get(`{num}`)
  public async getUser10(num: number): Promise<IUser[] | null> {
    try {
      return this.userService.getUser10(num);
    } catch (error) {
      console.error('Error getting 10 users:', error);
      throw new Error('Failed to get 10 users.');
    }
  }

  @Get(`{id}`)
  public async getUserByID(@Path() id: string): Promise<IUser | null> {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw new Error('Failed to get user by ID.');
    }
  }
  @Post("/")
  public async createNewUser(@Body() requestBody: UserCreationParams): Promise<IUser | null> {
    try {
      return this.userService.createUser(requestBody);
    } catch (error) {
      console.error('Error creating new user:', error);
      throw new Error('Failed to create new user.');
    }
  }

  @Put("{id}")
  public async updateUser(@Path() id:string, @Body() body: IUser): Promise<IUser | null> {
    try {
      return this.userService.updateUser(id, body);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user.');
    }
  }

  @Delete("{id}")
  public async deleteUser(@Path() id: string): Promise<IUser | null> {
    try {
      return this.userService.deleteUser(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user.');
    }
  }

}
