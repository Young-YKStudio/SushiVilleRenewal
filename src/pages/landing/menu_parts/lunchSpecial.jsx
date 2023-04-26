import { motion } from 'framer-motion'  
import { lunchRollSelections } from '../../../../data/menu';

const LunchSpecialMenu = ({menu}) => {
  return (
    <section>
      <motion.div 
        className='mt-12'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <p className='font-bold text-lime-800 text-center text-sm'>Lunch specials only offered on 12pm ~ 3pm, served with miso soup.</p>
      </motion.div>
      <motion.div 
        className='my-12'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Bento Lunch</p>
        <p className="font-normal tracking-wide text-xs text-center text-lime-800">Served with soup, salad, gyoza, and a california roll.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Lunch Special' && menus.Sub_Category === 'Bento Lunch' && menus.stock_availability) {
            return <motion.div
              key={menus._id}
              initial={{ opacity: 0.3, y: 15 }}
              whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
              viewport={{ once: false, amount: 0.8 }}
              className='shadow-lg'
            >
              {menus.image ? 
                <div>
                  <div 
                    style={menus.image && {backgroundImage: `url("${menus.image}")`}}
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg"
                  >
                    <div className="flex flex-row flex-nowrap justify-between items-center py-4 bg-black/50 px-4 rounded-b-lg">
                      <div className="text-white">
                        <p className="font-bold tracking-wide text-lg">
                          {menus.name}
                        </p>
                        {menu.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                        {menus.description && <p className="text-xs">{menus.description}</p>}
                      </div>
                      <div className="italic text-white">
                        <p>${menus.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              :
                <div
                  className="flex flex-row flex-nowrap justify-between items-center bg-black/40 w-full h-full rounded-lg text-white min-h-[15em] sm:min-h-[17em] gap-6 p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-bold tracking-wide text-lg">
                        {menus.name}
                      </p>
                      {menus.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                    </div>
                    {menus.description && <p className="text-xs">{menus.description}</p>}
                  </div>
                  <div>
                    <p>${menus.price.toFixed(2)}</p>
                  </div>
                </div>
              }
            </motion.div>
          }
        })}
      </div>

      <motion.div 
        className='my-12'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Sushi & Sashimi Lunch</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Lunch Special' && menus.Sub_Category === 'Sushi & Sashimi Lunch' && menus.stock_availability) {
            return <motion.div
              key={menus._id}
              initial={{ opacity: 0.3, y: 15 }}
              whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
              viewport={{ once: false, amount: 0.8 }}
              className='shadow-lg'
            >
              {menus.image ? 
                <div>
                  <div 
                    style={menus.image && {backgroundImage: `url("${menus.image}")`}}
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg"
                  >
                    <div className="flex flex-row flex-nowrap justify-between items-center py-4 bg-black/50 px-4 rounded-b-lg">
                      <div className="text-white">
                        <p className="font-bold tracking-wide text-lg">
                          {menus.name}
                        </p>
                        {menu.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                        {menus.description && <p className="text-xs">{menus.description}</p>}
                      </div>
                      <div className="italic text-white">
                        <p>${menus.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              :
                <div
                  className="flex flex-row flex-nowrap justify-between items-center bg-black/40 w-full h-full rounded-lg text-white min-h-[15em] sm:min-h-[17em] gap-6 p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-bold tracking-wide text-lg">
                        {menus.name}
                      </p>
                      {menus.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                    </div>
                    {menus.description && <p className="text-xs">{menus.description}</p>}
                  </div>
                  <div>
                    <p>${menus.price.toFixed(2)}</p>
                  </div>
                </div>
              }
            </motion.div>
          }
        })}
      </div>

      <motion.div 
        className='my-12'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Lunch Roll Combo</p>
      </motion.div>
      <motion.div 
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 p-4 bg-white/40 rounded-lg shadow-lg text-lime-800 text-sm mb-8'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <p className='text-lg col-span-2 sm:col-span-3 md:col-span-4 xl:col-span-6 text-center mb-3 font-bold'>Roll Selections</p>
        {lunchRollSelections.map((menu, i) => {
          return <div
            key={i}
          >
            <p>• {menu}</p>
          </div>
        })}
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Lunch Special' && menus.Sub_Category === 'Lunch Roll Combo' && menus.stock_availability) {
            return <motion.div
              key={menus._id}
              initial={{ opacity: 0.3, y: 15 }}
              whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
              viewport={{ once: false, amount: 0.8 }}
              className='shadow-lg'
            >
              {menus.image ? 
                <div>
                  <div 
                    style={menus.image && {backgroundImage: `url("${menus.image}")`}}
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg"
                  >
                    <div className="flex flex-row flex-nowrap justify-between items-center py-4 bg-black/50 px-4 rounded-b-lg">
                      <div className="text-white">
                        <p className="font-bold tracking-wide text-lg">
                          {menus.name}
                        </p>
                        {menu.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                        {menus.description && <p className="text-xs">{menus.description}</p>}
                      </div>
                      <div className="italic text-white">
                        <p>${menus.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              :
                <div
                  className="flex flex-row flex-nowrap justify-between items-center bg-black/40 w-full h-full rounded-lg text-white min-h-[15em] sm:min-h-[17em] gap-6 p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-bold tracking-wide text-lg">
                        {menus.name}
                      </p>
                      {menus.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                    </div>
                    {menus.description && <p className="text-xs">{menus.description}</p>}
                  </div>
                  <div>
                    <p>${menus.price.toFixed(2)}</p>
                  </div>
                </div>
              }
            </motion.div>
          }
        })}
      </div>

      <motion.div 
        className='my-12'
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Udon Lunch</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Lunch Special' && menus.Sub_Category === 'Udon Lunch' && menus.stock_availability) {
            return <motion.div
              key={menus._id}
              initial={{ opacity: 0.3, y: 15 }}
              whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
              viewport={{ once: false, amount: 0.8 }}
              className='shadow-lg'
            >
              {menus.image ? 
                <div>
                  <div 
                    style={menus.image && {backgroundImage: `url("${menus.image}")`}}
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg"
                  >
                    <div className="flex flex-row flex-nowrap justify-between items-center py-4 bg-black/50 px-4 rounded-b-lg">
                      <div className="text-white">
                        <p className="font-bold tracking-wide text-lg">
                          {menus.name}
                        </p>
                        {menu.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                        {menus.description && <p className="text-xs">{menus.description}</p>}
                      </div>
                      <div className="italic text-white">
                        <p>${menus.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              :
                <div
                  className="flex flex-row flex-nowrap justify-between items-center bg-black/40 w-full h-full rounded-lg text-white min-h-[15em] sm:min-h-[17em] gap-6 p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-bold tracking-wide text-lg">
                        {menus.name}
                      </p>
                      {menus.caption && <p className="text-xs">{`(${menus.caption})`}</p>}
                    </div>
                    {menus.description && <p className="text-xs">{menus.description}</p>}
                  </div>
                  <div>
                    <p>${menus.price.toFixed(2)}</p>
                  </div>
                </div>
              }
            </motion.div>
          }
        })}
      </div>
    </section>
  );
}
export default LunchSpecialMenu;