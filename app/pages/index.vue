<template>
  <div class="container mx-auto p-4">
    <div class="lg:flex lg:justify-around">
      <!-- Hero text -->
      <div class="mt-10">
        <h1 class="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl max-w-4xl">
          All in <span class="text-[#006AFF]">one</span> place count everything
          <span class="text-[#006AFF]">free</span> forever.
        </h1>
        <p
          class="font-light text-lg max-w-sm mt-5 lg:max-w-lg lg:text-xl 2xl:text-2xl"
        >
          Calculate, convert, organize and simplify your daily tasks with a
          growing collection of powerful tools.
        </p>
        <!-- Hero button -->
        <div class="mt-16 lg:max-w-xs">
          <button
            class="py-2 px-4 bg-black text-white w-full rounded-lg font-medium text-xl"
          >
            Explore
          </button>
        </div>
      </div>

      <!-- Hero boxes -->
      <div>
        <IconsHeroDesktop class="hidden lg:block" />
        <div class="flex flex-wrap justify-around mt-20 gap-4 max-w-xs mx-auto">
          <div
            class="bg-blue-400 w-fit rounded-lg px-8 py-3 text-white font-medium shadow"
          >
            <p>Financial</p>
          </div>
          <div
            class="bg-red-400 w-fit rounded-lg px-8 py-3 text-white font-medium shadow"
          >
            <p>Health</p>
          </div>
          <div
            class="bg-black w-fit rounded-lg px-8 py-3 text-white font-medium shadow"
          >
            <p>Math</p>
          </div>
        </div>
      </div>
    </div>

    <!-- What is a EverythinAPP -->
    <div class="mt-14 text-center lg:mt-20 xl:mt-32 2xl:mt-52">
      <p
        class="text-3xl font-bold max-w-5xl mx-auto lg:text-4xl xl:text-5xl 2xl:text-6xl"
      >
        EverythinApp is the center of life. Digital.
      </p>
      <div class="lg:flex lg:justify-around lg:items-center lg:mt-10">
        <p
          class="font-light text-md mt-3 max-w-lg lg:text-lg xl:text-xl 2xl:text-3xl"
        >
          It combines features that are usually scattered across different apps
          into one fast, simple, and intuitive interface.
        </p>
        <div class="max-w-lg w-full flex flex-col items-center xl:max-w-xl">
          <IconsHeroFirst
            class="max-w-md block w-full lg:max-w-lg xl:max-w-xl"
          />
          <p class="font-bold mt-3 max-w-sm text-center lg:text-lg">
            No clutter. No constant switching. Everythin' In One Place.
          </p>
        </div>
      </div>
    </div>

    <!-- Key features -->
    <div class="mt-16 lg:mt-32">
      <p class="text-3xl font-bold text-center">Key features</p>

      <div class="text-lg mt-5 lg:flex lg:gap-4 lg:text-xl lg:text-center">
        <div
          class="flex items-center justify-center bg-blue-400 p-4 rounded-sm shadow text-white font-medium flex-1 lg:h-32"
        >
          <p>Instant access to your most important tools and functions</p>
        </div>
        <div
          class="flex items-center justify-center flex-1 bg-red-400 p-4 rounded-sm shadow text-white font-medium mt-4 lg:mt-0"
        >
          <p>Seamless integration of multiple services in one dashboard</p>
        </div>
        <div
          class="flex items-center justify-center flex-1 bg-black p-4 rounded-sm shadow text-white font-medium mt-4 lg:mt-0"
        >
          <p>Central hub for managing your daily activities</p>
        </div>
      </div>
    </div>

    <!-- Build for -->
    <div class="mt-16 lg:mt-32 xl:mt-40 2xl:mt-52">
      <p class="text-3xl font-bold text-center">
        EverythinAPP is built for everyone.
      </p>

      <div class="lg:flex lg:justify-around lg:flex-row lg:items-center">
        <IconsVision class="max-w-sm w-full" />

        <div class="text-xl uppercase font-light flex flex-col gap-4">
          <p>✅ tired of switching between dozens of apps</p>
          <p>✅ wants to simplify their digital life</p>
          <p>✅ values speed, minimalism, and convenience</p>
          <p>✅ prefers having full control in one organized space</p>
        </div>
      </div>
    </div>
  </div>
</template>
