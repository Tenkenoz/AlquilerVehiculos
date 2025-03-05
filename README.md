DESCRIPCION DEL PROYECTO 

El Sistema de Alquiler de Vehículos está diseñado para gestionar el alquiler de automóviles, incluyendo las operaciones de administración de clientes, empleados, reservas, pagos y seguros asociados. El sistema está desarrollado utilizando ASP.NET Core MVC y sigue una arquitectura por capas, lo que permite un desarrollo más escalable, modular y fácil de mantener. Esta arquitectura está organizada en capas que separan las distintas responsabilidades del sistema, garantizando una clara separación de las preocupaciones.

Funcionalidades Principales

Gestión de Vehículos: Permite agregar, actualizar y eliminar vehículos disponibles para el alquiler.
Gestión de Clientes: Registra los datos personales de los clientes, como nombre, apellido, teléfono y correo electrónico.
Gestión de Empleados: Administra los empleados del sistema, incluyendo su información personal y cargo.
Gestión de Reservas: Los clientes pueden hacer reservas de vehículos, especificando las fechas de inicio y fin del alquiler.
Gestión de Pagos: Registra los pagos realizados por los clientes, con detalles sobre el monto, el método de pago y la fecha.
Gestión de Seguros: Asocia coberturas de seguros a las reservas, especificando el tipo y costo de la cobertura.
Arquitectura del Sistema
El sistema está estructurado utilizando una arquitectura por capas que mejora la mantenibilidad y escalabilidad del proyecto. Las capas principales son:

Capa de Entidad: Contiene las clases que representan las entidades de la base de datos (Vehículos, Clientes, Empleados, Reservas, Pagos, Seguros).
Capa de Datos: Se encarga de las operaciones de acceso a datos, interactuando con la base de datos a través de procedimientos almacenados.
Capa de Negocio: Contiene la lógica de negocio del sistema, como la validación de datos y la ejecución de procesos de reserva, pago y gestión de vehículos.
Capa de Presentación: Contiene los controladores y vistas que permiten la interacción con el usuario. Esta capa utiliza ASP.NET Core MVC para la gestión de la interfaz y la comunicación entre el frontend y el backend.
Base de Datos
La base de datos está diseñada en SQL Server y consta de las siguientes tablas:

Vehículos: Almacena información sobre los autos disponibles para alquiler, como marca, modelo, año, precio y estado.
Clientes: Contiene los datos personales de los clientes que alquilan vehículos, incluyendo nombre, apellido, teléfono y email.
Empleados: Registra la información del personal encargado de gestionar el sistema, como nombre, apellido, cargo y contacto.
Reservas: Registra las solicitudes de alquiler de vehículos, incluyendo el cliente, el vehículo, las fechas de inicio y fin, y el estado de la reserva.
Pagos: Almacena los pagos realizados por los clientes, con detalles como el monto, el método de pago y la fecha.
Seguros: Asocia un seguro a cada reserva, especificando el tipo y costo del seguro.
El script SQL para la creación de las tablas y procedimientos almacenados está disponible en la sección de scripts.

Practicas Utilizadas:

- Procedimientos Almacenados: Se utilizan procedimientos almacenados en lugar de consultas directas para mejorar la seguridad y el rendimiento.
- Consultas: Ademas de los procedimientos Almacenados se utlizaron Consultas SQL
Validaciones: Se implementan validaciones en la capa de negocio para evitar la inserción de datos inconsistentes.
Optimización de Consultas: Se optimizan las consultas SQL para mejorar el tiempo de respuesta y el rendimiento general del sistema.
Separación de Capas: Se sigue el principio de separación de responsabilidades entre las capas de datos, negocio y presentación.
