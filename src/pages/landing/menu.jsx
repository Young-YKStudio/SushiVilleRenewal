import { useState } from 'react'
import { motion } from 'framer-motion'
import AppetizerMenu from './menu_parts/appetizer'
import SpecialRollsMenu from './menu_parts/specialRolls'
import RegularRollsMenu from './menu_parts/regularRolls'
import SoupSaladMenu from './menu_parts/soupSalad'
import EntreeMenu from './menu_parts/entree'
import SushiSashimiMenu from './menu_parts/sushiSashimi'
import ALaCarteMenu from './menu_parts/alacarte'
import PartyPlatterMenu from './menu_parts/partyPlatter'
import LunchSpecialMenu from './menu_parts/lunchSpecial'
import { MenuSelections } from '../../../data/menu'

const MenuSection = ({menu}) => {

  const [ currentSection, setCurrentSection ] = useState('APPETIZER')
  
  return (
    <section className='p-8'>
      <motion.div 
        className='flex justify-center border-b border-lime-800 text-lime-800'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <p className='font-bold text-4xl pb-2'>Menu</p>
      </motion.div>
      <motion.div
        className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 justify-center gap-4 flex-wrap tracking-wide font-bold text-lime-800 my-4 mt-12 text-center'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        {MenuSelections && MenuSelections.map((category, i) => {
          return <p
            key={i+1000}
            className={currentSection===category.category ? 'text-lime-800 border-b border-lime-800 pb-2 px-4' : 'border-b border-transparent pb-2 px-4 hover:text-lime-800 hover:border-lime-800 hover:cursor-pointer text-lime-800 font-normal'}
            onClick={() => setCurrentSection(category.category)}
          >
            {category.category}
          </p>
        })}
      </motion.div>
      <div>
        {currentSection==='APPETIZER' && <AppetizerMenu menu={menu} />}
        {currentSection==='SPECIAL ROLLS' && <SpecialRollsMenu menu={menu} />}
        {currentSection==='REGULAR ROLLS' && <RegularRollsMenu menu={menu} />}
        {currentSection==='SOUP & SALAD' && <SoupSaladMenu menu={menu} />}
        {currentSection==='ENTRÉES' && <EntreeMenu menu={menu} />}
        {currentSection==='SUSHI & SASHIMI' && <SushiSashimiMenu menu={menu} />}
        {currentSection==='À LA CARTE' && <ALaCarteMenu menu={menu} />}
        {currentSection==='PARTY PLATTER' && <PartyPlatterMenu menu={menu} />}
        {currentSection==='LUNCH SPECIALS' && <LunchSpecialMenu menu={menu} />}
      </div>
    </section>
  );
}
export default MenuSection;
