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
    explanation: "Asteroids are remnants from the formation of the solar system. Some are rich in metals like iron, nickel, gold, and platinum, leading to the concept of future asteroid mining."
  },
  {
    fact: "Comets have tails that always point away from the Sun.",
    explanation: "A comet has two main tails: a dust tail (pushed by sunlight pressure) and an ion tail (pushed by the solar wind). Both forces always push directly away from the Sun, regardless of the comet's direction of travel."
  },
  {
    fact: "Black holes can evaporate over time (Hawking radiation).",
    explanation: "Stephen Hawking proposed that due to quantum effects near the event horizon, black holes are not completely black but slowly emit radiation, causing them to lose mass and eventually evaporate over immense timescales."
  },
  {
    fact: "Some stars explode as supernovae.",
    explanation: "This happens to massive stars at the end of their lives. The explosion is so bright it can briefly outshine its entire galaxy and is responsible for creating and distributing heavy elements like gold and iron across the universe."
  },
  {
    fact: "The universe is about 13.8 billion years old.",
    explanation: "This age is calculated by measuring the rate of the universe's expansion (the Hubble Constant) and tracing it back to the Big Bang."
  },
  {
    fact: "Dark matter makes up most of the universe's mass.",
    explanation: "It's a mysterious substance that doesn't emit or reflect light, but its gravitational effects are observed in the rotation of galaxies and the structure of the cosmos. It makes up about 27% of the universe."
  },

  // 81-100 Aliens & Mysteries
  {
    fact: "Scientists listen to exoplanets for alien signals.",
    explanation: "Projects like SETI (Search for Extraterrestrial Intelligence) use powerful radio telescopes to scan distant star systems for artificial, non-random signals that could indicate intelligent life."
  },
  {
    fact: "Unexplained fast radio bursts repeat every few days.",
    explanation: "These are intense, millisecond-long bursts of radio waves from deep space. While some are one-off events, others repeat, and their origin is one of the biggest mysteries in astronomy."
  },
  {
    fact: "Meteorites can contain amino acids.",
    explanation: "The discovery of these 'building blocks of life' in meteorites suggests that the essential ingredients for life could have been delivered to a young Earth from space."
  },
  {
    fact: "Some desert stones move mysteriously over years.",
    explanation: "At Racetrack Playa in Death Valley, rocks leave long trails behind them. This was recently explained by a rare combination of conditions: thin ice sheets forming overnight that are then pushed by light winds, dragging the rocks along."
  },
  {
    fact: "Deep-sea creatures glow like aliens.",
    explanation: "This is called bioluminescence, a chemical reaction that produces light. In the darkness of the deep ocean, it's used for attracting prey, deterring predators, and communication."
  },
  {
    fact: "The Bermuda Triangle’s phenomena remain unexplained.",
    explanation: "While many stories of mysterious disappearances exist, investigations have found that the number of incidents in this region is not significantly higher than in other parts of the ocean. Most are attributed to severe weather and human error."
  },
  {
    fact: "Crop circles can form mathematically perfect patterns.",
    explanation: "While the origin of many crop circles is debated, the majority are known to be man-made hoaxes. The creators often use ropes, planks, and GPS to create complex geometric designs."
  },
  {
    fact: "Search for life includes moons of Jupiter and Saturn.",
    explanation: "Moons like Europa (Jupiter) and Enceladus (Saturn) are believed to have vast liquid water oceans beneath their icy shells, making them prime candidates for harboring microbial life."
  },
  {
    fact: "Alien megastructures are still hypothetical.",
    explanation: "Concepts like the 'Dyson Sphere', a massive structure built around a star to capture its energy, are proposed as potential signs of a highly advanced civilization that we could one day detect."
  },
  {
    fact: "Some UFO sightings coincide with satellites.",
    explanation: "Many sightings of unidentified flying objects (UFOs), or Unidentified Aerial Phenomena (UAPs), are later identified as satellites, weather balloons, drones, or conventional aircraft."
  },
  {
    fact: "SETI searches for intelligent life in space.",
    explanation: "The Search for Extraterrestrial Intelligence (SETI) is a collective name for scientific efforts to find intelligent life, primarily by using radio telescopes to listen for artificial signals from other stars."
  },
  {
    fact: "Tabby’s Star shows unusual dimming patterns.",
    explanation: "This star (KIC 8462852) undergoes irregular, deep dips in brightness. While theories ranged from comets to alien megastructures, the leading scientific explanation is that it's caused by a large, uneven cloud of cosmic dust."
  },
  {
    fact: "Some planets might host subsurface oceans.",
    explanation: "Even on planets outside the 'habitable zone', tidal heating from a nearby large body or geothermal activity could keep water liquid under the surface, creating a potential environment for life."
  },
  {
    fact: "Mars once had liquid water on its surface.",
    explanation: "Evidence from rovers, like dried-up riverbeds, deltas, and water-related minerals, strongly indicates that ancient Mars had a thicker atmosphere and was warm enough to support lakes and rivers."
  },
  {
    fact: "Exoplanet atmospheres are studied for biosignatures.",
    explanation: "By analyzing the light that passes through an exoplanet's atmosphere, telescopes like the James Webb can detect the chemical composition, looking for gases like oxygen and methane that could indicate life."
  },
  {
    fact: "Some stars emit unusual X-ray pulses.",
    explanation: "Objects like pulsars (rapidly spinning neutron stars) emit beams of radiation. If the beam sweeps across Earth, we detect it as a regular pulse, like a cosmic lighthouse."
  },
  {
    fact: "The Drake Equation estimates alien civilizations.",
    explanation: "It's a probabilistic argument used to estimate the number of active, communicative alien civilizations in the Milky Way. Its result depends heavily on unknown variables, making it more of a thought experiment."
  },
  {
    fact: "Some unexplained sky lights remain a mystery.",
    explanation: "Phenomena like the 'Hessdalen Lights' in Norway are recurring, localized lights that have not been fully explained by science, attracting both researchers and UFO enthusiasts."
  },
  {
    fact: "Voyager 1 carries a message for aliens.",
    explanation: "It holds the 'Golden Record', a gold-plated phonograph record containing sounds and images selected to portray the diversity of life and culture on Earth, intended as a greeting to any extraterrestrial life that might find it."
  },
  {
    fact: "Dark energy drives universe expansion.",
    explanation: "This is a mysterious, repulsive force that acts opposite to gravity. It makes up about 68% of the universe and is responsible for the accelerating expansion of space itself."
  },

  // 101-120 AI & Tech Continued
  {
    fact: "Generative AI can simulate realistic 3D models.",
    explanation: "By learning from scans of real-world objects, AI can now generate detailed and textured 3D models from a simple text description or a 2D image, speeding up work for game developers and designers."
  },
  {
    fact: "AI can detect cancer earlier than human doctors in some cases.",
    explanation: "AI models trained on thousands of medical scans can learn to spot subtle patterns of early-stage cancer that may be missed by the human eye, acting as a powerful tool for radiologists."
  },
  {
    fact: "AI chatbots can hold multi-turn conversations.",
    explanation: "Unlike simple chatbots, modern Large Language Models can remember the context of the conversation, allowing for more natural, back-and-forth dialogue that feels more human."
  },
  {
    fact: "AI-driven cameras can remove unwanted objects automatically.",
    explanation: "Features like Google's Magic Eraser use AI to identify a distracting object in a photo, remove it, and then intelligently fill in the background based on the surrounding pixels."
  },
  {
    fact: "Some AI systems can analyze legal documents.",
    explanation: "AI can scan thousands of pages of contracts or case law in seconds to find relevant information, identify risks, or check for inconsistencies, saving lawyers countless hours of work."
  },
  {
    fact: "Machine learning helps predict stock market trends.",
    explanation: "Hedge funds use complex algorithms to analyze news, social media sentiment, and historical data to predict market movements, though the market's inherent unpredictability remains a challenge."
  },
  {
    fact: "AI can restore old or damaged photos perfectly.",
    explanation: "By training on pairs of damaged and restored images, AI learns how to fix scratches, remove creases, and even colorize black-and-white photos with stunning realism."
  },
  {
    fact: "Deepfakes can now be used in films legally.",
    explanation: "With consent, deepfake technology is used for effects like de-aging actors or creating digital doubles for dangerous stunts, offering a new set of tools for filmmakers."
  },
  {
    fact: "AI can optimize city traffic for efficiency.",
    explanation: "Smart traffic light systems use AI to analyze real-time traffic flow from cameras and sensors, adjusting light timings to reduce congestion, emissions, and travel times."
  },
  {
    fact: "Some AI can detect fraudulent transactions instantly.",
    explanation: "Banks use AI to learn your normal spending patterns. Any transaction that deviates from this pattern, like a purchase in a foreign country, is instantly flagged for review."
  },
  {
    fact: "AI can generate 3D animations from text descriptions.",
    explanation: "Emerging AI models can interpret a prompt like 'a robot walking down the street' and generate not just the 3D model, but also the full animation sequence for that action."
  },
  {
    fact: "Autonomous drones can fly without GPS.",
    explanation: "Using a technique called Visual Inertial Odometry (VIO), these drones use cameras and motion sensors to build a map of their surroundings and determine their position within it, allowing them to navigate indoors or in GPS-denied areas."
  },
  {
    fact: "AI can improve energy efficiency in buildings.",
    explanation: "Smart building systems use AI to learn occupancy patterns and adjust heating, cooling, and lighting automatically, significantly reducing energy waste without sacrificing comfort."
  },
  {
    fact: "Some AI can compose poetry in the style of famous writers.",
    explanation: "By training on the complete works of poets like Shakespeare or Dickinson, a language model can learn their unique vocabulary, rhythm, and style to generate new, original poems."
  },
  {
    fact: "AI can identify emotions in written text.",
    explanation: "This is called Sentiment Analysis. AI analyzes word choices and context in reviews, emails, or social media posts to determine if the writer's tone is positive, negative, or neutral."
  },
  {
    fact: "AI voice cloning is indistinguishable from human voices.",
    explanation: "With just a few seconds of audio, some AI models can generate a synthetic voice that is a perfect replica of the original speaker, raising both exciting possibilities and serious ethical concerns."
  },
  {
    fact: "AI can summarize long articles into key points.",
    explanation: "Summarization tools use natural language processing to identify the most important sentences and concepts in a document, condensing it into a short, easy-to-read summary."
  },
  {
    fact: "Reinforcement learning is used for robotic control.",
    explanation: "This is a type of machine learning where an AI agent learns to perform a task by trial and error. It receives 'rewards' for correct actions and 'penalties' for incorrect ones, gradually mastering complex skills."
  },
  {
    fact: "AI is being applied in climate change research.",
    explanation: "AI helps scientists create more accurate climate models, discover new materials for batteries and solar panels, and monitor deforestation from satellite imagery."
  },
  {
    fact: "Some AI systems can beat humans in strategy games.",
    explanation: "AI like AlphaGo (for Go) and Deep Blue (for chess) have defeated the world's best human players by analyzing billions of possible moves and developing strategies that were previously unknown."
  },

  // 121-140 Computers & Phones Continued
  {
    fact: "Some supercomputers consume as much electricity as a small city.",
    explanation: "Powering and cooling tens of thousands of high-performance processors requires an immense amount of energy, often measured in megawatts, comparable to the power consumption of thousands of homes."
  },
  {
    fact: "5G networks allow speeds 100x faster than 4G.",
    explanation: "5G technology uses higher frequency radio waves, which can carry much more data. This enables near-instant downloads and is crucial for technologies like self-driving cars and the Internet of Things (IoT)."
  },
  {
    fact: "Edge AI processes data locally without cloud servers.",
    explanation: "Instead of sending data to a remote server for analysis, AI computations are performed directly on the device (the 'edge' of the network). This is faster, uses less bandwidth, and improves privacy."
  },
  {
    fact: "Foldable phones can bend without breaking.",
    explanation: "They use flexible OLED display panels made of advanced polymers instead of rigid glass. The hinge mechanism is also a complex piece of engineering designed for hundreds of thousands of folds."
  },
  {
    fact: "Some laptops use solar charging panels.",
    explanation: "While still a niche technology, prototypes and some specialized devices incorporate solar cells into the laptop's lid, allowing it to slowly recharge when exposed to sunlight."
  },
  {
    fact: "Quantum computers use qubits instead of bits.",
    explanation: "A classical bit is either a 0 or a 1. A qubit, thanks to quantum superposition, can be a 0, a 1, or both at the same time, allowing for a massive increase in computational power for specific tasks."
  },
  {
    fact: "Smartphones can measure heart rate using cameras.",
    explanation: "By placing your finger over the camera and flash, an app can detect the tiny changes in color in your fingertip as blood is pumped through your capillaries with each heartbeat."
  },
  {
    fact: "Wearables track sleep patterns accurately.",
    explanation: "Devices like smartwatches use motion sensors (accelerometers) and heart rate monitors to detect your sleep stages (light, deep, REM) and how often you wake up during the night."
  },
  {
    fact: "Cloud computing powers most modern apps.",
    explanation: "Services like Google Drive, Netflix, and Spotify run on massive, remote data centers ('the cloud') instead of on your local device. This allows for easy access to data from anywhere."
  },
  {
    fact: "Augmented reality glasses overlay information in real-time.",
    explanation: "These glasses have transparent displays that project digital information, like navigation arrows or notifications, directly into your field of view, blending the digital and physical worlds."
  },
  {
    fact: "Data centers store exabytes of data globally.",
    explanation: "An exabyte is one billion gigabytes. The world's collective data is stored in these vast, warehouse-sized facilities filled with servers, storage drives, and networking equipment."
  },
  {
    fact: "Some GPUs are optimized for AI tasks.",
    explanation: "These GPUs contain specialized 'Tensor Cores' designed to perform the specific type of matrix math that is fundamental to training and running deep learning neural networks."
  },
  {
    fact: "Phone cameras now use AI for low-light photography.",
    explanation: "This is called 'computational photography'. When you take a night shot, the phone captures multiple frames at different exposures and uses AI to merge them, reducing noise and brightening the image."
  },
  {
    fact: "The first mouse was invented in 1964.",
    explanation: "Invented by Douglas Engelbart, the first mouse was a wooden shell with two metal wheels. Its purpose was to make interacting with a graphical user interface more intuitive."
  },
  {
    fact: "Some laptops have keyboards that light individually per key.",
    explanation: "Known as per-key RGB, this feature is popular in gaming laptops. It allows for complex lighting effects and customization, letting users highlight specific keys for different games."
  },
  {
    fact: "Liquid cooling is used in high-end computers.",
    explanation: "Instead of just air, a system of tubes circulates a liquid coolant to draw heat away from components like the CPU and GPU. It's more efficient and quieter than traditional fan-based cooling."
  },
  {
    fact: "Computers now simulate human brain neurons.",
    explanation: "Neuromorphic computing aims to create processors that mimic the structure of the brain. These chips use artificial 'neurons' and 'synapses' and are highly efficient at pattern recognition tasks."
  },
  {
    fact: "Modern smartphones have more RAM than older PCs.",
    explanation: "It's common for a flagship phone today to have 8GB or 12GB of RAM, an amount that was considered high-end for desktop PCs just a few years ago."
  },
  {
    fact: "Some phones support over 100 simultaneous apps in memory.",
    explanation: "Through advanced memory management and large amounts of RAM, some high-end phones can keep a huge number of apps 'frozen' in the background, allowing for instant switching without reloading."
  },
  {
    fact: "Edge devices process AI locally for faster results.",
    explanation: "'Edge devices' are pieces of hardware, like a smart camera or a sensor, that can run AI models directly. This eliminates the delay of sending data to the cloud, enabling real-time responses."
  },

  // 141-160 Science & Universe Continued
  {
    fact: "Voyager spacecraft are the farthest human-made objects from Earth.",
    explanation: "Launched in 1977, Voyager 1 and 2 have left our solar system and entered interstellar space. They continue to send back data from billions of miles away."
  },
  {
    fact: "The James Webb Telescope observes early galaxies.",
    explanation: "As an infrared telescope, it can see through cosmic dust and detect the highly redshifted light from the very first stars and galaxies that formed over 13.5 billion years ago."
  },
  {
    fact: "Some planets orbit two suns simultaneously.",
    explanation: "These are called circumbinary planets, reminiscent of Tatooine from Star Wars. Their orbits can be complex as they are influenced by the gravitational pull of two stars instead of one."
  },
  {
    fact: "The Sun loses mass slowly via solar wind.",
    explanation: "The solar wind is a continuous stream of charged particles flowing from the Sun. Through this process, the Sun loses about a million tons of mass every second."
  },
  {
    fact: "Space telescopes detect infrared and ultraviolet light.",
    explanation: "Much of this light is blocked by Earth's atmosphere. By being in space, telescopes like Hubble (UV) and James Webb (IR) can observe the universe in wavelengths invisible to us on the ground."
  },
  {
    fact: "Some moons have underground oceans, like Europa.",
    explanation: "Jupiter's moon Europa is believed to have a vast ocean of liquid saltwater beneath its icy crust, kept warm by tidal forces. It's a prime target in the search for extraterrestrial life."
  },
  {
    fact: "Gravitational waves were detected in 2015.",
    explanation: "These are ripples in the fabric of spacetime, caused by cataclysmic events like the merging of two black holes. Their detection, using LIGO, confirmed a major prediction of Einstein's theories."
  },
  {
    fact: "Satellites track climate change accurately.",
    explanation: "Satellites continuously monitor key indicators like polar ice melt, sea level rise, atmospheric carbon dioxide levels, and global temperatures, providing crucial data for climate science."
  },
  {
    fact: "Mars rovers explore the planet autonomously.",
    explanation: "Due to the long communication delay between Earth and Mars, rovers like Perseverance can't be 'driven' in real-time. They are given a set of goals and use onboard AI to navigate around obstacles on their own."
  },
  {
    fact: "The cosmic microwave background is leftover radiation from the Big Bang.",
    explanation: "Often called the 'afterglow' of the Big Bang, this faint microwave radiation fills the entire universe. It's a snapshot of the universe when it was only 380,000 years old."
  },
  {
    fact: "Exoplanets can have extreme weather conditions.",
    explanation: "Scientists have found planets with supersonic winds, clouds made of rock, and temperatures hot enough to vaporize iron. Their atmospheres are far more varied than those in our solar system."
  },
  {
    fact: "Some stars rotate hundreds of times per hour.",
    explanation: "Neutron stars, the incredibly dense remnants of supernovae, can spin at tremendous speeds due to the conservation of angular momentum as the original star's core collapsed."
  },
  {
    fact: "The Moon is slowly moving away from Earth each year.",
    explanation: "The same tidal forces that cause Earth's tides also cause the Moon to drift away from us at a rate of about 3.8 centimeters (1.5 inches) per year."
  },
  {
    fact: "Some black holes spin near the speed of light.",
    explanation: "As matter falls into a black hole, it can transfer its angular momentum, causing the black hole itself to spin. Some have been measured to be rotating at over 90% of the speed of light."
  },
  {
    fact: "Gamma-ray bursts are the universe's most powerful explosions.",
    explanation: "These are incredibly energetic events, possibly caused by the collapse of massive stars or the merger of neutron stars. In a few seconds, they can release more energy than our Sun will in its entire lifetime."
  },
  {
    fact: "Space debris poses a growing threat to satellites.",
    explanation: "Millions of pieces of 'space junk', from old rocket parts to tiny paint flecks, orbit the Earth at high speeds. Even a small piece can cause catastrophic damage to a satellite or spacecraft upon impact."
  },
  {
    fact: "Some asteroids could be mined for metals in the future.",
    explanation: "The 'asteroid belt' and other near-Earth asteroids are rich in valuable resources like platinum, nickel, and iron. Asteroid mining is a long-term concept for sourcing materials in space."
  },
  {
    fact: "Dark energy remains one of the greatest cosmic mysteries.",
    explanation: "We can observe its effect—the accelerated expansion of the universe—but we don't know what it is. It seems to be a property of space itself, acting as a sort of anti-gravity."
  },
  {
    fact: "Some planets have surface temperatures over 2,000°C.",
    explanation: "So-called 'Hot Jupiters' are gas giant exoplanets that orbit extremely close to their stars. Their proximity results in scorching temperatures, hot enough to melt most metals."
  },
  {
    fact: "The observable universe has at least 2 trillion galaxies.",
    explanation: "This is the current estimate based on deep-field observations from the Hubble Space Telescope. Each of these galaxies can contain billions or even trillions of stars."
  }
];

// ========================
// 2️⃣ Live Clock (India Time)
function startLiveClock() {
    const clockElement = document.getElementById("live-clock");

    function updateClock() {
        const now = new Date();
        const istOffset = 5.5 * 60;
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istTime = new Date(utc + istOffset * 60000);
        const hours = String(istTime.getHours()).padStart(2, '0');
        const minutes = String(istTime.getMinutes()).padStart(2, '0');
        const seconds = String(istTime.getSeconds()).padStart(2, '0');
        const millis = String(istTime.getMilliseconds()).padStart(3, '0');
        clockElement.innerText = `${hours}:${minutes}:${seconds}:${millis}`;
        requestAnimationFrame(updateClock);
    }
    updateClock();
}

// ========================
// 3️⃣ Random Knowledge Bit
let currentExplanation = ''; // To store the current explanation
let isTyping = false; // To prevent starting a new animation while one is running

function showKnowledgeBit() {
    const factTextElement = document.getElementById("knowledge-bit-text");
    const explanationElement = document.getElementById("knowledge-explanation");
    
    const index = Math.floor(Math.random() * knowledgeBits.length);
    const selectedBit = knowledgeBits[index];
    
    // Clear previous explanation and stop any typing animation
    explanationElement.innerHTML = '';
    isTyping = false;

    if (selectedBit && selectedBit.fact) {
        factTextElement.innerText = selectedBit.fact;
        currentExplanation = selectedBit.explanation || '';
    }
}

// ========================
// 4️⃣ NEW: Typewriter Effect
function typeWriter() {
    if (isTyping || !currentExplanation) {
        return; // Don't run if already typing or no explanation exists
    }

    const explanationElement = document.getElementById("knowledge-explanation");
    explanationElement.innerHTML = ''; // Clear previous text
    explanationElement.classList.add('typing'); // Add class for blinking cursor
    isTyping = true;
    
    let i = 0;
    const speed = 30; // Speed of typing in milliseconds

    function type() {
        if (i < currentExplanation.length) {
            explanationElement.innerHTML += currentExplanation.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            explanationElement.classList.remove('typing'); // Remove cursor when done
            isTyping = false;
        }
    }
    type();
}


// ========================
// 5️⃣ Video Animation + Logo Fade-in (ROBUST & CORRECTED)
function startAnimations() {
    const video = document.getElementById("intro-video");
    const elementsToFadeIn = [
        document.getElementById("logo"),
        document.getElementById("since-text"),
        document.getElementById("since-logo-text"),
        document.getElementById("footer-text")
    ];

    let animationHasRun = false;

    const runExitAnimation = () => {
        if (animationHasRun) return; // Ensure this only runs once
        animationHasRun = true;

        // Shrink video smoothly
        video.style.transition = "all 2s ease";
        video.style.transform = "scale(0.1)";
        video.style.opacity = "0";

        // Show all other elements
        elementsToFadeIn.forEach(el => el.style.opacity = "1");

        // After shrink animation (2s), hide video container and show main content
        setTimeout(() => {
            document.getElementById("video-container").style.display = "none";
            document.getElementById("knowledge-box").style.opacity = "1";
            document.getElementById("live-clock").style.opacity = "1";
        }, 2000); // 2s = match shrink duration
    };

    // TRIGGER 1: The ideal case - video plays and ends.
    video.addEventListener('ended', runExitAnimation);
    
    // TRIGGER 2 & 3: Handle browsers that block or stall autoplay.
    video.play().catch(error => {
        console.error("Autoplay was prevented. Starting animation immediately.", error);
        // TRIGGER 2: If autoplay is blocked, run the animation right away.
        runExitAnimation();
    });

    // TRIGGER 3 (Failsafe): If the video gets stuck for any reason,
    // this timer will force the animation to run after 7 seconds.
    setTimeout(runExitAnimation, 7000);
}


// ========================
// Start everything when DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
    showKnowledgeBit();
    startLiveClock();
    startAnimations();
    
    // Add click listener for the typewriter effect
    document.getElementById("knowledge-box").addEventListener("click", typeWriter);
});
