import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import type { MongodbConnectionOptions } from "@techmmunity/symbiosis-mongodb";
import { Connection } from "@techmmunity/symbiosis-mongodb";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";

import { API } from "./api";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FormsEntity } from "./database/entities/form.entity";
import { UsersEntity } from "./database/entities/users.entity";

@Module({
	imports: [
		...API,
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		SymbiosisModule.forRoot<MongodbConnectionOptions>({
			class: Connection,
			options: {
				entities: [FormsEntity, UsersEntity],
				databaseConfig: {
					databaseName: "hortasua",
					url: process.env.DATABASE_URL,
				},
			},
		}),
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		AppService,
	],
})
export class AppModule {}
