import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateFormDto } from "./dto/create";
import { FormsService } from "./forms.service";

@Controller("forms")
export class FormsController {
	public constructor(private readonly formsService: FormsService) {}

	@Get()
	public async getAll() {
		const forms = await this.formsService.getAll();

		return forms;
	}

	@Post()
	public async create(@Body() form: CreateFormDto) {
		const newForm = await this.formsService.create(form);

		return newForm;
	}
}
