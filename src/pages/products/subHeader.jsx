import { MenuSelections } from "../../../data/menu";

const SubHeaderStore = ({currentSection, setCurrentSection}) => {

  const selectionHandler = (e, text) => {
    setCurrentSection(text)
  }

  return (
    <nav className="sticky top-[4.3em] md:top-[4.5em] z-30">
      <ul className="flex flex-row flex-wrap gap-4 bg-lime-800/90 p-8 shadow-lg text-xs justify-center">
        {MenuSelections && MenuSelections.map((category, index) => {
          return <li
            key={index}
            className={currentSection === category.category ?
              'px-3 pt-1.5 py-1 rounded-lg bg-yellow-500 text-lime-800 flex items-center tracking-wide'
              :
              'pt-1.5 py-1 rounded-lg hover:cursor-pointer text-white tracking-wide'
            }
            onClick={(e) => selectionHandler(e, category.category)}
          >
            {category.category}
          </li>
        })}
      </ul>
    </nav>
  );
}
export default SubHeaderStore;