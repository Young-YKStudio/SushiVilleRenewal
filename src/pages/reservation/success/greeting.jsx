import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { motion } from 'framer-motion'

const GreetingSection = () => {
  return (
    <section className='md:w-1/2 w-full flex flex-col items-center justify-center'>
      <motion.p
        animate={{
          scale: [1, 2, 2, 2, 2],
          rotate: [0, 0, 360, 360, 0],
          duration: '2s'
        }}
        
        viewport={{ once: true }}
        className='text-lime-800'
      >
        <MdOutlineCheckCircleOutline className='w-24 h-24' />
      </motion.p>
      <p className='mt-16 text-lime-800 font-bold text-3xl'>Successfully requested!</p>
    </section>
  );
}
export default GreetingSection;