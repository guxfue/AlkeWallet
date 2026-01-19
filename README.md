#  Alke Wallet - Billetera Digital

Aplicación web de billetera digital desarrollada como proyecto del Módulo 2: Fundamentos del Desarrollo Front-end. Permite a los usuarios gestionar sus activos financieros de manera segura y conveniente.

##  Descripción

Alke Wallet es una aplicación fintech que proporciona una solución completa para administrar fondos digitales. Los usuarios pueden iniciar sesión, realizar depósitos, enviar dinero a contactos registrados y consultar su historial de transacciones, todo en una interfaz moderna y responsive.

##  Características Principales

- ** Sistema de autenticación**: Inicio de sesión seguro con validación de credenciales
- ** Gestión de saldo**: Visualización en tiempo real del saldo disponible
- ** Depósitos**: Realización de depósitos con validación de montos
- ** Transferencias**: Envío de dinero a contactos registrados
- ** Agenda de contactos**: Creación y almacenamiento de contactos para futuras transferencias
- ** Historial de transacciones**: Registro completo de todos los movimientos
- ** Persistencia de datos**: Uso de localStorage para mantener la información
- ** Efectos visuales**: Animaciones jQuery para mejorar la experiencia de usuario
- ** Diseño responsive**: Adaptable a diferentes dispositivos

##  Tecnologías Utilizadas

- **HTML5**: Estructura semántica de las páginas
- **CSS3**: Estilos personalizados con gradientes y animaciones
- **JavaScript (ES6)**: Lógica de la aplicación
- **Bootstrap 5.3.8**: Framework CSS para diseño responsive
- **jQuery 3.7.1**: Manipulación del DOM y efectos visuales
- **LocalStorage**: Almacenamiento local de datos

##  Estructura del Proyecto
alke-wallet/
│
├── index.html # Página de inicio con redirección
├── login.html # Pantalla de inicio de sesión
├── menu.html # Menú principal de navegación
├── deposit.html # Página de depósitos
├── sendmoney.html # Página de transferencias
├── transaction.html # Historial de movimientos
│
├── app.js # Lógica principal de la aplicación
└── style.css # Estilos personalizados


##  Instalación y Uso

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para cargar Bootstrap y jQuery desde CDN)

### Pasos para Ejecutar

1. **Clonar o descargar el repositorio**
   ```bash
   git clone https://github.com/guxfue/AlkeWallet
   cd alke-wallet

   Abrir el proyecto

Abre el archivo index.html en tu navegador web
O utiliza un servidor local como Live Server de VS Code
Iniciar sesión
Usa las siguientes credenciales de prueba:
Email: user@test.com
Contraseña: 1234
Explorar las funcionalidades
Realiza depósitos
Agrega contactos
Envía transferencias
Consulta tu historial
-Funcionalidades Detalladas
Sistema de Login
Validación de credenciales
Persistencia de sesión con localStorage
Redirección automática al menú principal
Efecto shake en credenciales incorrectas

-Gestión de Depósitos
Validación de montos en tiempo real
Animación del cambio de saldo
Actualización automática del balance
Registro de transacción con fecha y hora

-Transferencias
Selección de contactos desde lista desplegable
Validación de saldo suficiente
Confirmación visual de operaciones exitosas
Actualización dinámica del saldo
Agenda de Contactos
Formulario para agregar nuevos contactos
Campos: Nombre, Número de cuenta, Alias, Banco
Almacenamiento persistente en localStorage
Autocompletado en búsqueda de contactos

-Historial de Transacciones
Visualización de todas las operaciones
Información detallada: Tipo, Monto, Fecha, Detalle
Diferenciación visual entre depósitos y transferencias
Persistencia de datos entre sesiones

-Efectos y Animaciones jQuery
FadeIn/FadeOut: Transiciones suaves entre páginas
SlideDown/SlideUp: Formularios desplegables
Animate: Cambio progresivo del saldo
Loading effects: Indicadores de procesamiento
Smooth scroll: Navegación fluida a elementos
Pulse effect: Resaltado de acciones importantes

-Datos de Prueba
Credenciales de acceso:
Email: user@test.com
Contraseña: 1234
Saldo inicial: $300.00

-Contactos de ejemplo: (crear manualmente en la aplicación)
Nombre: Juan Pérez
Cuenta: 1234567890
Alias: juanp
Banco: Banco Estado


-Consideraciones
Los datos se almacenan en localStorage del navegador
Al limpiar el caché del navegador se perderán los datos
La aplicación es un prototipo educativo, no para uso en producción
Las credenciales son estáticas para propósitos de demostración

-Autor
Proyecto desarrollado como parte del Módulo 2: Fundamentos del Desarrollo Front-end
Fecha: Enero 2026
Institución: Alkemy

-Licencia
Este proyecto es de código abierto y está disponible para fines educativos.

-Agradecimientos
A los instructores del módulo por su guía
A la comunidad de Bootstrap y jQuery por sus excelentes herramientas

