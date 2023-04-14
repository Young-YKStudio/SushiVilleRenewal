import axios from 'axios'
import ProductCards from "@/components/store/productCards";
import SubHeaderStore from "./subHeader";
import { useState, useEffect } from 'react'
import MenuSection from "../landing/menu";

const DummyProducts = ({data}) => {
  // console.log(data, 'at store')

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

    // category === 'Appetizer' && Sub_Category === 'Cold' && stock_availability
    // category === 'Appetizer' && Sub_Category === 'Hot' && stock_availability
    // category === 'Soup & Salad' && stock_availability
    // category === 'Kitchen Entree' && Sub_Category === 'Noodles' && stock_availability
    // category === 'Kitchen Entree' && Sub_Category === 'Fried Rice' && stock_availability
    // category === 'Kitchen Entree' && Sub_Category === 'Bento' && stock_availability
    // category === 'Kitchen Entree' && Sub_Category === 'Teriyaki' && stock_availability
    // category === 'Kitchen Entree' && Sub_Category === 'Katsu' && stock_availability
    // category === 'Kitchen Entree' && Sub_Category === 'Rice Bowl' && stock_availability
    // category === 'Special Rolls' && Sub_Cateogory === 'Fresh Rolls' && stock_availability
    // category === 'Special Rolls' && Sub_Cateogory === 'Baked Rolls' && stock_availability
    // category === 'Special Rolls' && Sub_Cateogory === 'Tempura Rolls' && stock_availability
    // category === 'Regular Rolls' && stock_availability
    // category === 'Vegatable Rolls' && stock_availability
    // category === 'Sushi & Sashimi' && Sub_Cateogory === 'Sushi Sets' && stock_availability
    // category === 'Sushi & Sashimi' && Sub_Cateogory === 'Sashimi Sets' && stock_availability
    // category === 'Sushi & Sashimi' && Sub_Cateogory === 'Sushi & Sashimi Sets' && stock_availability
    // category === 'Sushi & Sashimi' && Sub_Cateogory === 'Special Seared Sushi' && stock_availability
    // category === 'A La Carte' && Sub_Cateogory === 'Nigiri' && stock_availability
    // category === 'A La Carte' && Sub_Cateogory === 'Sashimi' && stock_availability
    // category === 'Lunch Special' && Sub_Cateogory === 'Bento Lunch' && stock_availability
    // category === 'Lunch Special' && Sub_Cateogory === 'Sushi & Sashimi Lunch' && stock_availability
    // category === 'Lunch Special' && Sub_Cateogory === 'Lunch Roll Combo' && stock_availability
    // category === 'Lunch Special' && Sub_Cateogory === 'Udon Lunch' && stock_availability
    // category === 'Party Platter' && stock_availability


  },[currentSection])

  return (
    <div className="pt-[4.75em] bg-yellow-500 flex flex-col">
      <SubHeaderStore currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <p className="font-bold text-2xl">Products</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-4">
        {currentSectionItems && currentSectionItems.map((item, i) => {
          return <div key={item.name}>
            <ProductCards item={item} id={item.name} />
          </div> 
          
        })}
        {currentSection && <p>{currentSection}</p>}
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
  if(data) {
    return {props: {data}}
  }
}

export default DummyProducts;

// call menu data
// popular items
// SubHeader
// items according to the state changes 