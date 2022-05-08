import {
	Column,
	Entity,
	PrimaryColumn,
	SubEntity,
} from "@techmmunity/symbiosis";

@SubEntity()
class Question {
	@Column()
	public title: string;

	@Column()
	public answer: string;
}

@Entity("forms")
export class FormsEntity {
	@PrimaryColumn({
		name: "_id",
	})
	public id: string;

	@Column(Question)
	public questions: Array<Question>;
}
