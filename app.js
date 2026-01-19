// Se ejecuta cuando el DOM está completamente cargado
$(document).ready(function () {
    // Variables globales para almacenar datos de la billetera
    let balance = 300; // Saldo inicial de $300
    let contacts = []; // Array para almacenar contactos
    let transactions = []; // Array para almacenar transacciones
    let loggedIn = false; // Bandera para verificar si el usuario está autenticado


    // Muestra mensajes con efecto fadeIn
    function showMessage(elementId, message, type) {
        const element = $('#' + elementId);
        element.removeClass('text-success text-danger alert-success alert-danger')
            .addClass(type === 'success' ? 'text-success' : 'text-danger')
            .html('<strong>' + message + '</strong>')
            .hide()
            .fadeIn(600);

        // Auto-ocultar después de 5 segundos
        setTimeout(function () {
            element.fadeOut(400);
        }, 5000);
    }

    // Anima el cambio de saldo
    function animateBalance(element, newBalance) {
        const currentValue = parseFloat(element.text().replace('$', '').replace(',', '')) || 0;

        $({ countNum: currentValue }).animate({ countNum: newBalance }, {
            duration: 800,
            easing: 'swing',
            step: function () {
                element.text('$' + this.countNum.toFixed(2));
            },
            complete: function () {
                element.text('$' + newBalance.toFixed(2));
            }
        });
    }

    // Muestra efecto de carga en botón
    function showLoading(buttonSelector, originalText) {
        $(buttonSelector).prop('disabled', true)
            .data('original-text', originalText)
            .html('<span class="spinner-border spinner-border-sm me-2"></span>Procesando...');
    }

    // Oculta efecto de carga en botón
    function hideLoading(buttonSelector) {
        const btn = $(buttonSelector);
        btn.prop('disabled', false)
            .html(btn.data('original-text'));
    }

    // Hace scroll suave hacia un elemento
    function scrollToElement(elementSelector) {
        $('html, body').animate({
            scrollTop: $(elementSelector).offset().top - 100
        }, 500);
    }


    // CARGA DE DATOS DESDE LOCAL STORAGE
    // Verifica si existe un saldo guardado en localStorage
    if (localStorage.getItem('balance')) {
        balance = parseFloat(localStorage.getItem('balance')) || 300; // Carga el saldo o usa 300 por defecto
    }
    // Verifica si el usuario estaba autenticado
    if (localStorage.getItem('loggedIn') === 'true') {
        loggedIn = true; // Restaura el estado de autenticación
    }

    // CARGA DE CONTACTOS DESDE LOCAL STORAGE
    if (localStorage.getItem('contacts')) {
        try {
            // Obtiene la cadena de contactos almacenada
            const str = localStorage.getItem('contacts');
            // Divide la cadena por ';' para obtener cada contacto
            const lista = str.split(';');
            // Itera sobre cada contacto
            lista.forEach(function (item) {
                // Divide cada contacto por '|' para obtener sus propiedades
                const partes = item.split('|');
                // Valida que tenga 4 partes (nombre, cuenta, alias, banco)
                if (partes.length === 4 && partes[0].trim()) {
                    // Agrega el contacto al array
                    contacts.push({
                        nombre: partes[0].trim(),
                        cuenta: partes[1].trim(),
                        alias: partes[2].trim(),
                        banco: partes[3].trim()
                    });
                }
            });
        } catch (e) {
            // Manejo de errores si hay problemas al cargar contactos
            console.log('Error cargando contactos');
        }
    }

    // CARGA DE TRANSACCIONES DESDE LOCAL STORAGE
    if (localStorage.getItem('transactions')) {
        try {
            // Obtiene la cadena de transacciones almacenada
            const str = localStorage.getItem('transactions');
            // Divide la cadena por ';' para obtener cada transacción
            const lista = str.split(';');
            // Itera sobre cada transacción
            lista.forEach(function (item) {
                // Divide cada transacción por '|' para obtener sus propiedades
                const partes = item.split('|');
                // Valida que tenga 4 partes (tipo, monto, fecha, detalle)
                if (partes.length === 4 && partes[0].trim()) {
                    // Agrega la transacción al array
                    transactions.push({
                        tipo: partes[0].trim(),
                        monto: parseFloat(partes[1]) || 0,
                        fecha: partes[2].trim(),
                        detalle: partes[3].trim()
                    });
                }
            });
        } catch (e) {
            // Manejo de errores si hay problemas al cargar transacciones
            console.log('Error cargando transacciones');
            // Elimina datos corruptos de transacciones
            localStorage.removeItem('transactions');
        }
    }

    // FUNCIÓN PARA GUARDAR DATOS EN LOCAL STORAGE
    function guardarDatos() {
        // Guarda el saldo actual
        localStorage.setItem('balance', balance);
        // Guarda el estado de autenticación
        localStorage.setItem('loggedIn', loggedIn ? 'true' : 'false');

        // SERIALIZACIÓN DE CONTACTOS: Convierte el array de contactos en una cadena
        let contactsStr = '';
        // Itera sobre cada contacto
        contacts.forEach(function (c, i) {
            // Agrega un separador ';' entre contactos (excepto en el primero)
            if (i > 0) contactsStr += ';';
            // Concatena los datos del contacto separados por '|'
            contactsStr += c.nombre + '|' + c.cuenta + '|' + c.alias + '|' + c.banco;
        });
        // Guarda la cadena de contactos
        localStorage.setItem('contacts', contactsStr);

        // SERIALIZACIÓN DE TRANSACCIONES: Convierte el array de transacciones en una cadena
        let txStr = '';
        // Itera sobre cada transacción
        transactions.forEach(function (t, i) {
            // Agrega un separador ';' entre transacciones (excepto en la primera)
            if (i > 0) txStr += ';';
            // Concatena los datos de la transacción separados por '|'
            txStr += t.tipo + '|' + t.monto + '|' + t.fecha + '|' + t.detalle;
        });
        // Guarda la cadena de transacciones
        localStorage.setItem('transactions', txStr);
        }

        // SECCIÓN DE LOGIN: Se ejecuta si la página actual es login.html
    if (window.location.pathname.endsWith('login.html')) {

        // Animación de entrada del formulario
        $('.container').hide().fadeIn(800);

        // Maneja el envío del formulario de login
        $('#loginForm').submit(function (e) {
            e.preventDefault();

            const email = $('#exampleInputEmail1').val();
            const pass = $('#exampleInputPassword1').val();
            const msg = $('#loginMessage');

            // Mostrar efecto de carga
            showLoading('#loginForm button[type="submit"]', 'Inicia Sesión');

            // Simular verificación (con delay para mostrar el loading)
            setTimeout(function () {
                if (email === 'user@test.com' && pass === '1234') {
                    showMessage('loginMessage', '✓ Inicio de sesión exitoso. Redirigiendo...', 'success');

                    loggedIn = true;
                    guardarDatos();

                    // Redirigir con efecto
                    setTimeout(function () {
                        $('body').fadeOut(400, function () {
                            window.location.href = 'menu.html';
                        });
                    }, 1500);
                } else {
                    hideLoading('#loginForm button[type="submit"]');
                    showMessage('loginMessage', '✗ Credenciales incorrectas. Intenta nuevamente.', 'error');

                    // Efecto de shake en el formulario
                    $('#loginForm').addClass('shake');
                    setTimeout(function () {
                        $('#loginForm').removeClass('shake');
                    }, 500);
                }
            }, 1000);
        });
    }

    // SECCIÓN DE MENU: Se ejecuta si la página actual es menu.html
    if (window.location.pathname.endsWith('menu.html')) {

        // Verificar autenticación
        if (!loggedIn) {
            window.location.href = 'login.html';
            return;
        }

        // Animación de entrada del menú
        $('h2').hide().slideDown(600);
        $('h3').hide().delay(300).fadeIn(600);

        // Animar saldo
        animateBalance($('#currentBalance'), balance);

        // Animar botones con delay progresivo
        $('.btn').hide().each(function (index) {
            $(this).delay(200 * index).fadeIn(400);
        });

        // Navegación a Depositar
        $('#btnDeposit').click(function () {
            $('body').fadeOut(300, function () {
                window.location.href = 'deposit.html';
            });
        });

        // Navegación a Enviar Dinero
        $('#btnSendMoney').click(function () {
            $('body').fadeOut(300, function () {
                window.location.href = 'sendmoney.html';
            });
        });

        // Navegación a Transacciones
        $('#btnTransactions').click(function () {
            $('body').fadeOut(300, function () {
                window.location.href = 'transaction.html';
            });
        });

        // Efecto pulso en botón de depósito si el saldo es bajo
        if (balance < 500) {
            setTimeout(function () {
                $('#btnDeposit').addClass('pulse-animation');
            }, 1500);
        }
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })        