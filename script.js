// --- ELEMENTS ---
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// --- VARIABLES ---
let hoverCount = 0;
let cycleCount = 0;

// --- 1. ENVELOPE LOGIC ---
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// --- 2. MOVEMENT LOGIC (Shared by Mouse & Touch) ---
function moveNoButton(e) {
    // If we've done this 3 times, STOP moving and allow the click
    if (hoverCount >= 3) {
        noBtn.style.cursor = "pointer";
        return; // Let the event pass through (so it clicks)
    }

    // IMPORTANT: If this is a touch event (mobile), stop the click from happening!
    if (e.type === "touchstart") {
        e.preventDefault(); 
    }

    // SMART LOGIC: Move less on mobile so it stays on screen
    const isMobile = window.innerWidth <= 600;
    const min = isMobile ? 50 : 100; // Smaller moves on phone
    const max = isMobile ? 100 : 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    hoverCount++;
}

// Add BOTH Listeners (Desktop uses MouseOver, Mobile uses Touch)
noBtn.addEventListener("mouseover", moveNoButton); // Desktop Hover
noBtn.addEventListener("touchstart", moveNoButton); // Mobile Tap

// --- 3. CLICK LOGIC (The Angry/Story Part) ---
noBtn.addEventListener("click", () => {
    // Only run this if the button has stopped moving (3 times)
    if (hoverCount >= 3) {
        buttons.style.display = "none";

        // Cycle Logic
        if (cycleCount === 0) {
            title.textContent = "so rude! why?? wrong asnwer!";
            catImg.src = "howrude_peng.gif"; 
        } else if (cycleCount === 1) {
            title.textContent = "again?? WHYY? now im sad";
            catImg.src = "puppy_eye_peng.gif";
        } else if (cycleCount === 2) {
            title.textContent = "your so mean to me GO BACK!";
            catImg.src = "tantrum_peng.gif";
        }

        cycleCount++;

        setTimeout(() => {
            resetGame();
        }, 6000);
    }
});

// --- 4. YES BUTTON: CLICK (Success) ---
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "penguin_dancing.gif";
    
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
});

// --- 5. RESET FUNCTION ---
function resetGame() {
    hoverCount = 0;
    noBtn.style.transform = "translate(0px, 0px)";
    noBtn.style.cursor = "default";
    buttons.style.display = "flex";

    if (cycleCount >= 3) {
        // FINAL LEVEL
        noBtn.style.display = "none";
        title.textContent = "NOW IM MAD! AGAIN WILL YOU BE MY VALENTINE?";
        catImg.src = "angey_pengnobg.gif"; 
    } else {
        // NORMAL LEVEL
        noBtn.style.display = "block"; 
        title.textContent = "Will you be my Valentine?";
        catImg.src = "penguin_ask.gif"; 
    }
}