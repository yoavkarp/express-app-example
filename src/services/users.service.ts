import { HttpError } from "../errors/http.error";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user.interface";
import { CreateUserInput, UpdateUserInput } from "../validators/users.validators";

export class UsersService {
    public async getUserById(id: string) {
        const user = await UserModel.findById(id).lean<User>();
        if (!user) {
            throw new HttpError(400, 'User not found');
        }
        return user;
    }

    public async findUserByPhoneNumber(phone_number: string) {
        const user = await UserModel.findOne({ phone_number }).lean<User>();
        if (!user) {
            throw new HttpError(400, 'User not found');
        }
        return user;
    }

    public async createUser(data: CreateUserInput) {
        const user = await UserModel.create(data);
        return user.toJSON();
    }

    public async updateUser(id: string, data: UpdateUserInput) {
        const user = await UserModel.findByIdAndUpdate(id, data).lean<User>();
        return user;
    }

    public async deleteUser(id: string) {
        const user = await UserModel.findByIdAndDelete(id).lean<User>();
        return user;
    }
}