import React, { Children, ReactElement, SVGProps, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import clsx from 'clsx'

const VARIANTS: Record<string, Variants> = {
  container: {
    active: {
      opacity: 1,
      height: 'auto',
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
        ease: 'easeInOut'
      }
    },
    inactive: {
      opacity: 0,
      height: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.3
      }
    }
  },
  chevron: {
    active: {
      rotate: 0,
      transition: {
        ease: 'linear'
      }
    },
    inactive: {
      rotate: -180
    }
  },
  text: {
    active: {
      opacity: 1,
      translateX: 0
    },
    inactive: {
      opacity: 0,
      translateX: 20
    }
  }
}

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
)

type AccordeonProps = {
  children: ReactElement[]
}

const AccordeonList = ({ children }: AccordeonProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0)

  const childs = Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: activeIndex === index,
      tag: `#${index + 1}`,
      onSelected: () => setActiveIndex(activeIndex === index ? -1 : index)
    })
  })

  return (
    <div className='mt-8 mb-6 space-y-2'>
      { childs }
    </div>
  )
}

type AccordeonItemProps = {
  title: string
  tag?: string
  isActive?: boolean
  icon?: JSX.Element
  children?: JSX.Element
  onSelected?: () => void
}

const Item = ({ title, tag, icon, children, isActive = false, onSelected }: AccordeonItemProps): JSX.Element => {
  return (
    <motion.div
      initial="inactive"
      animate={isActive ? 'active' : 'inactive'}
      className="relative z-10 w-full space-y-2"
    >
      <a href="#"
        onClick={onSelected}
        className={
          clsx(
            'relative w-full py-6 px-16 sm:px-24  text-lg transition flex flex-row items-center uppercase font-medium',
            { 'bg-white border border-mini-blue text-black': isActive },
            { 'bg-black text-white': !isActive }
          )}
      >
        <div
          className={
            clsx(
              'absolute top-0 left-4 sm:left-12 bottom-0 flex justify-center items-center',
              { 'text-mini-blue': isActive },
              { 'text-white': !isActive }
            )
          }>
          { icon }
        </div>
        <div className={
          clsx(
            'absolute top-0 right-4 sm:right-12 bottom-0 flex justify-center items-center text-white',
            { 'text-mini-blue': isActive },
            { 'text-white': !isActive }
          )}>
          <motion.div variants={VARIANTS.chevron}>
            <Chevron className="w-8 h-auto" />
          </motion.div>
        </div>
        <div
          className={
            clsx(
              'font-bold text-2xl mr-4',
              { 'text-mini-blue': isActive },
              { 'text-white': !isActive }
            )
          }>
          { tag }
        </div>
        { title }
      </a>
      <motion.div variants={VARIANTS.container} className='w-full overflow-hidden'>
        <motion.div variants={VARIANTS.text} className='w-full py-4 sm:py-6 px-4 sm:px-12 lg:px-28'>
          { children }
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

AccordeonList.Item = Item

export default AccordeonList
