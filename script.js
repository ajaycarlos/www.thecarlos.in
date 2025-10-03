// ========================
// 1️⃣ Knowledge Bits Array
const knowledgeBits = [
  // 1-20 AI & Tech
  "AI can generate realistic images, text, and music from prompts.",
  "Quantum computing could solve problems classical computers can’t.",
  "AI can predict protein folding in seconds.",
  "Robots are learning to paint, cook, and dance.",
  "AI can detect deepfakes with high accuracy.",
  "Voice assistants can recognize emotions.",
  "AI can write code faster than junior developers.",
  "Self-driving cars rely on LIDAR, radar, and AI vision.",
  "AI art challenges global copyright laws.",
  "Some chatbots pass basic law or medical exams.",
  "Facial recognition AI can identify crowds instantly.",
  "Neural networks can outperform humans in image recognition.",
  "AI is being used to predict epidemics and natural disasters.",
  "Virtual reality makes online learning immersive.",
  "AR overlays 3D data onto the real world in real-time.",
  "AI can now compose music indistinguishable from humans.",
  "AI translation systems require almost no human supervision.",
  "Some AI models can generate functional software code.",
  "Generative AI can simulate 3D worlds from text.",
  "AI-driven recommendation engines shape our digital choices.",

  // 21-40 Computers & Phones
  "The first hard drive stored just 5MB of data.",
  "Modern smartphones are millions of times more powerful than Apollo 11 computers.",
  "The fastest supercomputer performs quadrillions of calculations per second.",
  "Blockchain secures data without a central server.",
  "Google indexes over 130 trillion web pages.",
  "Wi-Fi was invented while detecting black holes.",
  "Smartphones detect your movement and orientation.",
  "Some laptops are thinner than a pencil.",
  "There are computers smaller than a grain of rice.",
  "Quantum encryption promises unhackable communication.",
  "Apple built the first personal computer with a GUI.",
  "Some GPUs perform over 50 teraflops of calculations.",
  "The first mobile phone weighed over 1 kg.",
  "Modern processors have over 10 billion transistors.",
  "The world’s first website is still online.",
  "Some phones use under-display cameras.",
  "OLED screens can turn off pixels individually.",
  "Edge computing reduces latency for AI processing.",
  "Some phones charge over 100W for 100% in 20 minutes.",
  "Supercomputers simulate weather with stunning accuracy.",

  // 41-70 Science
  "Water can boil and freeze at the same time under special conditions.",
  "The Sun’s core is hotter than its surface by millions of degrees.",
  "Lightning is five times hotter than the Sun’s surface.",
  "There’s a biologically immortal jellyfish species.",
  "Venus has a day longer than its year.",
  "Neutron stars are so dense a teaspoon weighs billions of tons.",
  "Exoplanets can rain molten glass sideways.",
  "Black holes bend time and light.",
  "There are more stars than grains of sand on Earth.",
  "Some comets contain organic compounds.",
  "The speed of light is about 299,792 km/s.",
  "DNA stores information like a biological hard drive.",
  "CRISPR allows precise genome editing.",
  "The first microscope magnified objects 30x.",
  "The human genome has about 3 billion base pairs.",
  "Antibiotics are becoming less effective due to resistance.",
  "The Earth rotates once every 24 hours.",
  "Sound travels faster in water than air.",
  "Some volcanoes shoot ash over 50 km high.",
  "Gravity bends light in space.",

  // 71-100 Universe & Space
  "Saturn’s rings are made of ice and rock chunks.",
  "Mars has the largest volcano in the solar system.",
  "Jupiter has the shortest day at about 10 hours.",
  "Some rogue planets float without a star.",
  "Hubble observes galaxies billions of light-years away.",
  "Parker Solar Probe moves at 700,000 km/h.",
  "Stars eventually become white dwarfs or black dwarfs.",
  "The largest known star is over 1,700 times wider than the Sun.",
  "Neutrinos pass through Earth without interacting.",
  "Some planets rain diamonds.",
  "A light-year is the distance light travels in one year.",
  "The Milky Way has over 100 billion stars.",
  "Exoplanets are planets outside our solar system.",
  "The Moon causes tides on Earth.",
  "Some asteroids contain precious metals.",
  "Comets have tails that always point away from the Sun.",
  "Black holes can evaporate over time (Hawking radiation).",
  "Some stars explode as supernovae.",
  "The universe is about 13.8 billion years old.",
  "Dark matter makes up most of the universe's mass.",

  // 101-130 Aliens & Mysteries
  "Scientists listen to exoplanets for alien signals.",
  "Unexplained fast radio bursts repeat every few days.",
  "Meteorites can contain amino acids.",
  "Some desert stones move mysteriously over years.",
  "Deep-sea creatures glow like aliens.",
  "The Bermuda Triangle’s phenomena remain unexplained.",
  "Crop circles can form mathematically perfect patterns.",
  "Search for life includes moons of Jupiter and Saturn.",
  "Alien megastructures are still hypothetical.",
  "Some UFO sightings coincide with satellites.",
  "SETI searches for intelligent life in space.",
  "Tabby’s Star shows unusual dimming patterns.",
  "Some planets might host subsurface oceans.",
  "Mars once had liquid water on its surface.",
  "Exoplanet atmospheres are studied for biosignatures.",
  "Some stars emit unusual X-ray pulses.",
  "The Drake Equation estimates alien civilizations.",
  "Some unexplained sky lights remain a mystery.",
  "Voyager 1 carries a message for aliens.",
  "Dark energy drives universe expansion.",

  // 131-160 AI & Tech Continued
  "Generative AI can simulate realistic 3D models.",
  "AI can detect cancer earlier than human doctors in some cases.",
  "AI chatbots can hold multi-turn conversations.",
  "AI-driven cameras can remove unwanted objects automatically.",
  "Some AI systems can analyze legal documents.",
  "Machine learning helps predict stock market trends.",
  "AI can restore old or damaged photos perfectly.",
  "Deepfakes can now be used in films legally.",
  "AI can optimize city traffic for efficiency.",
  "Some AI can detect fraudulent transactions instantly.",
  "AI can generate 3D animations from text descriptions.",
  "Autonomous drones can fly without GPS.",
  "AI can improve energy efficiency in buildings.",
  "Some AI can compose poetry in the style of famous writers.",
  "AI can identify emotions in written text.",
  "AI voice cloning is indistinguishable from human voices.",
  "AI can summarize long articles into key points.",
  "Reinforcement learning is used for robotic control.",
  "AI is being applied in climate change research.",
  "Some AI systems can beat humans in strategy games.",

  // 161-190 Computers & Phones Continued
  "Some supercomputers consume as much electricity as a small city.",
  "5G networks allow speeds 100x faster than 4G.",
  "Edge AI processes data locally without cloud servers.",
  "Foldable phones can bend without breaking.",
  "Some laptops use solar charging panels.",
  "Quantum computers use qubits instead of bits.",
  "Smartphones can measure heart rate using cameras.",
  "Wearables track sleep patterns accurately.",
  "Cloud computing powers most modern apps.",
  "Augmented reality glasses overlay information in real-time.",
  "Data centers store exabytes of data globally.",
  "Some GPUs are optimized for AI tasks.",
  "Phone cameras now use AI for low-light photography.",
  "The first mouse was invented in 1964.",
  "Some laptops have keyboards that light individually per key.",
  "Liquid cooling is used in high-end computers.",
  "Computers now simulate human brain neurons.",
  "Modern smartphones have more RAM than older PCs.",
  "Some phones support over 100 simultaneous apps in memory.",
  "Edge devices process AI locally for faster results.",

  // 191-220 Science & Universe Continued
  "Voyager spacecraft are the farthest human-made objects from Earth.",
  "The James Webb Telescope observes early galaxies.",
  "Some planets orbit two suns simultaneously.",
  "The Sun loses mass slowly via solar wind.",
  "Space telescopes detect infrared and ultraviolet light.",
  "Some moons have underground oceans, like Europa.",
  "Gravitational waves were detected in 2015.",
  "Satellites track climate change accurately.",
  "Mars rovers explore the planet autonomously.",
  "The cosmic microwave background is leftover radiation from the Big Bang.",
  "Exoplanets can have extreme weather conditions.",
  "Some stars rotate hundreds of times per hour.",
  "The Moon is slowly moving away from Earth each year.",
  "Some black holes spin near the speed of light.",
  "Gamma-ray bursts are the universe's most powerful explosions.",
  "Space debris poses a growing threat to satellites.",
  "Some asteroids could be mined for metals in the future.",
  "Dark energy remains one of the greatest cosmic mysteries.",
  "Some planets have surface temperatures over 2,000°C.",
  "The observable universe has at least 2 trillion galaxies."
];

// ========================
// 2️⃣ Live Clock (India Time)
function startLiveClock() {
    const clockElement = document.getElementById("live-clock");

    function updateClock() {
        const now = new Date();

        // Convert to India Standard Time (IST)
        const istOffset = 5.5 * 60; // IST = UTC +5:30
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istTime = new Date(utc + istOffset * 60000);

        const hours = String(istTime.getHours()).padStart(2, '0');
        const minutes = String(istTime.getMinutes()).padStart(2, '0');
        const seconds = String(istTime.getSeconds()).padStart(2, '0');
        const millis = String(istTime.getMilliseconds()).padStart(3, '0');

        clockElement.innerText = `${hours}:${minutes}:${seconds}:${millis}`;
        requestAnimationFrame(updateClock); // Update every frame
    }

    updateClock();
}

// ========================
// 3️⃣ Random Knowledge Bit
function showKnowledgeBit() {
    const index = Math.floor(Math.random() * knowledgeBits.length);
    const box = document.getElementById("knowledge-box");
    box.innerText = knowledgeBits[index];
}

// ========================
// 4️⃣ Video Animation + Logo Fade-in (Fixed)
function startAnimations() {
    const video = document.getElementById("intro-video");
    const logo = document.getElementById("logo");
    const sinceText = document.getElementById("since-text");
    const sinceLogoText = document.getElementById("since-logo-text"); // New element

    // Wait until video metadata is loaded to get correct duration
    video.addEventListener('loadedmetadata', () => {
        const videoDuration = video.duration * 1000; // duration in ms

setTimeout(() => {
    // Shrink video smoothly
    video.style.transition = "all 2s ease";
    video.style.transform = "scale(0.1)";
    video.style.opacity = "0";

    // Show logo, "C.A.R.L.O.S", new "Since 2025" and footer text
    logo.style.opacity = "1";
    sinceText.style.opacity = "1";
    sinceLogoText.style.opacity = "1"; // Fade in the new text
    document.getElementById("footer-text").style.opacity = "1";

    // After shrink animation (2s), hide video container and show knowledge & clock
    setTimeout(() => {
        document.getElementById("video-container").style.display = "none";

        // Fade in knowledge box and clock
        document.getElementById("knowledge-box").style.opacity = "1";
        document.getElementById("live-clock").style.opacity = "1";
    }, 2000); // 2s = match shrink duration
}, videoDuration);
    });
}

// ========================
// Start animations when DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
    showKnowledgeBit(); // Show random knowledge
    startLiveClock();     // Start live clock
    startAnimations();  // Play video animation
});
