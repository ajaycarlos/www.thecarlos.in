// Configuration
const SPEED_FACTOR = 2.5; // How fast you fly
const MAX_DEPTH = 6500;   // When to stop
let currentZ = 0;
let targetZ = 0;

const world = document.getElementById('world');
const layers = document.querySelectorAll('.layer');
const depthDisplay = document.getElementById('depth-counter');

// 1. Initial Setup: Position elements in 3D space
layers.forEach(layer => {
    const zVal = layer.getAttribute('data-z');
    layer.style.transform = `translate(-50%, -50%) translateZ(${zVal}px)`;
});

// 2. The Scroll Loop (Smooth Physics)
function animate() {
    // Linear Interpolation for smoothness (Ease-out effect)
    currentZ += (targetZ - currentZ) * 0.08;
    
    // Apply transform to the world container
    // We are moving the world POSITIVELY to bring negative Z items closer
    world.style.transform = `translateZ(${currentZ}px)`;

    // Update HUD
    depthDisplay.innerText = Math.round(currentZ);

    // Opacity Logic (Fade items out when they pass the camera)
    layers.forEach(layer => {
        const itemZ = parseInt(layer.getAttribute('data-z')); // e.g. -1500
        const distanceToCamera = itemZ + currentZ; // if currentZ is 1500, distance is 0

        let opacity = 0;
        
        // Complex logic to make things fade in as you approach, and fade out as you pass
        if (distanceToCamera > -500 && distanceToCamera < 500) {
            opacity = 1 - (Math.abs(distanceToCamera) / 500);
        } else if (distanceToCamera > 500) {
            opacity = 0; // Behind camera
        } else {
            opacity = 0; // Too far away
        }

        // Special case: Keep the first item visible longer
        if(itemZ === 0 && distanceToCamera > -1000) opacity = 1 - (Math.abs(distanceToCamera)/1000);

        layer.style.opacity = opacity;
        
        // Optimisation: hide invisible layers
        layer.style.display = opacity < 0.01 ? 'none' : 'flex';
    });

    requestAnimationFrame(animate);
}

// 3. Event Listeners
window.addEventListener('wheel', (e) => {
    // e.deltaY is the scroll amount
    targetZ += e.deltaY * SPEED_FACTOR;

    // Clamping
    if (targetZ < 0) targetZ = 0;
    if (targetZ > MAX_DEPTH) targetZ = MAX_DEPTH;
});

// Touch support for mobile
let touchStartY = 0;
window.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
window.addEventListener('touchmove', e => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    targetZ += deltaY * (SPEED_FACTOR * 1.5);
    touchStartY = touchY;
    
    if (targetZ < 0) targetZ = 0;
    if (targetZ > MAX_DEPTH) targetZ = MAX_DEPTH;
});

// Start the loop
animate();