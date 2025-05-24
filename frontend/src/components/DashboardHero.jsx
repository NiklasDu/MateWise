function DashboardHero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="relative h-[400px] bg-white dark:bg-gray-900 max-w-screen-xl mx-auto">
        <div class="absolute inset-0">
          <img
            src="welcome_pic.jpg"
            alt="Background Image"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
          <h1 class="text-5xl font-bold leading-tight mb-4">
            Willkommen zurück,
          </h1>
          <h class="text-5xl font-bold leading-tight mb-4">Daniel</h>
        </div>
      </div>
    </section>
  );
}

export default DashboardHero;
