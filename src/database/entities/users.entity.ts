import { Entity, PrimaryColumn } from "@techmmunity/symbiosis";

@Entity("users")
export class UsersEntity {
	@PrimaryColumn({
		name: "_id",
	})
	public id: string;

	@PrimaryColumn()
	public name: string;

	@PrimaryColumn()
	public password: string;
}
