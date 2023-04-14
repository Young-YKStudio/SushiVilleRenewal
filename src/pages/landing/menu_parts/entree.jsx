import { motion } from 'framer-motion'

const EntreeMenu = ({menu}) => {
  return (
    <section>
      <motion.p 
        className="font-bold tracking-wide text-2xl text-center text-lime-800 my-12"
        initial={{ opacity: 0.3, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
        viewport={{ once: false, amount: 0.8 }}
      >Noodles</motion.p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Kitchen Entree' && menus.Sub_Category === 'Noodles' && menus.stock_availability) {
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
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg hover:bg-[length:110%]"
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
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Fried Rice</p>
        <p className="font-normal tracking-wide text-xs text-center text-lime-800">Served with miso soup</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Kitchen Entree' && menus.Sub_Category === 'Fried Rice' && menus.stock_availability) {
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
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg hover:bg-[length:110%]"
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
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Bento</p>
        <p className="font-normal tracking-wide text-xs text-center text-lime-800">Seved with soup, salad, mixed tempura, califormia roll</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Kitchen Entree' && menus.Sub_Category === 'Bento' && menus.stock_availability) {
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
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg hover:bg-[length:110%]"
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
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Teriyaki</p>
        <p className="font-normal tracking-wide text-xs text-center text-lime-800">Seved with soup, salad, vegetable, and rice</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Kitchen Entree' && menus.Sub_Category === 'Teriyaki' && menus.stock_availability) {
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
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg hover:bg-[length:110%]"
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
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Katsu</p>
        <p className="font-normal tracking-wide text-xs text-center text-lime-800">Seved with soup, salad, vegetable, and rice</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Kitchen Entree' && menus.Sub_Category === 'Katsu' && menus.stock_availability) {
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
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg hover:bg-[length:110%]"
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
        <p className="font-bold tracking-wide text-2xl text-center text-lime-800">Rice Bowl</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menu && menu.map((menus) => {
          if(menus.category === 'Kitchen Entree' && menus.Sub_Category === 'Rice Bowl' && menus.stock_availability) {
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
                    className="flex flex-col flex-nowrap justify-end bg-cover bg-center min-h-[15em] sm:min-h-[17em] hover:bg-black/0 rounded-lg hover:bg-[length:110%]"
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
export default EntreeMenu;