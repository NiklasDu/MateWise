function Hero() {
    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Lernen.Tauschen.Wachsen.</h1>
                <p class="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Finde einen Lernpartner und tauscht eure Fähigkeiten gegenseitig aus.
                </p>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Tausche 30 Minuten Klavier lernen gegen 30 Minuten Tanzen beibringen.
                </p>
                <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Jetzt Anmelden
                    </a>  
                </div>
                <div class="px-6">
                    <img src="hero_picture.jpg" alt="People Learning" class="w-full max-w-xl mx-auto rounded-lg shadow-lg object-cover" />
                </div>
            </div>
        </section>
    )
}

export default Hero;