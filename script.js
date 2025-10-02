
// ========================
// 1️⃣ Knowledge Bits Array
const knowledgeBits = [
  "The shortest war in history lasted 38 minutes.",
  "Octopuses have three hearts.",
  "Honey never spoils.",
  "Bananas are berries but strawberries aren't.",
  "Sharks existed before trees.",
  "Humans share 60% of DNA with bananas.",
  "Wombat poop is cube-shaped.",
  "Sloths can hold their breath longer than dolphins.",
  "There’s enough DNA in your body to stretch to the sun and back 600 times.",
  "Butterflies can taste with their feet.",
  "Koalas have fingerprints almost identical to humans.",
  "Cows have best friends and get stressed when separated.",
  "Water can boil and freeze at the same time.",
  "There’s a species of jellyfish that is immortal.",
  "Your stomach gets a new lining every 3-4 days.",
  "A day on Venus is longer than a year on Venus.",
  "Sharks can live up to 500 years.",
  "Some turtles can breathe through their butts.",
  "Sea otters hold hands while sleeping.",
  "Sloths can rotate their heads 270 degrees.",
  "Elephants can’t jump.",
  "There’s a planet made of diamonds.",
  "A group of flamingos is called a 'flamboyance'.",
  "Penguins propose with pebbles.",
  "Butterflies can see ultraviolet light.",
  "The heart of a shrimp is in its head.",
  "Octopuses have blue blood.",
  "Wombats dig extensive burrows.",
  "Sharks don’t have bones.",
  "Your brain uses 20% of your body's oxygen and calories.",
  "Rats laugh when tickled.",
  "Sea cucumbers fight by shooting out their own internal organs.",
  "The Eiffel Tower can be 15 cm taller during summer.",
  "A bolt of lightning contains enough energy to toast 100,000 slices of bread.",
  "There’s a species of fungus that turns ants into zombies.",
  "Your nose can remember 50,000 different scents.",
  "A group of crows is called a murder.",
  "Sloths can move faster in water than on land.",
  "The fingerprints of a koala are almost identical to humans'.",
  "Sharks existed before dinosaurs.",
  "Octopuses can change both color and texture.",
  "Some frogs can freeze and thaw without dying.",
  "Your body has enough iron to make a small nail.",
  "Sea stars can regenerate lost arms.",
  "Pineapples take about 2 years to grow.",
  "Bamboo can grow up to 91 cm in a day.",
  "Butterflies live on average 2-4 weeks.",
  "Ostriches have the largest eyes of any land animal.",
  "A day on Mercury lasts 59 Earth days.",
  "The heart of a blue whale is the size of a small car.",
  "There’s a jellyfish that can live forever.",
  "The inventor of the frisbee was turned into a frisbee.",
  "Sharks are older than trees.",
  "Some cats are allergic to humans.",
  "Sloths can hold their breath longer than dolphins.",
  "The Moon has moonquakes.",
  "Water can boil and freeze at the same time.",
  "Your stomach gets a new lining every 3-4 days.",
  "The largest snowflake recorded was 15 inches wide.",
  "A group of owls is called a parliament.",
  "Octopuses have three hearts and nine brains.",
  "Bananas are berries; strawberries are not.",
  "Some turtles can breathe through their butts.",
  "Cows produce more milk when they listen to music.",
  "The longest time between two twins being born is 87 days.",
  "Wombat poop is cube-shaped.",
  "Sea otters hold hands while sleeping.",
  "Penguins propose with pebbles.",
  "Some lizards can squirt blood from their eyes.",
  "There’s a species of fungus that controls ants.",
  "Your brain generates enough electricity to power a light bulb.",
  "The Amazon rainforest produces 20% of the world’s oxygen.",
  "There’s a species of squid with the largest eyes in the animal kingdom.",
  "Sloths can rotate their heads almost completely around.",
  "The fingerprints of a koala are almost identical to humans'.",
  "Sharks don’t have bones.",
  "The Earth’s core is as hot as the Sun’s surface.",
  "A single strand of spaghetti is called a 'spaghetto'.",
  "There’s a species of jellyfish that never dies.",
  "Some sea cucumbers eject their internal organs to escape predators.",
  "Rats laugh when tickled.",
  "Elephants can recognize themselves in mirrors.",
  "The Eiffel Tower grows taller in summer.",
  "Lightning is five times hotter than the Sun.",
  "Honey never spoils.",
  "Sloths move so slowly that algae grows on their fur.",
  "Octopuses can taste with their arms.",
  "Bananas float because they are less dense than water.",
  "Sharks can detect one drop of blood in 25 gallons of water.",
  "Water can exist in three states at once (triple point).",
  "The largest living structure on Earth is the Great Barrier Reef.",
  "Some turtles can live over 200 years.",
  "The fingerprints of a cat are unique.",
  "Ostriches can run faster than horses.",
  "The human body has enough fat to make seven bars of soap.",
  "Bamboo can grow almost a meter per day.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Your stomach acid is strong enough to dissolve metal.",
  "Some frogs can change gender during their lifetime.",
  "The fastest land animal is the cheetah.",
  "There’s more bacteria in your mouth than people on Earth.",
  "Sloths can sleep up to 20 hours a day.",
  "Some jellyfish are bioluminescent.",
  "Penguins can jump up to 6 feet in the air."
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

    // Wait until video metadata is loaded to get correct duration
    video.addEventListener('loadedmetadata', () => {
        const videoDuration = video.duration * 1000; // duration in ms

setTimeout(() => {
    // Shrink video smoothly
    video.style.transition = "all 2s ease";
    video.style.transform = "scale(0.1)";
    video.style.opacity = "0";

    // Show logo, "Since 2025", and footer text
    logo.style.opacity = "1";
    sinceText.style.opacity = "1";
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




