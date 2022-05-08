import { Injectable } from "@nestjs/common";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { compare } from "bcryptjs";
import { UsersEntity } from "src/database/entities/users.entity";

import { throwBadRequestError } from "../../utils/errors/bad-request";

@Injectable()
export class AuthService {
	public constructor(
		@InjectRepository(UsersEntity)
		private readonly users: Repository<UsersEntity>,
	) {}

	public async getUser(name: string, password: string) {
		const user = (
			await this.users.findOne({
				where: {
					name,
				},
			})
		).data;

		if (!user) {
			throwBadRequestError("incorrect credentials");
		}

		const isPasswordCorrect = await compare(password, user.password);

		if (!isPasswordCorrect) {
			throwBadRequestError("incorrect credentials");
		}

		delete user.password;

		return user;
	}
}
