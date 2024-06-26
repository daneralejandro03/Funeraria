import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import * as path from "path";
import { AuthGuard } from "src/app/guards/auth.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  {
    path: "user-profile",
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "owners",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/owners/owners.module").then((m) => m.OwnersModule),
  },
  {
    path: "beneficiaries",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/beneficiaries/beneficiaries.module").then(
        (m) => m.BeneficiariesModule
      ),
  },
  {
    path: "customers",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/customers/customers.module").then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: "subscriptions",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/subscriptions/subscriptions.module").then(
        (m) => m.SubscriptionsModule
      ),
  },
  {
    path: "plans",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/plans/plans.module").then((m) => m.PlansModule),
  },
  {
    path: "services",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/services/services.module").then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: "administrators",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/administrators/administrators.module").then(
        (m) => m.AdministratorsModule
      ),
  },
  {
    path: "employees",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/employees/employees.module").then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: "pays",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/pays/pays.module").then((m) => m.PaysModule),
  },
  {
    path: "sites",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/sites/sites.module").then((m) => m.SitesModule),
  },
  {
    path: "serviceplans",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/serviceplans/serviceplans.module").then(
        (m) => m.ServiceplansModule
      ),
  },
  {
    path: "notifications",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/notifications/notifications.module").then(
        (m) => m.NotificationsModule
      ),
  },
  {
    path: "transfers",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/transfers/transfers.module").then(
        (m) => m.TransfersModule
      ),
  },
  {
    path: "incidents",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/incidents/incidents.module").then(
        (m) => m.IncidentsModule
      ),
  },
  {
    path: "reports",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/reports/reports.module").then(
        (m) => m.ReportsModule
      ),
  },
  {
    path: "wakerooms",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/wake-rooms/wake-rooms.module").then(
        (m) => m.WakeRoomsModule
      ),
  },
  {
    path: "executionservices",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/executionservices/executionservices.module").then(
        (m) => m.ExecutionservicesModule
      ),
  },
  {
    path: "cremations",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/cremations/cremations.module").then(
        (m) => m.CremationsModule
      ),
  },
  {
    path: "burials",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/burials/burials.module").then(
        (m) => m.BurialsModule
      ),
  },
  {
    path: "comments",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/comments/comments.module").then(
        (m) => m.CommentsModule
      ),
  },
  {
    path: "deceaseds",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/deceaseds/deceaseds.module").then(
        (m) => m.DeceasedsModule
      ),
  },
  {
    path: "permissions",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/permissions/permissions.module").then(
        (m) => m.PermissionsModule
      ),
  },
  {
    path: "users",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "roles",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/roles/roles.module").then((m) => m.RolesModule),
  },
  {
    path: "rolepermissions",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/role-permission/role-permission.module").then(
        (m) => m.RolePermissionModule
      ),
  },
  {
    path: "chats",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/chats/chats.module").then((m) => m.ChatsModule),
  },
];
