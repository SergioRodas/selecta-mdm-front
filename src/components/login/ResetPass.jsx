import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuthStore from '../../store/authStore';
import animationData from '../../utils/animations/check.json';

export default function ResetPass() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/inicio');
    }
  }, [token, navigate]);

  return (
    <section className="sm:min-h-screen h-[650px] relative flex justify-center flex-col">
      <div className="h-16 sm:bg-[#E0F0FF] hidden sm:flex w-full absolute top-0" />

      <div className="sm:px-40 px-5">
        <Link
          to={'/'}
          className="absolute sm:top-24 top-12 text-mdmBlue font-semibold flex items-center"
        >
          <i className="fas fa-angle-left mr-2 text-xl" />
          Regresar
        </Link>
        <GetCode />
      </div>
    </section>
  );
}

export const GetCode = () => {
  return (
    <div className="flex flex-col items-center space-y-7">
      <h1 className="font-bold">Recuperar contraseña</h1>
      <p className="">
        Por favor ingresa el código de seguridad que enviamos a
        na******@gmail.com
      </p>
      <div className="space-x-5">
        <input
          type="number"
          maxLength="1"
          className="input-code border border-gray-300 rounded-md h-10 w-10 leading-tight focus:outline-none focus:border-mdmBlue px-3"
        />
        <input
          type="number"
          maxLength="1"
          className="input-code border border-gray-300 rounded-md h-10 w-10 leading-tight focus:outline-none focus:border-mdmBlue px-3"
        />
        <input
          type="number"
          maxLength="1"
          className="input-code border border-gray-300 rounded-md h-10 w-10 leading-tight focus:outline-none focus:border-mdmBlue px-3"
        />
        <input
          type="number"
          maxLength="1"
          className="input-code border border-gray-300 rounded-md h-10 w-10 leading-tight focus:outline-none focus:border-mdmBlue px-3"
        />
      </div>
    </div>
  );
};

export const NewPass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const viewNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const hiddeNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const viewConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const hiddeConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col items-center space-y-7">
      <h1 className="font-bold">Recuperar contraseña</h1>

      <div className="flex flex-col sm:w-1/2 w-full ">
        <div className="flex flex-col space-y-3 mb-7">
          <label className="font-semibold text-sm text-mdmGray">
            Ingresa tu nueva contraseña
          </label>
          <div className="relative w-full">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Ingresa tu nueva contraseña"
              className="border rounded-md px-2 h-10 w-full text-xs text-mdmGray focus:outline-none focus:border-mdmBlue focus:border-2 transition-colors"
              onChange={viewNewPassword}
              value={newPassword}
            />
            <button
              className="absolute right-3 top-2"
              onClick={hiddeNewPassword}
            >
              {showNewPassword ? (
                <i className="fas fa-eye text-base text-mdmGray " />
              ) : (
                <i className="fas fa-eye-slash text-base text-mdmGray " />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-3 mb-24">
          <label className="font-semibold text-sm text-mdmGray">
            Confirma tu nueva contraseña
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirma tu nueva contraseña"
              className="border rounded-md px-2 h-10 w-full text-xs text-mdmGray focus:outline-none focus:border-mdmBlue focus:border-2 transition-colors"
              onChange={viewConfirmPassword}
              value={confirmPassword}
            />
            <button
              className="absolute right-3 top-2"
              onClick={hiddeConfirmPassword}
            >
              {showConfirmPassword ? (
                <i className="fas fa-eye text-base text-mdmGray " />
              ) : (
                <i className="fas fa-eye-slash text-base text-mdmGray " />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="/inicio"
            className="bg-mdmBlue text-white rounded-full w-36 h-10 font-semibold hover:bg-sky-900 flex justify-center items-center text-sm"
          >
            Continuar
          </a>
        </div>
      </div>
    </div>
  );
};

export const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-green-500 mb-3 w-36">
        <Lottie animationData={animationData} loop={false} autoPlay={true} />
      </div>
      <p className="font-bold text-center mb-32">
        Tu contraseña se cambió correctamente
      </p>
      <a
        href="/ingresar"
        className="bg-mdmBlue hover:bg-blue-900 text-white mt-4 py-2 px-4 rounded-full w-36 h-10 font-semibold flex justify-center items-center text-sm"
      >
        Aceptar
      </a>
    </div>
  );
};
