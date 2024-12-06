import clsx from 'clsx';
import React, { SVGProps, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const Chevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 49.468 28.879"
    {...props}
  >
    <path
      fill="currentColor"
      d="m24.735 28.879 2.476-2.365L49.468 5.147 44.516 0 24.734 19 4.952 0 0 5.147l22.257 21.367Z"
      data-name="Trac\xE9 48"
    />
  </svg>
);

const VARIANTS: Record<string, Variants> = {
  chevron: {
    open: {
      rotate: 0,
      transition: {
        ease: 'linear',
      },
    },
    close: {
      rotate: -90,
    },
  },
  container: {
    open: {
      opacity: 1,
      display: 'block',
      translateY: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    close: {
      opacity: 0,
      translateY: 50,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
      transitionEnd: {
        display: 'none',
      },
    },
  },
};

export type TabItem = {
  title: string;
  key: string;
};

type TabMenuProps = {
  items: TabItem[];
  initialKey?: string;
} & Record<string, any>;

const TabMenu = ({ items, initialKey, ...props }: TabMenuProps) => {
  const [activeKey, setActiveKey] = useState(initialKey ?? null);

  const keys = items.map((item) => item.key);
  const slots = keys.map((k) => ({ element: props[k] ?? null, key: k }));

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 lg:px-14">
        {items.map((item) => (
          <a
            href="#"
            key={item.key}
            onClick={(ev) => {
              ev.preventDefault();
              setActiveKey(item.key);
            }}
            className={clsx(
              'relative cursor-pointer flex gap-3 justify-start px-5 sm:justify-center items-center text-center uppercase xl:text-lg py-4 transition-colors border-2 border-mini-blue',
              { 'bg-white text-black': activeKey === item.key },
              { 'bg-mini-blue text-white': activeKey !== item.key }
            )}
          >
            {item.title}
            <div className="invisible sm:visible flex justify-center items-center">
              <motion.div
                variants={VARIANTS.chevron}
                initial={item.key === activeKey ? 'open' : 'close'}
                animate={item.key === activeKey ? 'open' : 'close'}
              >
                <Chevron className="w-6 h-auto" />
              </motion.div>
            </div>
          </a>
        ))}
      </div>
      {slots.map(({ element, key }) => (
        <motion.div
          key={key}
          variants={VARIANTS.container}
          initial={key === activeKey ? 'open' : 'close'}
          animate={key === activeKey ? 'open' : 'close'}
        >
          {element}
        </motion.div>
      ))}
    </div>
  );
};

export default TabMenu;
