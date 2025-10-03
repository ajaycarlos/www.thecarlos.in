// ========================
// 1️⃣ Knowledge Bits Array (FULLY UPDATED STRUCTURE)
const knowledgeBits = [
  // 1-20 AI & Tech
  {
    fact: "AI can generate realistic images, text, and music from prompts.",
    explanation: "This is powered by generative models like GANs and Transformers. They learn patterns from vast datasets to create new, original content that mimics human creativity."
  },
  {
    fact: "Quantum computing could solve problems classical computers can’t.",
    explanation: "Unlike classical bits (0 or 1), quantum bits or 'qubits' can be both 0 and 1 simultaneously. This allows them to process a massive number of possibilities at once, ideal for complex simulations."
  },
  {
    fact: "AI can predict protein folding in seconds.",
    explanation: "Projects like DeepMind's AlphaFold have solved this long-standing biological challenge. Predicting a protein's 3D shape is crucial for understanding diseases and developing new drugs."
  },
  {
    fact: "Robots are learning to paint, cook, and dance.",
    explanation: "Through a process called reinforcement learning, robots can learn complex physical tasks by trial and error, getting 'rewards' for actions that bring them closer to their goal."
  },
  {
    fact: "AI can detect deepfakes with high accuracy.",
    explanation: "Researchers train AI models to spot tiny, invisible inconsistencies in deepfake videos, such as unnatural blinking patterns or subtle artifacts, to distinguish them from real footage."
  },
  {
    fact: "Voice assistants can recognize emotions.",
    explanation: "By analyzing tones, pitch, and speech patterns, some advanced AI can infer the emotional state of the speaker, allowing for more empathetic and context-aware interactions."
  },
  {
    fact: "AI can write code faster than junior developers.",
    explanation: "AI coding assistants like GitHub Copilot can suggest entire blocks of code in real-time, drastically speeding up development, especially for repetitive or boilerplate tasks."
  },
  {
    fact: "Self-driving cars rely on LIDAR, radar, and AI vision.",
    explanation: "These systems create a 360-degree map of the car's surroundings. LIDAR uses lasers, radar uses radio waves, and cameras provide visual data, all fused by an AI 'brain' to navigate."
  },
  {
    fact: "AI art challenges global copyright laws.",
    explanation: "A major legal question is whether an AI can be an 'author'. Currently, most jurisdictions require a human author for copyright protection, leaving the ownership of AI-generated art in a gray area."
  },
  {
    fact: "Some chatbots pass basic law or medical exams.",
    explanation: "Large Language Models (LLMs) trained on vast text databases have demonstrated the ability to pass standardized tests, showing their powerful grasp of complex information."
  },
  {
    fact: "Facial recognition AI can identify crowds instantly.",
    explanation: "These systems map facial features to a numerical code (a 'faceprint') and compare it against a database of known faces, allowing for rapid identification even in large groups."
  },
  {
    fact: "Neural networks can outperform humans in image recognition.",
    explanation: "Inspired by the human brain, these networks use layers of 'neurons' to identify patterns. After training on millions of images, they can often spot details and objects more accurately than people."
  },
  {
    fact: "AI is being used to predict epidemics and natural disasters.",
    explanation: "By analyzing data from social media, news reports, and climate sensors, AI can identify early warning signs of disease outbreaks or extreme weather events before they become critical."
  },
  {
    fact: "Virtual reality makes online learning immersive.",
    explanation: "VR allows students to perform virtual surgeries, explore historical sites, or visualize complex molecules as if they were there, leading to better retention and understanding."
  },
  {
    fact: "AR overlays 3D data onto the real world in real-time.",
    explanation: "Augmented Reality (AR) enhances your view of the real world, unlike VR which replaces it. Think of it as a digital layer for reality, used in apps like Pokémon GO or for furniture placement."
  },
  {
    fact: "AI can now compose music indistinguishable from humans.",
    explanation: "Models are trained on thousands of hours of music to learn the rules of harmony, melody, and rhythm, allowing them to generate new, convincing pieces in any style."
  },
  {
    fact: "AI translation systems require almost no human supervision.",
    explanation: "Modern Neural Machine Translation (NMT) models look at the context of the entire sentence, rather than just word-for-word, resulting in much more fluid and accurate translations."
  },
  {
    fact: "Some AI models can generate functional software code.",
    explanation: "By training on vast repositories of open-source code like GitHub, these models learn the syntax and logic of programming, enabling them to write scripts and functions from a simple text prompt."
  },
  {
    fact: "Generative AI can simulate 3D worlds from text.",
    explanation: "Emerging technologies can take a descriptive sentence like 'a futuristic city at sunset' and generate a fully explorable 3D environment, a potential game-changer for gaming and film."
  },
  {
    fact: "AI-driven recommendation engines shape our digital choices.",
    explanation: "Platforms like Netflix, Spotify, and Amazon use AI to analyze your past behavior and predict what you'll like next, influencing everything from what you watch to what you buy."
  },

  // 21-40 Computers & Phones
  {
    fact: "The first hard drive stored just 5MB of data.",
    explanation: "Introduced by IBM in 1956, the RAMAC 305 system weighed over a ton and was the size of two refrigerators. Today, 5MB is about the size of one high-quality photo."
  },
  {
    fact: "Modern smartphones are millions of times more powerful than Apollo 11 computers.",
    explanation: "The Apollo Guidance Computer got us to the moon with about 64KB of RAM. A modern smartphone has gigabytes of RAM and processing power that was unimaginable in the 1960s."
  },
  {
    fact: "The fastest supercomputer performs quadrillions of calculations per second.",
    explanation: "These machines, measured in 'petaflops', are used for incredibly complex simulations like climate modeling, nuclear research, and drug discovery that would take centuries on a regular PC."
  },
  {
    fact: "Blockchain secures data without a central server.",
    explanation: "It's a decentralized, distributed ledger. Each 'block' of data is cryptographically linked to the previous one, creating a chain that is extremely difficult to alter without being detected."
  },
  {
    fact: "Google indexes over 130 trillion web pages.",
    explanation: "This massive index is constantly being updated by 'spiders' that crawl the web. It's so large that if it were printed, it would form a stack of paper thousands of miles high."
  },
  {
    fact: "Wi-Fi was invented while detecting black holes.",
    explanation: "In the 1990s, Australian radio-astronomers developed a method to reduce noise in their signals from space. This same technique became the foundation for modern high-speed Wi-Fi."
  },
  {
    fact: "Smartphones detect your movement and orientation.",
    explanation: "This is done using an accelerometer (measures movement), a gyroscope (measures rotation), and a magnetometer (acts as a compass). These sensors allow for features like screen rotation and fitness tracking."
  },
  {
    fact: "Some laptops are thinner than a pencil.",
    explanation: "Advancements in processor efficiency (less heat), solid-state storage (no moving parts), and materials science have allowed for the creation of ultra-thin yet powerful laptops."
  },
  {
    fact: "There are computers smaller than a grain of rice.",
    explanation: "These micro-computers are designed for specialized tasks, often in the medical field, where they can be implanted to monitor bodily functions or in IoT devices for sensing."
  },
  {
    fact: "Quantum encryption promises unhackable communication.",
    explanation: "It uses the principles of quantum mechanics. The act of a third party trying to intercept and measure the data would inherently alter it, immediately alerting the sender and receiver to a breach."
  },
  {
    fact: "Apple built the first personal computer with a GUI.",
    explanation: "While Xerox PARC invented the Graphical User Interface (GUI), the Apple Lisa (1983) and later the Macintosh (1984) were the first commercially successful personal computers to popularize it."
  },
  {
    fact: "Some GPUs perform over 50 teraflops of calculations.",
    explanation: "A 'teraflop' is one trillion floating-point operations per second. Modern Graphics Processing Units (GPUs) are massively parallel, making them ideal for AI, scientific computing, and gaming."
  },
  {
    fact: "The first mobile phone weighed over 1 kg.",
    explanation: "The Motorola DynaTAC 8000X, released in 1983, was nicknamed 'the brick'. It offered 30 minutes of talk time and cost nearly $4,000 USD at the time."
  },
  {
    fact: "Modern processors have over 10 billion transistors.",
    explanation: "A transistor is a tiny switch. The more you can fit on a chip, the faster it can compute. Moore's Law has driven this exponential growth for decades."
  },
  {
    fact: "The world’s first website is still online.",
    explanation: "Created by Tim Berners-Lee at CERN in 1991, the site explains the basics of the World Wide Web. It's preserved online as a historical artifact."
  },
  {
    fact: "Some phones use under-display cameras.",
    explanation: "This technology places the camera behind the screen's pixels. The pixels in that area can become temporarily transparent to allow light to pass through to the camera sensor."
  },
  {
    fact: "OLED screens can turn off pixels individually.",
    explanation: "Unlike LCDs which have a constant backlight, each pixel in an Organic Light-Emitting Diode (OLED) screen is its own light source. This allows for 'true black' and infinite contrast."
  },
  {
    fact: "Edge computing reduces latency for AI processing.",
    explanation: "Instead of sending data to a distant cloud server, edge computing processes it locally on the device itself. This is faster and more private, crucial for things like self-driving cars."
  },
  {
    fact: "Some phones charge over 100W for 100% in 20 minutes.",
    explanation: "This is achieved through advanced battery chemistry, multiple battery cells, and sophisticated charging protocols that manage heat and voltage to deliver power safely and quickly."
  },
  {
    fact: "Supercomputers simulate weather with stunning accuracy.",
    explanation: "They divide the atmosphere into a 3D grid and use complex physics equations to calculate how conditions in each cell will change over time, enabling modern forecasting."
  },

  // 41-60 Science
  {
    fact: "Water can boil and freeze at the same time under special conditions.",
    explanation: "This occurs at the 'triple point', a specific temperature and pressure (0.01°C and 0.006 atm) where the solid, liquid, and gas phases of a substance can coexist in equilibrium."
  },
  {
    fact: "The Sun’s core is hotter than its surface by millions of degrees.",
    explanation: "The core reaches about 15 million °C due to immense pressure causing nuclear fusion. The surface, or photosphere, is a much cooler 5,500 °C."
  },
  {
    fact: "Lightning is five times hotter than the Sun’s surface.",
    explanation: "A lightning bolt can heat the air it passes through to 30,000 °C, which is significantly hotter than the Sun's surface temperature of around 5,500 °C."
  },
  {
    fact: "There’s a biologically immortal jellyfish species.",
    explanation: "The Turritopsis dohrnii can revert its cells back to their earliest form and grow anew after reaching maturity, effectively bypassing death from old age."
  },
  {
    fact: "Venus has a day longer than its year.",
    explanation: "Venus rotates on its axis extremely slowly, taking 243 Earth days to complete one rotation. It only takes 225 Earth days to orbit the Sun."
  },
  {
    fact: "Neutron stars are so dense a teaspoon weighs billions of tons.",
    explanation: "They are the collapsed cores of massive stars. Gravity crushes the star so tightly that protons and electrons combine to form neutrons, packing immense mass into a tiny volume."
  },
  {
    fact: "Exoplanets can rain molten glass sideways.",
    explanation: "On a planet named HD 189733b, silicate particles in the atmosphere condense into glass. Fierce winds of over 8,000 km/h then whip this molten glass sideways."
  },
  {
    fact: "Black holes bend time and light.",
    explanation: "This is a key prediction of Einstein's theory of general relativity. The immense gravity of a black hole warps the fabric of spacetime around it, causing both light and time to follow a curved path."
  },
  {
    fact: "There are more stars than grains of sand on Earth.",
    explanation: "While it's an estimate, scientists calculate there are roughly a sextillion (10^21) stars in the observable universe, far exceeding the estimated number of sand grains on all the world's beaches and deserts."
  },
  {
    fact: "Some comets contain organic compounds.",
    explanation: "Missions like Rosetta have found amino acids, the building blocks of proteins, on comets. This supports the theory that comets may have delivered essential ingredients for life to early Earth."
  },
  {
    fact: "The speed of light is about 299,792 km/s.",
    explanation: "This is the ultimate speed limit in the universe. Nothing with mass can reach it, and it's the speed at which all massless particles, like photons, travel in a vacuum."
  },
  {
    fact: "DNA stores information like a biological hard drive.",
    explanation: "The sequence of four bases (A, C, G, T) in a DNA molecule acts as a code that stores the instructions for building and operating a living organism."
  },
  {
    fact: "CRISPR allows precise genome editing.",
    explanation: "CRISPR-Cas9 is a technology that acts like a pair of 'molecular scissors', allowing scientists to cut, remove, and replace specific sections of DNA with high accuracy."
  },
  {
    fact: "The first microscope magnified objects 30x.",
    explanation: "Invented around 1600, early microscopes opened up a new world of microorganisms. Modern electron microscopes can magnify objects over a million times."
  },
  {
    fact: "The human genome has about 3 billion base pairs.",
    explanation: "These pairs of nucleotide bases (A-T and C-G) form the rungs of our DNA ladder. If printed out, the sequence would fill a stack of books 200 feet high."
  },
  {
    fact: "Antibiotics are becoming less effective due to resistance.",
    explanation: "Bacteria can evolve to survive antibiotics. Overuse and misuse of these drugs accelerate the development of these 'superbugs', posing a major threat to global health."
  },
  {
    fact: "The Earth rotates once every 24 hours.",
    explanation: "More precisely, a sidereal day (one rotation relative to the stars) is 23 hours, 56 minutes. The 24-hour solar day is slightly longer due to Earth's orbit around the Sun."
  },
  {
    fact: "Sound travels faster in water than air.",
    explanation: "Sound is a vibration that travels through a medium. Because the molecules in water are packed much more closely together than in air, the vibration can pass between them more quickly."
  },
  {
    fact: "Some volcanoes shoot ash over 50 km high.",
    explanation: "These are called Plinian eruptions, the most powerful type. The force is so great that the ash and gas can punch through the troposphere and into the stratosphere."
  },
  {
    fact: "Gravity bends light in space.",
    explanation: "This phenomenon, called gravitational lensing, was predicted by Einstein. The gravity of a massive object, like a galaxy, can act like a lens, bending and magnifying the light from objects behind it."
  },

  // 61-80 Universe & Space
  {
    fact: "Saturn’s rings are made of ice and rock chunks.",
    explanation: "The rings are not solid. They consist of billions of particles, ranging from dust-sized grains to chunks as large as a house, mostly made of water ice."
  },
  {
    fact: "Mars has the largest volcano in the solar system.",
    explanation: "Olympus Mons is a shield volcano nearly three times the height of Mount Everest and about the size of the state of Arizona. Its immense size is due to Mars's lower gravity and lack of tectonic plate movement."
  },
  {
    fact: "Jupiter has the shortest day at about 10 hours.",
    explanation: "Despite being the largest planet, Jupiter is the fastest spinning. This rapid rotation causes the planet to bulge at its equator and contributes to its turbulent weather patterns."
  },
  {
    fact: "Some rogue planets float without a star.",
    explanation: "These are 'orphan' planets that have been ejected from their original solar systems. They travel through interstellar space alone, not gravitationally bound to any star."
  },
  {
    fact: "Hubble observes galaxies billions of light-years away.",
    explanation: "Because light takes time to travel, looking at a galaxy 10 billion light-years away means we are seeing it as it was 10 billion years ago, giving us a glimpse into the early universe."
  },
  {
    fact: "Parker Solar Probe moves at 700,000 km/h.",
    explanation: "By using Venus's gravity to slingshot itself closer to the Sun, this probe has become the fastest object ever built by humans, allowing it to study the Sun's corona up close."
  },
  {
    fact: "Stars eventually become white dwarfs or black dwarfs.",
    explanation: "A sun-like star will eventually shed its outer layers and its core will collapse into a dense, hot white dwarf. Over trillions of years, it will cool down into a theoretical, non-emitting black dwarf."
  },
  {
    fact: "The largest known star is over 1,700 times wider than the Sun.",
    explanation: "Red hypergiants like UY Scuti are so enormous that if one were placed at the center of our solar system, its surface would extend out past the orbit of Jupiter."
  },
  {
    fact: "Neutrinos pass through Earth without interacting.",
    explanation: "These subatomic particles have almost no mass and no electric charge, meaning they rarely interact with other matter. Trillions of them pass through your body every second."
  },
  {
    fact: "Some planets rain diamonds.",
    explanation: "Deep within the atmospheres of ice giants like Neptune and Uranus, intense pressure and temperature can squeeze carbon atoms together, forming solid diamonds that rain down toward the core."
  },
  {
    fact: "A light-year is the distance light travels in one year.",
    explanation: "It's a measure of distance, not time. It's equivalent to about 9.46 trillion kilometers (5.88 trillion miles), used to measure the vast distances between stars and galaxies."
  },
  {
    fact: "The Milky Way has over 100 billion stars.",
    explanation: "Our home galaxy is a barred spiral galaxy, and estimates for the number of stars range from 100 billion to 400 billion. Our Sun is just one of them."
  },
  {
    fact: "Exoplanets are planets outside our solar system.",
    explanation: "Thousands of exoplanets have been discovered, orbiting other stars. Scientists study them to understand planetary formation and to search for signs of life beyond Earth."
  },
  {
    fact: "The Moon causes tides on Earth.",
    explanation: "The Moon's gravitational pull creates a 'bulge' in the Earth's oceans on both the side closest to it and the side farthest from it. As the Earth rotates, land moves through these bulges, causing high and low tides."
  },
  {
    fact: "Some asteroids contain precious metals.",
  
