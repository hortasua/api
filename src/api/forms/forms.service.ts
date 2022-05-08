import { Injectable } from "@nestjs/common";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { FormsEntity } from "src/database/entities/form.entity";
import { v4 as uuid } from "uuid";

import type { CreateFormDto } from "./dto/create";

@Injectable()
export class FormsService {
	public constructor(
		@InjectRepository(FormsEntity)
		private readonly forms: Repository<FormsEntity>,
	) {}

	public async getAll() {
		const { data: forms } = await this.forms.find({});

		return forms;
	}

	public async create({ questions }: CreateFormDto) {
		const { data: newForm } = await this.forms.save({
			id: uuid(),
			questions,
		});

		return newForm;
	}
}
