import { HttpError } from "../errors/http.error";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { CreateUserInput, UpdateUserInput } from "../validators/users.validators";

export class UsersService {
    public async getUserById(id: string) {
        const user = await UserModel.findById(id).lean<IUser>();
        if (!user) {
            throw new HttpError(400, 'User not found');
        }
        return user;
    }

    public async findUserByPhoneNumber(phone_number: string) {
        const user = await UserModel.findOne({ phone_number }).lean<IUser>();
        if (!user) {
            throw new HttpError(400, 'User not found with this phone number');
        }
        return user;
    }

    public async createUser(data: CreateUserInput) {
        const user = await UserModel.create(data);
        return user.toJSON();
    }

    public async updateUser(id: string, data: UpdateUserInput) {
        const user = await UserModel.findByIdAndUpdate(id, data).lean<IUser>();
        return user;
    }

    public async deleteUser(id: string) {
        const user = await UserModel.findByIdAndDelete(id).lean<IUser>();
        return user;
    }
}