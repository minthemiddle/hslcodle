const targetColor = document.getElementById('targetColor');
const guessColor = document.getElementById('guessColor');
const hueInput = document.getElementById('hueInput');
const saturationInput = document.getElementById('saturationInput');
const lightnessInput = document.getElementById('lightnessInput');
const submitGuess = document.getElementById('submitGuess');
const newColorBtn = document.getElementById('newColor');
const result = document.getElementById('result');

let targetHSL;

function generateHueCheatsheet() {
    const cheatsheet = document.getElementById('hueCheatsheet');
    cheatsheet.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const hue = i * 30;
        const div = document.createElement('div');
        div.className = 'inline-block mr-2 mb-2 text-center';
        div.innerHTML = `
            <div class="w-12 h-12 rounded" style="background-color: hsl(${hue}, 100%, 50%);"></div>
            <span class="text-xs">${hue}°</span>
        `;
        cheatsheet.appendChild(div);
    }
}

function generateTargetColor() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    targetHSL = [h, s, l];
    targetColor.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    
    // Clear input fields and result
    hueInput.value = '';
    saturationInput.value = '';
    lightnessInput.value = '';
    result.textContent = '';
    guessColor.style.backgroundColor = 'rgb(229, 231, 235)'; // Reset to gray-200
    
    // Hide the hue cheatsheet
    document.getElementById('hueCheatsheet').classList.add('hidden');
}

newColorBtn.addEventListener('click', generateTargetColor);

submitGuess.addEventListener('click', () => {
    const guessHSL = [
        Math.max(0, Math.min(360, parseInt(hueInput.value) || 0)),
        Math.max(0, Math.min(100, parseInt(saturationInput.value) || 0)),
        Math.max(0, Math.min(100, parseInt(lightnessInput.value) || 0))
    ];
    
    // Update guess color display only after submission
    guessColor.style.backgroundColor = `hsl(${guessHSL[0]}, ${guessHSL[1]}%, ${guessHSL[2]}%)`;
    
    const hueDelta = targetHSL[0] - guessHSL[0];
    const saturationDelta = targetHSL[1] - guessHSL[1];
    const lightnessDelta = targetHSL[2] - guessHSL[2];

    const difference = Math.sqrt(
        Math.pow(hueDelta, 2) +
        Math.pow(saturationDelta, 2) +
        Math.pow(lightnessDelta, 2)
    );
    
    let resultText = "";
    let circleColor = "";
    if (difference < 5) {
        resultText = "Excellent guess!";
        circleColor = "bg-green-600";
    } else if (difference < 25) {
        resultText = "Close! Try again.";
        circleColor = "bg-yellow-600";
    } else {
        resultText = "Not quite. Keep trying!";
        circleColor = "bg-red-600";
    }

    // Reveal target color HSL values and deltas
    result.innerHTML = `
        <div class="flex items-center">
            <div class="w-4 h-4 rounded-full ${circleColor} mr-2"></div>
            <span class="font-bold">${resultText}</span>
        </div>
        <div>Target color: HSL(${targetHSL[0]}, ${targetHSL[1]}%, ${targetHSL[2]}%)</div>
        <div>Deltas: H(${hueDelta.toFixed(2)}), S(${saturationDelta.toFixed(2)}), L(${lightnessDelta.toFixed(2)})</div>
    `;

    // Update input fields with clamped values
    hueInput.value = guessHSL[0];
    saturationInput.value = guessHSL[1];
    lightnessInput.value = guessHSL[2];

    // Show hue cheatsheet
    generateHueCheatsheet();
    document.getElementById('hueCheatsheet').classList.remove('hidden');
});

generateTargetColor();
