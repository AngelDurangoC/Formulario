const formulario = document.getElementById("formularioContacto");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const mensajeEstado = document.getElementById("mensajeEstado");

function mostrarErrorCampo(input, idError, mensaje) {
  const spanError = document.getElementById(idError);
  spanError.textContent = mensaje;
  input.classList.add("invalido");
  input.classList.remove("valido");
}

function limpiarErrorCampo(input, idError) {
  const spanError = document.getElementById(idError);
  spanError.textContent = "";
  input.classList.remove("invalido");
  input.classList.add("valido");
}

function validarNombre() {
  const valor = inputNombre.value.trim();
  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

  if (valor === "") {
    mostrarErrorCampo(inputNombre, "error-nombre", "El nombre es obligatorio.");
    return false;
  }
  if (valor.length < 3) {
    mostrarErrorCampo(inputNombre, "error-nombre", "El nombre debe tener al menos 3 caracteres.");
    return false;
  }
  if (!soloLetras.test(valor)) {
    mostrarErrorCampo(inputNombre, "error-nombre", "El nombre solo debe contener letras y espacios.");
    return false;
  }

  limpiarErrorCampo(inputNombre, "error-nombre");
  return true;
}

function validarCorreo() {
  const valor = inputCorreo.value.trim();
  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valor === "") {
    mostrarErrorCampo(inputCorreo, "error-correo", "El correo electrónico es obligatorio.");
    return false;
  }
  if (!formatoCorreo.test(valor)) {
    mostrarErrorCampo(inputCorreo, "error-correo", "Ingresa un correo válido (ej. usuario@dominio.com).");
    return false;
  }

  limpiarErrorCampo(inputCorreo, "error-correo");
  return true;
}

function validarTelefono() {
  const valor = inputTelefono.value.trim();
  const soloDigitos = valor.replace(/\D/g, "");
  const caracteresPermitidos = /^[0-9+\s()-]+$/;

  if (valor === "") {
    mostrarErrorCampo(inputTelefono, "error-telefono", "El número de teléfono es obligatorio.");
    return false;
  }
  if (!caracteresPermitidos.test(valor) || soloDigitos.length < 7 || soloDigitos.length > 15) {
    mostrarErrorCampo(inputTelefono, "error-telefono", "Ingresa un teléfono válido de entre 7 y 15 dígitos.");
    return false;
  }

  limpiarErrorCampo(inputTelefono, "error-telefono");
  return true;
}

inputNombre.addEventListener("blur", validarNombre);
inputCorreo.addEventListener("blur", validarCorreo);
inputTelefono.addEventListener("blur", validarTelefono);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const esNombreValido = validarNombre();
  const esCorreoValido = validarCorreo();
  const esTelefonoValido = validarTelefono();

  if (!esNombreValido || !esCorreoValido || !esTelefonoValido) {
    mensajeEstado.textContent = "Por favor, corrige los campos marcados antes de continuar.";
    mensajeEstado.className = "mensaje-estado error";

    const primerInvalido = formulario.querySelector(".invalido");
    if (primerInvalido) primerInvalido.focus();
    return;
  }

  const nombreRegistrado = inputNombre.value.trim();
  mensajeEstado.textContent = `Registro completado correctamente para ${nombreRegistrado}.`;
  mensajeEstado.className = "mensaje-estado exito";

  formulario.reset();
  [inputNombre, inputCorreo, inputTelefono].forEach((input) => {
    input.classList.remove("valido", "invalido");
  });
});
