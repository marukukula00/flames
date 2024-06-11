document.getElementById('flamesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name1 = document.getElementById('name1').value.toLowerCase().replace(/\s+/g, '');
    const name2 = document.getElementById('name2').value.toLowerCase().replace(/\s+/g, '');

    if (!name1 || !name2) {
        alert('Please enter both names.');
        return;
    }

    const flamesResult = calculateFlames(name1, name2);
    const resultElement = document.getElementById('result');
    resultElement.innerText = `The relationship is: ${flamesResult}`;
    resultElement.classList.remove('animate__fadeIn');
    void resultElement.offsetWidth; // Trigger reflow
    resultElement.classList.add('animate__fadeIn');

    playSuccessSound();
    launchConfetti();
});

function calculateFlames(name1, name2) {
    let combinedNames = name1 + name2;
    let charCount = {};

    for (let char of combinedNames) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    let uncommonCount = 0;
    for (let char in charCount) {
        if (charCount[char] % 2 !== 0) {
            uncommonCount++;
        }
    }

    const flames = ["Friends", "Lovers", "Affection", "Marriage", "Enemies", "Siblings"];
    let index = 0;
    
    while (flames.length > 1) {
        index = (index + uncommonCount - 1) % flames.length;
        flames.splice(index, 1);
    }

    return flames[0];
}

function playSuccessSound() {
    const sound = document.getElementById('successSound');
    sound.play();
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

