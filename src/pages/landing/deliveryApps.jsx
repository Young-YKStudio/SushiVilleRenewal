import { motion } from 'framer-motion'

const DeliveryApps = () => {
  return (
    <motion.section 
      className="flex flex-col h-72 justify-center p-8 py-24"
      initial={{ opacity: 0.3, y: 15 }}
      whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }}
      viewport={{ once: false, amount: 0.8 }}
    >
      <div
        className="flex justify-center border-b border-lime-800 mb-8"
      >
        <p className="tracking-tight font-bold text-lime-800 text-2xl pb-2">We also offer deliveries with apps.</p>
      </div>
      <div className="flex flex-row gap-8 md:gap-24 items-center justify-center">
        <a 
          target='_blank'
          href='https://www.ubereats.com/store/sushi-ville/mKWTjH-SVjSSGVSNwK3KMw?utm_source=google&utm_medium=organic&utm_campaign=place-action-link'
        >
          <img src='https://ucarecdn.com/16224802-33e8-4458-8a5d-9e1cc3aae292/Uber_Eats_app_icon_2022.webp' alt='Uber Eats'
            className="max-w-[100px] saturate-0 hover:saturate-100"
          />
        </a>
        <a 
          target="_blank"
          href='https://www.grubhub.com/restaurant/sushiville-67-orange-turnpike-sloatsburg/3061762?utm_source=google&utm_medium=organic&utm_campaign=place-action-link'
        >
          <img src='https://ucarecdn.com/3a64bb10-342d-42a7-ac3c-0923ca2c707e/grubHubLogo.png' alt='Grubhub' 
            className="max-w-[150px] saturate-0 hover:saturate-100"
          />
        </a>
        <a 
          target='_blank'
          href='https://www.doordash.com/store/sushiville-sloatsburg-2571701/?utm_campaign=gpa'
        >
          <img src='https://ucarecdn.com/5ef6407d-4e03-4efb-9406-fc4c5f3c43e4/doorDashLogo.png' alt='Doordash' 
            className="max-w-[100px] saturate-0 hover:saturate-100"
          />
        </a>
      </div>
    </motion.section>
  );
}
export default DeliveryApps;