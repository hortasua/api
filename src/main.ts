import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const bootstrap = async () => {
	const PORT = 80;

	const app = await NestFactory.create(AppModule);
	app.enableCors({
		credentials: true,
		origin: "*",
	});
	await app.listen(PORT);
};
bootstrap();
