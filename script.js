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
let cycleCount = 0; // 0 = First try, 1 = Second try, 2 = Third try

// --- 1. ENVELOPE LOGIC ---
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// --- 2. NO BUTTON: MOUSEOVER (Run Away) ---
noBtn.addEventListener("mouseover", () => {
    // If moved 3 times, allow click
    if (hoverCount >= 3) {
        noBtn.style.cursor = "pointer";
        return; 
    }
    const min = 200;
    const max = 200;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    hoverCount++;
});

// --- 3. NO BUTTON: CLICK (The Story Logic) ---
noBtn.addEventListener("click", () => {
    if (hoverCount >= 3) {
        // Hide buttons so she can't click anything while the reaction plays
        buttons.style.display = "none";

        // --- CHECK WHICH CYCLE WE ARE ON TO SHOW THE REACTION ---
        if (cycleCount === 0) {
            // Reaction 1: RUDE
            title.textContent = "so rude! why?? wrong asnwer!";
            catImg.src = "howrude_peng.gif"; 
        } 
        else if (cycleCount === 1) {
            // Reaction 2: SAD
            title.textContent = "again?? WHYY? now im sad";
            catImg.src = "puppy_eye_peng.gif";
        } 
        else if (cycleCount === 2) {
            // Reaction 3: TANTRUM
            title.textContent = "your so mean to me GO BACK!";
            catImg.src = "tantrum_peng.gif";
        }

        // Increase the Cycle Count (Level Up)
        cycleCount++;

        // Wait 6 seconds, then RESET the game to the start (or final state)
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

// --- 5. RESET FUNCTION (Determines the Next State) ---
function resetGame() {
    // Reset No Button Physics
    hoverCount = 0;
    noBtn.style.transform = "translate(0px, 0px)";
    noBtn.style.cursor = "default";
    
    // Bring buttons back
    buttons.style.display = "flex";

    // --- CHECK IF WE REACHED THE FINAL LEVEL ---
    if (cycleCount >= 3) {
        // FINAL LEVEL: MAD STATE
        noBtn.style.display = "none"; // Hide No Button forever
        title.textContent = "NOW IM MAD! AGAIN WILL YOU BE MY VALENTINE?";
        catImg.src = "angey_pengnobg.gif"; // The Final Mad GIF

    } else {
        // NORMAL LEVELS: RESET TO START
        noBtn.style.display = "block"; // Show No Button again
        title.textContent = "Will you be my Valentine?";
        catImg.src = "penguin_ask.gif"; // Back to original asking GIF
    }
}