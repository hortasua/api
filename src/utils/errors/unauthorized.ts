import { HttpException, HttpStatus } from "@nestjs/common";

export const throwUnauthorizedError = (message: string) => {
	throw new HttpException(
		{
			status: HttpStatus.UNAUTHORIZED,
			message,
		},
		HttpStatus.UNAUTHORIZED,
	);
};
