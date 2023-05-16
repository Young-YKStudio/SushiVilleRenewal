import axios from 'axios'
import ProductCards from "@/components/store/productCards";
import SubHeaderStore from "./subHeader";
import { useState, useEffect } from 'react'
import MenuSection from "../landing/menu";
import { lunchRollSelections } from '../../../data/menu';

const DummyProducts = ({data}) => {

  const [ currentSection, setCurrentSection ] = useState('APPETIZER')
  const [ currentSectionItems, setCurrentSectionItems ] = useState();

  useEffect(() => {
    let isMounted = true
    let tempArry = []
    setCurrentSectionItems(tempArry)

    // loop all menu to find the conditions
    const settingArrays = () => {
      if(isMounted && data) {
        data.map(async (menu) => {
          if(currentSection === 'APPETIZER' && menu.category === 'Appetizer' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'SOUP & SALAD' && menu.category === 'Soup & Salad' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'ENTRÉES' && menu.category === 'Kitchen Entree' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'SPECIAL ROLLS' && menu.category === 'Special Rolls' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'REGULAR ROLLS' && menu.category === 'Regular Rolls' | menu.category === 'Vegetable Rolls' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'SUSHI & SASHIMI' && menu.category === 'Sushi & Sashimi' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'À LA CARTE' && menu.category === 'A La Carte' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'LUNCH SPECIALS' && menu.category === 'Lunch Special' && menu.stock_availability) {
            await tempArry.push(menu)
          }
          if(currentSection === 'PARTY PLATTER' && menu.category === 'Party Platter' && menu.stock_availability) {
            await tempArry.push(menu)
          }
        })
      }
    }

    settingArrays()
    return () => {
      setCurrentSectionItems(tempArry)
      isMounted = false
    }

  },[currentSection])

  return (
    <div className="pt-[4.5em] pb-8 bg-yellow-500 flex flex-col">
      <SubHeaderStore currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <div className='px-8 pt-8'>
        <div className='pt-4'>
          <p className="font-bold text-3xl text-lime-800 tracking-wide">{currentSection}</p>
        </div>

        {/* APPETIZER */}
        {currentSection === 'APPETIZER' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Cold Appetizers</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Appetizer' && item.Sub_Category === 'Cold' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Hot Appetizers</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Appetizer' && item.Sub_Category === 'Hot' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* SOUP & SALAD */}
        {currentSection === 'SOUP & SALAD' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Soup & Salad' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* ENTRÉES */}
        {currentSection === 'ENTRÉES' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Noodles</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Kitchen Entree' && item.Sub_Category === 'Noodles' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Fried Rice</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Kitchen Entree' && item.Sub_Category === 'Fried Rice' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Bento</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Kitchen Entree' && item.Sub_Category === 'Bento' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Teriyaki</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Kitchen Entree' && item.Sub_Category === 'Teriyaki' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Katsu</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Kitchen Entree' && item.Sub_Category === 'Katsu' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Rice Bowl</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Kitchen Entree' && item.Sub_Category === 'Rice Bowl' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* SPECIAL ROLLS */}
        {currentSection === 'SPECIAL ROLLS' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Fresh Rolls</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Special Rolls' && item.Sub_Category === 'Fresh Rolls' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Baked Rolls</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Special Rolls' && item.Sub_Category === 'Baked Rolls' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Tempura Rolls</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Special Rolls' && item.Sub_Category === 'Tempura Rolls' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* REGULAR ROLLS */}
        {currentSection === 'REGULAR ROLLS' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Regular Rolls</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Regular Rolls' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Vegetable Rolls</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Vegetable Rolls' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* SUSHI & SASHIMI */}
        {currentSection === 'SUSHI & SASHIMI' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Sushi Sets</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Sushi & Sashimi' && item.Sub_Category === 'Sushi Sets' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Sashimi Sets</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Sushi & Sashimi' && item.Sub_Category === 'Sashimi Sets' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Sushi & Sashimi Sets</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Sushi & Sashimi' && item.Sub_Category === 'Sushi & Sashimi Sets' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Special Seared Sushi</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Sushi & Sashimi' && item.Sub_Category === 'Special Seared Sushi' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* À LA CARTE */}
        {currentSection === 'À LA CARTE' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Nigiri <span className='text-xs font-normal'>Sushi, professionally prepared ingredients over rice</span></p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'A La Carte' && item.Sub_Category === 'Nigiri' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Sashimi <span className='text-xs font-normal'>Professionally prepared ingredients</span></p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'A La Carte' && item.Sub_Category === 'Sashimi' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* PARTY PLATTER */}
        {currentSection === 'PARTY PLATTER' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Party Platter' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }

        {/* LUNCH SPECIALS */}
        {currentSection === 'LUNCH SPECIALS' &&
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4'>
            <p className='sm:col-span-2 md:col-span-3 lg:col-span-4 text-sm text-lime-800 font-bold'>Lunch specials only offered on 12pm ~ 3pm, served with miso soup.</p>
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Bento Lunch <span className='text-xs font-normal'>Served with soup, salad, gyoza, and a california roll.</span></p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Lunch Special' && item.Sub_Category === 'Bento Lunch' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Sushi & Sashimi Lunch</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Lunch Special' && item.Sub_Category === 'Sushi & Sashimi Lunch' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Lunch Roll Combo</p>
            </div>
            <div 
              className='sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 p-4 bg-white/40 rounded-lg shadow-lg text-lime-800 text-sm'
            >
              <p className='text-lg col-span-2 sm:col-span-3 md:col-span-4 xl:col-span-6 text-center mb-3 font-bold'>Roll Selections</p>
              {lunchRollSelections.map((menu, i) => {
                return <div
                  key={i}
                >
                  <p>• {menu}</p>
                </div>
              })}
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Lunch Special' && item.Sub_Category === 'Lunch Roll Combo' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
            <div className='sm:col-span-2 md:col-span-3 lg:col-span-4 border-b border-lime-800 pb-2'>
              <p className='text-lime-800 font-bold text-2xl tracking-wide'>Udon Lunch</p>
            </div>
            {currentSectionItems && currentSectionItems.map((item) => {
              if(item.category === 'Lunch Special' && item.Sub_Category === 'Udon Lunch' && item.stock_availability) {
                return <div
                  key={item.name}
                  className='aspect-w-3 aspect-h-2 sm:aspect-1'
                >
                  <ProductCards item={item} id={item.naem} />
                </div>
              }
            })}
          </div>
        }
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // call API to get products
  let data = null
  const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
  if(request.data.success) {
    data = request.data.menu
  }
  return {props: {data}}
}

export default DummyProducts;
