import { Type } from "class-transformer";
import {
	ArrayNotEmpty,
	IsArray,
	IsString,
	ValidateNested,
} from "class-validator";

export class QuestionDto {
	@IsString()
	public title: string;

	@IsString()
	public answer: string;
}

export class CreateFormDto {
	@IsArray()
	@ArrayNotEmpty()
	@ValidateNested({
		message: "error found in $property",
		each: true,
	})
	@Type(() => QuestionDto)
	public questions: Array<QuestionDto>;
}
