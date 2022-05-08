/* eslint-disable */

import type { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import type { ValidationError } from "class-validator";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
	private toValidate(metatype: Function): boolean {
		const types: Array<Function> = [String, Boolean, Number, Array, Object];

		return !types.includes(metatype);
	}

	private validateError(error: ValidationError) {
		const result = [];
		const { constraints, children } = error;
		if (constraints) {
			result.push(constraints[Object.keys(constraints)[0]]);
		}
		if (children && children.length > 0) {
			children.forEach(child => {
				result.push(this.validateError(child));
			});
		}

		return result[0];
	}

	private validateErrors(errors: Array<ValidationError>) {
		const result = errors.map(error => this.validateError(error));

		return result;
	}

	public async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object, {
			skipMissingProperties: true,
		});

		const filteredErrors = this.validateErrors(errors);

		if (errors.length > 0) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					[errors.length > 1 ? "errors" : "error"]: filteredErrors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		return value;
	}
}
