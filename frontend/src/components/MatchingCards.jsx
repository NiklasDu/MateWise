import { Link } from 'react-router-dom';

function MatchingCards () {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className='max-w-screen-xl mx-auto px-4 py-8'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                    {Array.from({ length: 20 }).map((_) => (
                    <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src="avatar_icon.png" alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Moritz Zimmermann</h5>
                            </a>
                            <div className='flex flex-wrap gap-2 pb-3'>
                                <p class="px-3 py-1 text-xs text-indigo-400 rounded-full dark:bg-gray-700 bg-indigo-100/60">Coding</p>
                                <p class="px-3 py-1 text-xs text-blue-400 rounded-full dark:bg-gray-700 bg-blue-100/60">Gitarre</p>
                                <p class="px-3 py-1 text-xs text-pink-400 rounded-full dark:bg-gray-700 bg-pink-100/60">Kochen</p>
                            </div>
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                                Profil anschauen
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MatchingCards