import { Link } from 'react-router-dom';

function MatchingHero () {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <div>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Finde deinen Lernpartner.</h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                        Wähle einen Bereich in dem du dich weiterentwickeln möchtest. 
                    </p>
                </div>
                <div className="py-6">
                    <form className="max-w-sm mx-auto">
                    <label for="category" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Kategorie:</label>
                    <select id="category" className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500">

                        <option>Musik</option>
                        <option>Computer</option>
                        <option>Sport</option>
                        <option>Schule</option>
                    </select>
                    <label for="sub-category" className="block mb-2 text-xl font-medium pt-4 text-gray-900 dark:text-white">Bereich:</label>
                    <select id="sub-category" className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500">

                        <option> --</option>
                        <option>Gitarre</option>
                        <option>Klavier</option>
                        <option>Blockflöte</option>
                        <option>Trompete</option>
                    </select>
                    </form>
                </div>
                <div>
                    <Link to="/matching" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800">Suche starten</Link>
                </div>
                
            </div>

        </section>
    )
}

export default MatchingHero