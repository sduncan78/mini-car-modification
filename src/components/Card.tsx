import React, { MouseEventHandler, useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import clsx from 'clsx'

const VARIANTS: Record<string, Variants> = {
  card: {
    close: {
      height: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.3
      }
    },
    open: {
      height: 300,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3
      }
    }
  },
  text: {
    close: {
      opacity: 0,
      scale: 0.8
    },
    open: {
      opacity: 1,
      scale: 1
    }
  },
  chevron: {
    close: {
      rotate: 0
    },
    open: {
      rotate: -180
    }
  }
}

const Card = (props: Record<string, any>) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen ?? false)

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (ev) => {
    ev.preventDefault()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const $scroller: HTMLElement = document.getElementById('scroller') as HTMLElement
        $scroller.scrollTo(0, document.body.scrollHeight)
      }, 200)
    }
  }, [isOpen])

  return (
    <div className="h-auto">
      <a
        onClick={handleClick}
        className={
          clsx(
            'group py-8 px-6 flex flex-col justify-start items-center border-2 relative cursor-pointer  transition-colors',
            { 'bg-mini-blue text-white hover:bg-white hover:text-mini-blue': !isOpen },
            { 'bg-white border-mini-blue text-mini-blue': isOpen }
          )}
      >
        <div className='h-28 flex justify-center items-center'>
          { props.icon }
        </div>
        <motion.div className="w-full my-6 overflow-hidden" variants={VARIANTS.card} initial="close" animate={isOpen ? 'open' : 'close'}>
          <motion.p className="text-center text-black" variants={VARIANTS.text}>
            { props.text }
          </motion.p>
        </motion.div>
        <motion.svg variants={VARIANTS.chevron} initial="close" animate={isOpen ? 'open' : 'close'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.468 28.879" className="absolute bottom-4 w-10 h-auto"><path fill="currentColor" d="m24.735 28.879 2.476-2.365L49.468 5.147 44.516 0 24.734 19 4.952 0 0 5.147l22.257 21.367Z" data-name="Tracé 48"/></motion.svg>
      </a>
    </div>

  )
}

export default Card
