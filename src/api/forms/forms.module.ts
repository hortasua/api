import { Module } from "@nestjs/common";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";
import { FormsEntity } from "src/database/entities/form.entity";

import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";

@Module({
	imports: [SymbiosisModule.forFeature([FormsEntity])],
	controllers: [FormsController],
	providers: [FormsService],
})
export class FormsModule {}
