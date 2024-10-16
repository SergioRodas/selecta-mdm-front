import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Grid, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchCartoons } from '../../services/sections/cartoonService';
import { OptionMenuTopic } from '../Menus';
import 'swiper/swiper-bundle.min.css';

const Cartoon = ({ optSelected }) => {
  const [show, setShow] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isVisibles, setIsVisibles] = useState(true);
  const [cartones, setCartones] = useState([]);

  const optionSelected = (select) => {
    setShowMenu(!showMenu);
    optSelected(select);
  };

  useEffect(() => {
    const getCartoonsData = async () => {
      try {
        const data = await fetchCartoons();
        setCartones(data);
      } catch (error) {
        console.log('Error al obtener datos', error);
      }
    };

    getCartoonsData();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://intelicast.net/t/img/placeholder.png';
  };

  const toggleCartonVisibility = () => {
    setIsVisibles(!isVisibles);
  };

  return (
    <section className="w-full flex flex-col mb-8">
      <div className="flex space-x-4">
        <div className="w-full relative bg-mdmBlue px-4 md:h-10 h-8 text-white font-semibold flex justify-between items-center text-sm md:text-base">
          <p className="text-white font-bold">Cartones</p>
          <button onClick={() => setShowMenu(!showMenu)}>
            <i className="fas fa-ellipsis-vertical w-4" />
          </button>

          <div className="absolute right-0 top-10 h-0 z-10">
            <OptionMenuTopic
              isVisible={showMenu}
              isSelected={(s) => optionSelected(s)}
              onToggleVisibility={toggleCartonVisibility}
              isVisibles={isVisibles}
              onCloseMenu={(s) => optionSelected(s)}
            />
          </div>
        </div>
        {isVisibles && (
          <button
            onClick={() => setShow(!show)}
            className="bg-mdmBlue md:h-10 h-8 md:px-3 px-2 text-white"
          >
            <motion.i
              animate={{
                rotate: show ? 0 : -180,
              }}
              className="fas fa-angle-down"
            />
          </button>
        )}
      </div>

      <motion.div
        animate={{
          x: show ? 0 : -100,
          opacity: show ? 1 : 0,
          height: show ? 'auto' : 0,
          overflow: show ? 'visible' : 'hidden',
        }}
      >
        {isVisibles && (
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
            {cartones.map((cartoon, index) => (
              <SwiperSlide key={index} className="pt-8">
                <div className=" rounded-xl h-[450px] p-4 border">
                  <div className=" ">
                    <img
                      src={
                        cartoon.imagenURL ||
                        'https://intelicast.net/t/img/placeholder.png'
                      }
                      alt="Cartoon"
                      onError={handleImageError}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  </div>
                  <div className="pt-4 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-justify">
                        {cartoon.captitulo}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-justify">
                        {cartoon.fnodescripcion}
                      </p>
                    </div>
                    <div className="pt-3 flex items-center text-blue-700">
                      <a
                        href={cartoon.imagenURL}
                        className="underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver imagen
                        <i className="fas fa-arrow-right pl-2 text-xs"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </motion.div>
    </section>
  );
};

export default Cartoon;
