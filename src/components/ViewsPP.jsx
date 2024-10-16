import { useEffect, useState } from 'react';
import { Grid, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import * as logos from '../assets/images';
import {
  fetchPrimerasPlanas,
  fetchPrimerasPlanasWithImages,
} from '../services/sections/frontPagesService';

export const PpTitlesDescription = ({ isVisibles }) => {
  const [primerasPP, setPrimerasPP] = useState([]);

  useEffect(() => {
    const getPrimerasPlanasData = async () => {
      try {
        const data = await fetchPrimerasPlanasWithImages();
        setPrimerasPP(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getPrimerasPlanasData();
  }, []);

  const handleCapituloClick = (tituloURL) => {
    if (tituloURL) {
      window.open(tituloURL, '_blank');
    }
  };

  return (
    <section>
      {isVisibles &&
        primerasPP.map((note, index) => {
          return (
            <div
              className="w-full mt-8 flex it flex-wrap space-x-4 text-xs sm:text-base items-center"
              key={index}
            >
              <URLTestigo urlTestigo={note.PrimeraplanaURL}>
                <div
                  className="flex-none"
                  style={{ width: '160px', height: '120px' }}
                >
                  <img
                    src={note.logoUrl}
                    alt={`Logo ${note.MEDIO}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              </URLTestigo>

              <div
                className="flex-1 min-w-0 ml-4  className=flex-1 cursor-pointer"
                onClick={() => handleCapituloClick(note.NotacompletaURL)}
              >
                <h4 className="underline font-semibold cursor-pointer">
                  {note.captitulo}{' '}
                </h4>
                <p className="text-justify text-gray-600 text-xs md:text-sm pt-2">
                  {note.fnodescripcion || note.MEDIO}
                </p>
              </div>
            </div>
          );
        })}
    </section>
  );
};

const URLTestigo = ({ urlTestigo, children }) => {
  const handleTestigoClick = (event) => {
    event.stopPropagation();
    if (urlTestigo) {
      window.open(urlTestigo, '_blank');
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleTestigoClick}>
      {children}
    </div>
  );
};

export const PpTitles = ({ isVisibles }) => {
  const [primerasPP, setPrimerasPP] = useState([]);

  useEffect(() => {
    const getPrimerasPlanasData = async () => {
      try {
        const data = await fetchPrimerasPlanasWithImages();
        setPrimerasPP(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getPrimerasPlanasData();
  }, []);

  const obtenerURLLogo = (note) => {
    if (!note.MEDIO) {
      return 'https://intelicast.net/w6231v4smt7j5PM74S7vS768W58W0K7e6m99bP0O/logos_medios/tv.jpg';
    }
    const baseName = note.MEDIO.replace('.jpg', '').toLowerCase();
    const adjustedName = baseName.replace(/ /g, '');
    const logoImage =
      logos[adjustedName] ||
      'https://intelicast.net/w6231v4smt7j5PM74S7vS768W58W0K7e6m99bP0O/logos_medios/radio.jpg';

    return logoImage;
  };

  const handleCapituloClick = (tituloURL) => {
    if (tituloURL) {
      window.open(tituloURL, '_blank');
    }
  };

  return (
    <section>
      {isVisibles &&
        primerasPP.map((note, index) => {
          return (
            <div
              className="w-full mt-8 flex it flex-wrap space-x-4 text-xs sm:text-base items-center"
              key={index}
            >
              <URLTestigos urlTestigo={note.PrimeraplanaURL}>
                <div
                  className="flex-none"
                  style={{ width: '160px', height: '120px' }}
                >
                  <img
                    src={obtenerURLLogo(note)}
                    alt={`Logo ${note.MEDIO}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              </URLTestigos>

              <div
                className="flex-1 min-w-0 ml-4  className=flex-1 cursor-pointer"
                onClick={() => handleCapituloClick(note.NotacompletaURL)}
              >
                <h4 className="underline font-semibold">{note.captitulo}</h4>
              </div>
            </div>
          );
        })}
    </section>
  );
};

const URLTestigos = ({ urlTestigo, children }) => {
  const handleTestigoClick = (event) => {
    event.stopPropagation();
    if (urlTestigo) {
      window.open(urlTestigo, '_blank');
    }
  };

  return <div onClick={handleTestigoClick}>{children}</div>;
};

export const PpMiniatures = ({ isVisibles }) => {
  const [primerasPP, setPrimerasPP] = useState([]);

  useEffect(() => {
    const getPrimerasPlanasData = async () => {
      try {
        const data = await fetchPrimerasPlanas();
        setPrimerasPP(data);
        console.log(data);
      } catch (error) {
        console.log('Error al obtener datos', error);
      }
    };

    getPrimerasPlanasData();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://intelicast.net/t/img/placeholder.png';
  };
  return (
    <section>
      <Swiper
        modules={[Grid, Autoplay]}
        slidesPerView={2}
        grid={{ rows: 2, fill: 'row' }}
        spaceBetween={10}
        grabCursor={true}
        autoplay={{
          delay: 2500,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            rows: 2,
            fill: 'row',
          },
          768: {
            slidesPerView: 3,
            rows: 2,
            fill: 'row',
          },
          1024: {
            slidesPerView: 4,
            rows: 2,
            fill: 'row',
          },
        }}
      >
        {isVisibles &&
          primerasPP.map((note, index) => {
            return (
              <SwiperSlide key={index} className="pt-8">
                <div className="rounded-xl h-[350px] p-4 border">
                  <div className="">
                    <img
                      src={
                        note.imagenURL ||
                        'https://intelicast.net/t/img/placeholder.png'
                      }
                      alt="NewsPaper"
                      className="w-full h-64 object-cover rounded-xl"
                      onError={handleImageError}
                    />
                  </div>

                  <div className="text-base font-semibold text-justify">
                    <h4 className="">{note.captitulo}</h4>
                  </div>

                  <div className="pt-3 flex items-center text-blue-700">
                    <a
                      href={
                        note.imagenURL
                          ? note.imagenURL
                          : 'https://intelicast.net/t/img/placeholder.png'
                      }
                      className="underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver imagen
                      <i className="fas fa-arrow-right pl-2 text-xs"></i>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};
