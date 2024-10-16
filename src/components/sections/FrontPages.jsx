import { motion } from 'framer-motion';
import { useState } from 'react';

import { OptionsMenuPp } from '../Menus';
import { PpTitlesDescription, PpTitles, PpMiniatures } from '../ViewsPP';

const FrontPages = ({ optSelected, optFormat }) => {
  const [show, setShow] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isVisibles, setIsVisibles] = useState(true);

  const toggleGraphicVisibility = () => {
    setIsVisibles(!isVisibles);
  };

  const optionSelected = (select) => {
    setShowMenu(!showMenu);
    optSelected(select);
  };

  return (
    <section className="w-full flex flex-col mb-8">
      <div className="flex space-x-4">
        <div className="w-full relative bg-mdmBlue px-4 md:h-10 h-8 text-white font-semibold flex justify-between items-center text-sm md:text-base">
          <p className="text-white font-bold">Ocho Columnas</p>
          <button onClick={() => setShowMenu(!showMenu)}>
            <i className="fas fa-ellipsis-vertical w-4" />
          </button>

          <div className="absolute right-0 top-10 h-0 z-10">
            <OptionsMenuPp
              isVisible={showMenu}
              isSelected={(s) => optionSelected(s)}
              onCloseMenu={(s) => optionSelected(s)}
              onToggleVisibility={toggleGraphicVisibility}
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
        <>
          {optFormat === 0 && <PpTitlesDescription isVisibles={isVisibles} />}
          {optFormat === 1 && <PpTitles isVisibles={isVisibles} />}
          {optFormat === 2 && <PpMiniatures isVisibles={isVisibles} />}
        </>
      </motion.div>
    </section>
  );
};

export default FrontPages;
