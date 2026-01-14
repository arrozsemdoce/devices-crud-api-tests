import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../../services/device';
import { CommonModule } from '@angular/common';
import { Device } from '../../model/models';
import { AgGridAngular } from 'ag-grid-angular';
import {AG_GRID_LOCALE_BR} from '@ag-grid-community/locale';
import {
  AllCommunityModule,
  ColDef,
  GridOptions,
  LicenseManager,
  ModuleRegistry,
  SetFilterModule,
  themeAlpine,
  ICellRendererParams
} from 'ag-grid-enterprise';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";

ModuleRegistry.registerModules(
  [
    AllCommunityModule,
    SetFilterModule,
  ],
);

LicenseManager.setLicenseKey(
  'DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6');

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.html',
  imports: [CommonModule, AgGridAngular, MatButton, RouterLink],
  styleUrls: ['./device-list.css'],
})
export class DeviceList implements OnInit {

  devices: Device[] = [];
  loading = false;
  errorMessage: string | null = null;
  theme = themeAlpine;

  gridOptions: GridOptions = {
    localeText: AG_GRID_LOCALE_BR
  };

  defaultColDef: ColDef = {
    flex: 1,
    floatingFilter: true,
  };

  colDefs: ColDef[] = [
        { field: "id", headerName: 'Cód.' },
        { field: "name", headerName: 'Nome' },
        { field: "location", headerName: 'Localização', filter: 'agSetColumnFilter' },
        { field: "purchase_date", headerName: 'Data de Compra', cellDataType: 'dateString', filter: 'agSetColumnFilter' },
        { field: "in_use", headerName: 'Em uso', cellRenderer: InUseRenderer, filter: 'agSetColumnFilter' },
        { field: "user_id", headerName: 'Dono' },
    ];

  @ViewChild(AgGridAngular)
  public agGridAngular!: AgGridAngular;

  constructor(
    private deviceService: DeviceService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadDevices();
  }

  loadDevices() {
    this.deviceService.getDevices().subscribe({
      next: (response) => {
        this.devices = response;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar dispositivos';
        this.loading = false;
      },
      complete: () => {
        this.cd.detectChanges();
      }
    });
  }

  toggleUse(id: string): void {
    this.deviceService.toggleUse(+id).subscribe(() => {
      this.loadDevices();
    });
  }

}

export function InUseRenderer(params: ICellRendererParams) {
  return `${params.data.in_use ? 'Sim' : 'Não'}`;
}