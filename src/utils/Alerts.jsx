import Swal from 'sweetalert2';

export const showErrorUser = () => {
  Swal.fire({
    title: 'Error',
    text: 'Usuario o contraseña incorrectos. Intente nuevamente.',
    icon: 'error',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#E75B25',
    timer: 4000,
  });
};
