import React, { Children, ReactElement, SVGProps, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const VARIANTS = {
  container: {
    active: {
      scaleY: 1,
      opacity: 1,
      height: "auto",
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3
      }
    },
    inactive: {
      scaleY: 0,
      opacity: 0,
      height: "6rem",
      transition: {
        duration: 0.2
      }
    }
  },
  bubble: {
    active: {
      scale: 1
    },
    inactive: {
      scale: 0.8
    }
  },
  text: {
    active: {
      opacity: 1,
      x: 0
    },
    inactive: {
      opacity: 0,
      x: 40,
      duration: 0.2
    }
  }
}

type BenefitsListProps = {
  noAnim?: boolean,
  children: Array<JSX.Element | false>
}

const Triangle = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 43.682 42.264"
    {...props}
  >
    <path
      fill="currentColor"
      d="M43.682 0s-5.247 17.09 0 42.264L0 20.582Z"
      data-name="Trac\xE9 35"
    />
  </svg>
)

const BenefitsList = (props: BenefitsListProps): JSX.Element => {
  const { noAnim = false, children } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const childs = Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }
    
    return React.cloneElement(child, {
      isActive: activeIndex === index || noAnim,
      margin: index > 0,
      onClick: () => {
        if (!noAnim) {
          setActiveIndex(index)
        }
      }
    })
  })

  return (
    <motion.div className="relative w-full max-w-3xl mx-auto flex flex-col">
      <div className="absolute z-0 top-0 bottom-0 left-[0.96rem] sm:left-[1.20rem] w-0 border-l-2 border-dashed border-mini-light-gray"></div>
      { childs }
    </motion.div>
  )
}

type ItemProps = {
  icon: JSX.Element
  children: JSX.Element
  onClick?: () => void
  theme: 'primary' | 'gray' | 'light-gray'
  margin?: boolean
  isActive?: boolean
}

const Item = ({ icon, children, onClick, theme, margin = false, isActive = false }: ItemProps): JSX.Element => (
  <motion.div
    initial={'inactive'}
    animate={isActive ? 'active' : 'inactive'}
    className={clsx('relative z-10 flex flex-row items-center text-mini-blue text-base md:text-md lg:text-base', { 'mt-8': margin })}
  >
    <div className={
      clsx(
        'w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex justify-center items-center',
        { 'border-mini-blue': theme === 'primary' },
        { 'border-mini-gray': theme === 'gray' },
        { 'border-mini-light-gray': theme === 'light-gray' }
      )}
    >
      <motion.div
        variants={VARIANTS.bubble}
        className={
          clsx(
            'w-[70%] h-[70%] rounded-full ',
            { 'bg-mini-blue': theme === 'primary' },
            { 'bg-mini-gray': theme === 'gray' },
            { 'bg-mini-light-gray': theme === 'light-gray' }
          )
        }
      ></motion.div>
    </div>
    <Triangle className={
      clsx(
        'w-6 sm:w-7 h-auto ml-4 transform-gpu translate-x-1',
        { 'text-mini-blue': theme === 'primary' },
        { 'text-mini-gray': theme === 'gray' },
        { 'text-mini-light-gray': theme === 'light-gray' }
      )}
    />
    <div className='relative sm:min-h-[6rem] text-white flex-1'>
      <a
        onClick={onClick}
        className={
          clsx(
            'cursor-pointer absolute flex -top-2 sm:top-[50%] transform sm:translate-y-[-50%] left-2 justify-center items-center w-20 h-20 sm:w-28 sm:h-28 border-4 bg-white rounded-full  z-10',
            { 'border-mini-blue': theme === 'primary' },
            { 'border-mini-gray': theme === 'gray' },
            { 'border-mini-light-gray': theme === 'light-gray' }
          )
        }>
        <div className={
          clsx(
            'w-[90%] h-[90%] border border-mini-light-gray rounded-full flex justify-center items-center',
            { 'text-mini-blue': theme === 'primary' },
            { 'text-mini-gray': theme === 'gray' },
            { 'text-mini-light-gray': theme === 'light-gray' }
          )}>
          <motion.div variants={VARIANTS.bubble}>
            { icon }
          </motion.div>
        </div>
      </a>
      <motion.div
        variants={VARIANTS.container}
        className={
          clsx('relative sm:min-h-[6rem] text-white w-full flex items-center z-0',
            { 'bg-mini-blue': theme === 'primary' },
            { 'bg-mini-gray': theme === 'gray' },
            { 'bg-mini-light-gray': theme === 'light-gray' }
          )}
      >
        <motion.p
          variants={VARIANTS.text}
          className="pl-24 sm:pl-36 py-2 sm:py-4 pr-4"
        >
          { children }
        </motion.p>
      </motion.div>
    </div>
  </motion.div>
)

BenefitsList.Item = Item

export default BenefitsList
