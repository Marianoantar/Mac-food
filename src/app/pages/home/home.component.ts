import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria_model } from '../../core/interfaces/categorias';
import { CommonModule } from '@angular/common';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { RouterModule } from '@angular/router';
import { TabsService } from '../../core/services/tabs.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TarjetaCategoriaComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  headerService = inject(HeaderService);
  categoriasService = inject(CategoriasService);
  tabsService = inject(TabsService);

  categorias: WritableSignal<Categoria_model[]> = signal([]);
  // categorias:Categoria_model[] = [];

  constructor() { };

  ngOnInit(): void {
        this.headerService.titulo.set ('Home');
        this.headerService.extendido.set (true);
        this.tabsService.seleccion.set('');
        this.categoriasService.getAll().then(res => this.categorias.set(res));
  }

  ngOnDestroy(): void {
    this.headerService.extendido.set (false);
  }



}