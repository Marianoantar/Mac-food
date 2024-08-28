# Perfil
En Perfil se puede loguear. Nombre,  direccion y telefono son indispensables.
Cuando estos 3 campos se llenen se encenderá el boton de guardar.

#### Perfil Admin
Si se ingresa en el campo 'Nombre': admin y en el campo 'Diireccion': admin, automaticamente el campo telefono se transforma en un campo 'clave'. Luego si se ingresa la clave '12345' la primera vez que se usa ingresará como administrador.
Cuando ingrese a perfil 'admin' se desplegara la app con agregados propios de administrador:
- se agrega un tab en  el menu del foot para modificar la configuracion de la app.
- el menu 'Busqueda' modifica su vista para agregar, en cada producto que aparezca, un boton de 'Eliminar' y otro de 'Modificar'. Tambien se agrega el botos 'Agregar producto en la parte superior, justo debajo de el campo 'buscar'.
- en el carrito, dentro de 'Direccion de envio' se vera solo las palabras 'admin'

# Archivo database.json
Es donde se guarda el objeto JSON. El mismo contiene un array de rubros y dendro de cada rubro un array de productos.

# Codigos ID de rubro y producto
## Rubro
cada Rubro tiene un ID. van del 1 al 6.

## Producto
Cada Producto tiene su ID. Va presedido por el numero del Rubro mas un número del 1 al 99. Y los asigna el programa secuencialmente.
