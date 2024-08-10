import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { TabsService } from '../../core/services/tabs.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  private headerService = inject(HeaderService);
  private tabsService = inject(TabsService);

  constructor() {}

  ngOnInit(): void {
    this.headerService.titulo.set ('Administrador');
    this.tabsService.seleccion.set('admin');
  }

}
