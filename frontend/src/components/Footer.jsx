import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="logo.png" class="h-8" alt="MateWise Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MateWise</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="/" className="hover:underline me-4 md:me-6">Startseite</Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="hover:underline me-4 md:me-6">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/matching" className="hover:underline me-4 md:me-6">Lernpartner finden</Link>
                        </li>
                        <li>
                            <Link to="/" className="hover:underline">Anmelden</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" class="hover:underline">MateWise</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer;