import { motion } from 'framer-motion';
import { useState } from 'react';

import { COLORS } from '../../utils/Colors';
import { MyPieChart } from '../graphics/Graphics';
import { OptionMenuTopic } from '../Menus/OptionMenuTopic';

export const PieGraphic = ({ optSelected }) => {
  const [show, setShow] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isVisibles, setIsVisibles] = useState(true); // eslint-disable-line no-unused-vars

  const data = [
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquam blanditiis vitae corrupti beatae.',
      value: 25,
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquam blanditiis vitae corrupti beatae.',
      value: 30,
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquam blanditiis vitae corrupti beatae.',
      value: 8,
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquam blanditiis vitae corrupti beatae.',
      value: 17,
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquam blanditiis vitae corrupti beatae.',
      value: 20,
    },
  ];

  const optionSelected = (select) => {
    setShowMenu(!showMenu);
    optSelected(select);
  };

  return (
    <section className="w-full flex flex-col mb-8">
      <div className="flex space-x-4">
        <div className="w-full relative bg-mdmBlue px-4 md:h-10 h-8 text-white font-semibold flex justify-between items-center text-sm md:text-base">
          <p className="text-white font-bold">Tema del día</p>
          <button onClick={() => setShowMenu(!showMenu)}>
            <i className="fas fa-ellipsis-vertical w-4" />
          </button>

          <div className="absolute right-0 top-10 h-0 z-10">
            <OptionMenuTopic isVisible={showMenu} onSelect={optionSelected} />
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
          height: show ? 'auto' : 0,
          opacity: show ? 1 : 0,
          x: show ? 0 : -100,
          overflow: show ? 'hidden' : 'visible',
        }}
        className="ml-3 space-y-3"
      >
        {isVisibles && (
          <div className="pt-8">
            <MyPieChart data={data} COLORS={COLORS} />
          </div>
        )}
      </motion.div>
    </section>
  );
};
