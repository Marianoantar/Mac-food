import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RubroComponent } from './pages/rubro/rubro.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './core/guards/auth.guard';
import { EdicionProductoComponent } from './pages/edicion-producto/edicion-producto.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'articulo/:id',
        component: ArticuloComponent
    },
    {
        path: 'buscar',
        component: BuscarComponent
    },
    {
        path: 'carrito',
        component: CarritoComponent
    },
    {
        path: 'perfil',
        component: PerfilComponent
    },
    {
        path: 'categoria/:id',
        component: RubroComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard]
    },
    {
        path: 'editarProducto/:id_producto/:id_rubro',
        component: EdicionProductoComponent
    }
];
