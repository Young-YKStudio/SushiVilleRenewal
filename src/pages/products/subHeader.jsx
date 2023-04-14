import { MenuSelections } from "../../../data/menu";

const SubHeaderStore = ({currentSection, setCurrentSection}) => {

  const selectionHandler = (e, text) => {
    setCurrentSection(text)
  }

  return (
    <nav>
      <ul className="flex flex-row flex-wrap gap-4 bg-lime-800 sticky top-[4.75em] p-8 shadow-lg">
        {MenuSelections && MenuSelections.map((category, index) => {
          return <li
            key={index}
            className={currentSection === category.category ?
              'px-4 pt-1.5 py-1 rounded-lg bg-yellow-500 text-lime-800 flex items-center border border-yellow-500 tracking-wide'
              :
              'px-4 pt-1.5 py-1 rounded-lg border border-white hover:cursor-pointer text-white tracking-wide'
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