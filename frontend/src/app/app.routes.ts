import { Routes } from '@angular/router';
import { DeviceList } from './pages/device-list/device-list';
import { DeviceForm } from './pages/device-form/device-form';

export const routes: Routes = [
  { path: 'devices', component: DeviceList },
  { path: 'new', component: DeviceForm},
  { path: '', redirectTo: 'devices', pathMatch: 'full' }
];


