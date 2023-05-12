import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {HelpComponent} from "./help/help.component";
import {FotoOlComponent} from "./foto-ol/foto-ol.component";
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'foto-ol', component: FotoOlComponent },
  { path: 'help', component: HelpComponent },
  // { path: 'test', component: TestComponent },
  { path: '',   redirectTo: '/foto-ol', pathMatch: 'full' },
  { path: '**', component: HelpComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
