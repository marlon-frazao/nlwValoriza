import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthUserService {

    async execute({ email, password }: IAuthRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email,
        });

        if (!user) {
            throw new Error("Email or Password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email or Password incorrect");
        }

        const token = sign({
            email: user.email
        }, "4368e236cafac41e469be7efb2fecd5a", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }
}

export { AuthUserService };
