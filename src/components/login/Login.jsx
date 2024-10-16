import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { login as loginUser } from '../../services/users/userService';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token, setToken, setProfile } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/inicio');
    }
  }, [token, navigate]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);
      setToken(response.token);
      setProfile(response.user);
      navigate('/inicio');
    } catch (err) {
      setError('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sm:min-h-screen h-[650px] relative flex items-center">
      <div className="h-16 sm:bg-[#E0F0FF] hidden sm:flex w-full absolute top-0" />

      <div className="inline-block sm:flex sm:items-center justify-center w-full md:space-x-40 px-7 space-y-7">
        <div className="flex flex-col items-center space-y-3">
          <p className="font-bold md:text-2xl uppercase">Selecta</p>
          <img
            src="/images/logo_mdm.png"
            alt="Logo MDM"
            className="md:w-full md:h-20 w-1/2 object-cover"
          />
        </div>

        <div className="space-y-7 md:w-2/5 w-full">
          <h1 className="text-center font-bold text-mdmGray">Ingreso</h1>
          <form onSubmit={handleLogin}>
            <div>
              <p className="text-mdmGray font-semibold text-sm mb-2">Correo</p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="border rounded-md px-2 h-10 w-full text-xs text-mdmGray focus:outline-none focus:border-mdmBlue focus:border-2 transition-colors"
                placeholder="Ingresa tu correo electronico"
                required
              />
            </div>
            <div>
              <p className="text-mdmGray font-semibold text-sm mb-2">
                Contraseña
              </p>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu contraseña"
                  className="border rounded-md px-2 h-10 w-full text-xs text-mdmGray focus:outline-none focus:border-mdmBlue focus:border-2 transition-colors"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <i className="fas fa-eye text-base text-mdmGray " />
                  ) : (
                    <i className="fas fa-eye-slash text-base text-mdmGray " />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex flex-col justify-center items-center text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}

            <div className="text-mdmBlue flex justify-between items-center underline text-[10px] md:text-xs font-semibold h-10">
              <a href="/#">Solicita asistencia</a>
              <a href="/recuperar-contraseña">Olvidé mi contraseña</a>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className={`bg-mdmBlue text-white rounded-full w-44 h-10 font-semibold flex justify-center items-center ${loading ? 'bg-sky-900 cursor-not-allowed' : 'hover:bg-sky-900'}`}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
