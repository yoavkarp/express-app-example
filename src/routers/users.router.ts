import { Router } from "../router";
import { UsersController } from "../controllers/users.controller";

export class UsersRouter extends Router {
    readonly UsersController: UsersController;

    constructor() {
        super('/users');
        this.UsersController = new UsersController();

        this.setRoutes();
    }

    setRoutes() {
        this.router.route('/:id')
            .get(this.UsersController.getUserById)
            .put(this.UsersController.updateUser)
            .delete(this.UsersController.deleteUser)

        this.router.post('/', this.UsersController.createUser);
    }
}