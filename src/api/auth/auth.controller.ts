import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login";

@Controller("auth")
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post("/login")
	public async login(@Body() body: LoginDto) {
		const { username, password } = body;
		const user = await this.authService.getUser(username, password);

		return user;
	}
}
