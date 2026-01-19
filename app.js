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
// SECCIÓN DE DEPOSIT: Se ejecuta si la página actual es deposit.html
    if (window.location.pathname.endsWith('deposit.html')) {

        if (!loggedIn) {
            window.location.href = 'login.html';
            return;
        }

        // Mostrar saldo actual con animación
        animateBalance($('#depositCurrentBalance'), balance);

        // Animación de entrada
        $('.container').hide().fadeIn(600);

        // Validación en tiempo real con efecto visual
        $('#depositAmount').on('input', function () {
            const valor = parseFloat($(this).val());
            const btn = $('#btnDoDeposit');

            if (valor > 0) {
                $(this).removeClass('is-invalid').addClass('is-valid');
                btn.prop('disabled', false).fadeIn(300);
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
                btn.prop('disabled', true).fadeOut(200);
            }
        });

        // Maneja el clic en el botón de depósito
        $('#btnDoDeposit').click(function () {
            const monto = parseFloat($('#depositAmount').val());

            if (isNaN(monto) || monto <= 0) {
                showMessage('depositMessage', '⚠ Por favor ingresa un monto válido mayor a $0', 'error');
                $('#depositAmount').addClass('is-invalid');
                return;
            }

            // Mostrar loading
            showLoading('#btnDoDeposit', 'Realizar Depósito');

            // Simular procesamiento
            setTimeout(function () {
                const balanceAnterior = balance;
                balance += monto;

                // Registrar transacción
                const fecha = new Date().toLocaleString('es-CL');
                transactions.push({
                    tipo: 'Depósito',
                    monto: monto,
                    fecha: fecha,
                    detalle: 'Depósito realizado'
                });

                guardarDatos();

                // Animar nuevo saldo
                animateBalance($('#depositCurrentBalance'), balance);

                // Mostrar mensaje de éxito
                showMessage('depositMessage',
                    `✓ ¡Depósito exitoso! Se agregaron $${monto.toFixed(2)} a tu cuenta`,
                    'success');

                // Limpiar formulario con efecto
                $('#depositAmount').val('').removeClass('is-valid');

                hideLoading('#btnDoDeposit');

                // Scroll al mensaje
                scrollToElement('#depositMessage');

            }, 1200);
        });
    }

    // SECCIÓN DE SENDMONEY: Se ejecuta si la página actual es sendmoney.html
    if (window.location.pathname.endsWith('sendmoney.html')) {

        if (!loggedIn) {
            window.location.href = 'login.html';
            return;
        }

        // Mostrar saldo con animación
        animateBalance($('#sendCurrentBalance'), balance);

        // Animación de entrada
        $('.container').hide().fadeIn(600);

        // Ocultar formulario de nuevo contacto inicialmente
        $('#newContactBox').hide();

        // Rellenar el datalist con contactos guardados
        $('#datalistOptions').empty();
        contacts.forEach(function (c) {
            $('#datalistOptions').append(
                '<option value="' + c.nombre + ' - ' + c.alias + '"></option>'
            );
        });

        // Mostrar formulario de nuevo contacto con slideDown
        $('#btnAddContact').click(function () {
            $('#newContactBox').slideDown(400);
            $(this).fadeOut(300);
            $('#btnSendMoneyConfirm').fadeOut(300);
        });

        // Cancelar creación de contacto
        $('#btnCancelContact').click(function () {
            $('#newContactBox').slideUp(400, function () {
                // Limpiar campos
                $('#contactName, #contactAccount, #contactAlias, #contactBank').val('');
                $('#btnAddContact').fadeIn(300);
                $('#btnSendMoneyConfirm').fadeIn(300);
            });
        });

        // Guardar nuevo contacto
        $('#btnSaveContact').click(function () {
            const nombre = $('#contactName').val().trim();
            const cuenta = $('#contactAccount').val().trim();
            const alias = $('#contactAlias').val().trim();
            const banco = $('#contactBank').val().trim();

            if (!nombre || !cuenta || !alias || !banco) {
                showMessage('sendMessage', '⚠ Por favor completa todos los campos del contacto', 'error');
                return;
            }

            // Mostrar loading
            showLoading('#btnSaveContact', 'Guardar contacto');

            setTimeout(function () {
                // Agregar contacto
                contacts.push({ nombre, cuenta, alias, banco });
                guardarDatos();

                // Actualizar datalist
                $('#datalistOptions').append(
                    '<option value="' + nombre + ' - ' + alias + '"></option>'
                );

                // Mostrar mensaje
                showMessage('sendMessage', `✓ Contacto "${nombre}" agregado exitosamente`, 'success');

                // Limpiar y ocultar formulario
                $('#contactName, #contactAccount, #contactAlias, #contactBank').val('');
                $('#newContactBox').slideUp(400, function () {
                    $('#btnAddContact').fadeIn(300);
                    $('#btnSendMoneyConfirm').fadeIn(300);
                });

                hideLoading('#btnSaveContact');

            }, 800);
        });

        // Enviar dinero con validación y efectos
        $('#btnSendMoneyConfirm').click(function () {
            const selectedContact = $('#exampleDataList').val().trim();

            if (!selectedContact) {
                showMessage('sendMessage', '⚠ Debes seleccionar un contacto', 'error');
                $('#exampleDataList').addClass('is-invalid');
                return;
            }

            const monto = parseFloat(prompt('Ingrese el monto a transferir:'));

            if (isNaN(monto) || monto <= 0) {
                showMessage('sendMessage', '⚠ Monto inválido', 'error');
                return;
            }

            if (monto > balance) {
                showMessage('sendMessage', '⚠ Saldo insuficiente', 'error');
                return;
            }

            // Mostrar loading
            showLoading('#btnSendMoneyConfirm', 'Enviar dinero');

            setTimeout(function () {
                balance -= monto;

                const fecha = new Date().toLocaleString('es-CL');
                transactions.push({
                    tipo: 'Transferencia',
                    monto: -monto,
                    fecha: fecha,
                    detalle: 'Enviado a ' + selectedContact
                });

                guardarDatos();

                // Actualizar saldo con animación
                animateBalance($('#sendCurrentBalance'), balance);

                showMessage('sendMessage',
                    `✓ Transferencia de $${monto.toFixed(2)} enviada exitosamente a ${selectedContact}`,
                    'success');

                $('#exampleDataList').val('').removeClass('is-invalid');

                hideLoading('#btnSendMoneyConfirm');
                scrollToElement('#sendMessage');

            }, 1500);
        });
    }


    // SECCIÓN DE TRANSACCIONES: Se ejecuta si la página actual es transaction.html
    if (window.location.pathname.endsWith('transaction.html')) {
        // Verifica si el usuario no está autenticado
        if (!loggedIn) {
            // Redirige a la página de login si no está autenticado
            window.location.href = 'login.html';
        } else {
            // CREACIÓN DE FILTRO PARA LAS TRANSACCIONES
            // Inserta el filtro debajo del título h2 de la página
            $('.container h2').after(`
        <div class="row mb-4 mt-3">
        <div class="col-md-4">
            <select id="filtroTipo" class="form-select">
            <option value="">Todos</option>
            <option value="Depósito">Depósitos</option>
            <option value="Envío">Envíos</option>
            </select>
        </div>
        </div>
    `);

            // Asigna un id al tbody de la tabla para identificarlo fácilmente y lo vacía
            $('.table tbody').attr('id', 'transactionsTableBody').empty();

            // FUNCIÓN PARA MOSTRAR MOVIMIENTOS CON FILTRO
            function mostrarMovimientos(filtro) {
                // Obtiene la referencia al tbody de la tabla
                const tbody = $('#transactionsTableBody');
                // Limpia el contenido actual de la tabla
                tbody.empty();

                // Si no hay transacciones, muestra un mensaje
                if (transactions.length === 0) {
                    // Agrega una fila con mensaje de "No hay movimientos"
                    tbody.html('<tr><td colspan="4" class="text-center py-4">No hay movimientos aún</td></tr>');
                    return;
                }

                // Itera sobre cada transacción
                transactions.forEach(function (tx) {
                    // Si el filtro está vacío o coincide con el tipo de transacción
                    if (!filtro || tx.tipo === filtro) {
                        // Agrega una fila a la tabla con los datos de la transacción
                        tbody.append(`
            <tr>
                <td>${tx.detalle}</td>
                <td>${tx.monto.toFixed(2)}</td>
                <td>${tx.fecha}</td>
                <td>${tx.tipo}</td>
            </tr>
            `);
                    }
                });
            }

            // Muestra todos los movimientos al cargar la página
            mostrarMovimientos();
            // EVENTO PARA CAMBIAR EL FILTRO
            $('#filtroTipo').change(function () {
                // Muestra los movimientos filtrados según la opción seleccionada
                mostrarMovimientos($(this).val());
            });
        }
    }
})        