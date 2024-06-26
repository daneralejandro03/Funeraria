import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManageMatchComponent } from './manage-match/manage-match.component';

@NgModule({
  declarations: [ListComponent, ManageComponent, ManageMatchComponent],
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule],
})
export class UsersModule {}
