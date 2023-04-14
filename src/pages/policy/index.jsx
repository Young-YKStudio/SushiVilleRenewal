import { ConditionsOfUse, PrivacyPolicy, Disclaimer } from "../../../data/termsOfConditions";

const PolicyAgreement = () => {
  return (
    <section
      className="pt-24 bg-yellow-500 text-slate-800 flex flex-row justify-center"
    >
      <div className="flex flex-col gap-4 px-12 max-w-[1080px]">
        <p className="text-3xl font-bold text-lime-800">Terms of Conditions</p>
        {/* Conditions */}
        <div>
          <div>
            <div className="border-b border-lime-800 mb-4">
              <p className="text-2xl text-lime-800">{ConditionsOfUse.name}</p>
            </div>
            <div className="pl-4 flex flex-col gap-4">
              {ConditionsOfUse.list.map((list) => {
                return <div
                  key={list.name}
                >
                  <p className="text-lg font-bold">{list.name}</p>
                  <p>{list.text}</p>
                </div>
              })}
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <div className="border-b border-lime-800 mb-4">
            <p className="text-2xl text-lime-800">Privacy Policy</p>
          </div>

          <div>
            <div className="pl-4 flex flex-col gap-4 mb-4">
              {PrivacyPolicy.introduction.map((intro) => {
                return <div
                  key={intro.id}
                >
                  <p>{intro.text}</p>
                </div>
              })}
            </div>

            <div className="pl-4 flex flex-col gap-4 mb-4">
              <p className="text-lg font-bold">{PrivacyPolicy.infoCollect.intro.title}</p>
              <p>{PrivacyPolicy.infoCollect.intro.text}</p>
              <ol className="flex flex-col gap-4">
                {PrivacyPolicy.infoCollect.text.map((list, index) => {
                  return <div
                    key={list.title}
                    className="flex flex-col"
                  >
                    <li  className="text-lg font-bold text-lime-800">{index +1}. {list.title}</li>
                    <p>{list.text}</p>
                  </div>
                })}
              </ol>
            </div>

            <div className="pl-4 flex flex-col gap-4 mb-4">
              <p className="text-lg font-bold">{PrivacyPolicy.howWeUse.intro.title}</p>
              <p>{PrivacyPolicy.howWeUse.intro.text}</p>
              <ul className="flex flex-col gap-4">
                {PrivacyPolicy.howWeUse.list.map((list) => {
                  return <li
                    key={list.id}
                    className="pl-4"
                  >
                    • {list.text}
                  </li>
                })}
              </ul>
              <p>{PrivacyPolicy.howWeUse.outro.text}</p>
            </div>

            <div className="pl-4 flex flex-col gap-4 mb-4">
              <p className="text-lg font-bold">{PrivacyPolicy.howWeProtect.intro.title}</p>
              <p>{PrivacyPolicy.howWeProtect.intro.text}</p>
            </div>

            <div className="pl-4 flex flex-col gap-4 mb-4">
              <p className="text-lg font-bold">{PrivacyPolicy.importantNotice.intro.title}</p>
              <p>{PrivacyPolicy.importantNotice.intro.text}</p>
            </div>

            <div className="pl-4 flex flex-col gap-4 mb-4">
              <p className="text-lg font-bold">{PrivacyPolicy.children.intro.title}</p>
              <p>{PrivacyPolicy.children.intro.text}</p>
            </div>

            <div className="pl-4 flex flex-col gap-4 mb-4">
              <p className="text-lg font-bold">{PrivacyPolicy.changesToThis.intro.title}</p>
              <p>{PrivacyPolicy.changesToThis.intro.text}</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-4">
          <p className="border-b border-lime-800 mb-4 text-2xl text-lime-800">Disclaimer</p>
          <p className="pl-4">{Disclaimer.text}</p>
        </div>
      </div>
    </section>
  );
}
export default PolicyAgreement;