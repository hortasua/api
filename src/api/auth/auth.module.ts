import { Module } from "@nestjs/common";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import { UsersEntity } from "src/database/entities/users.entity";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [SymbiosisModule.forFeature([UsersEntity])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
