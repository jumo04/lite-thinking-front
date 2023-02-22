# Lite thinking test 

Descripción de la prueba: Construir una aplicación que exponga las siguientes vistas:

1. Inicio de sesión con un formulario que capture la información del usuario: correo y
contraseña.
2. Luego de ingresar, poder registrar la siguiente información de una empresa: nombre
de la empresa, dirección, NIT, teléfono (con sus respectivas validaciones).
3. Inventario: se debe poder descargar un PDF con la información de esa tabla y
adicional utilizar alguna API como Amazon Simple Email Service (SES) de AWS u otra,
para poder enviar ese PDF a un correo deseado.
Deben existir dos usuarios:
1. Administrador: Tiene acceso a las funciones de eliminación, registro y/o edición de
una empresa. Adicionalmente, este usuario podrá registrar artículos por empresa y
guardarlos en una tabla inventario, donde se vean los artículos por empresa.
2. Externo: Puede visualizar las empresas como visitante.

A nivel de datos, la llave primaria debe ser el NIT de la empresa, de igual forma, la contraseña
utilizada debe estar encriptada para autenticación del Usuario Administrador.
Publique su aplicación en un servidor en la nube, como AWS, Google Cloud, entre otros.
Envíenos el enlace de la aplicación y del repositorio donde está almacenado el código.