document.addEventListener("DOMContentLoaded", function () {
    const stages = [
        { name: "Phase 1", start: "2025-03-01 00:00:00", end: "2025-03-18 23:59:59" },
        { name: "Phase 2", start: "2025-03-19 00:00:00", end: "2025-04-06 23:59:59" },
        { name: "Phase 3", start: "2025-04-07 00:00:00", end: "2025-05-01 23:59:59" },
        { name: "Phase 4", start: "2025-05-02 00:00:00", end: "2025-05-07 23:59:59" },
        { name: "Phase 5", start: "2025-05-08 00:00:00", end: "2025-05-11 23:59:59" },
    ];

    const countdownContainer = document.getElementById("countdown-sections");
    if (!countdownContainer) {
        console.error("countdown-sections element not found!");
        return;
    }

    stages.forEach((stage, index) => {
        let section = document.createElement("div");
        section.classList.add("countdown-section");
        section.setAttribute("id", `stage-${index}`);

        section.innerHTML = `
            <h2>${stage.name}</h2>
            <div class="timer" id="timer-${index}">Calculating...</div>
        `;

        countdownContainer.appendChild(section);
    });

    function updateTimers() {
        const now = new Date().getTime();
        let activeStageIndex = -1;

        for (let index = 0; index < stages.length; index++) {
            const start = new Date(stages[index].start).getTime();
            const end = new Date(stages[index].end).getTime();

            if (now >= start && now <= end) {
                activeStageIndex = index;
                const timeLeft = end - now;

                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                document.getElementById(`timer-${index}`).innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                break; // সঠিক স্টেজ খুঁজে পেলে লুপ বন্ধ হয়ে যাবে
            }
        }

        document.querySelectorAll(".countdown-section").forEach(section => {
            section.classList.remove("active");
        });

        if (activeStageIndex !== -1) {
            document.getElementById(`stage-${activeStageIndex}`).classList.add("active");
            let progressPercentage = ((activeStageIndex + 1) / stages.length) * 100;
            document.getElementById("progress").style.width = `${progressPercentage}%`;
        } else {
            document.getElementById("progress").style.width = "100%";
        }
    }

    setInterval(updateTimers, 1000);
    updateTimers();


/* 2nd */
    
    // ফেজ ডেটা (আপনার দেওয়া তারিখ এবং সময় অনুযায়ী)
const phases = [
    { name: "Phase 1", start: '01/03/25 00:00:00', end: '18/03/25 23:59:59' },
    { name: "Phase 2", start: '19/03/25 00:00:00', end: '06/04/25 23:59:59' },
    { name: "Phase 3", start: '07/04/25 00:00:00', end: '01/05/25 23:59:59' },
    { name: "Phase 4", start: '02/05/25 00:00:00', end: '07/05/25 23:59:59' },
    { name: "Phase 5", start: '08/05/25 00:00:00', end: '11/05/25 23:59:59' }
];

// তারিখ এবং সময় পার্সিং ফাংশন (DD/MM/YY HH:MM:SS ফরম্যাট)
function parseCustomDateTime(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');
    return new Date(`20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}`);
}

// বর্তমান ফেজ চেক করুন
function getCurrentPhase() {
    const now = new Date();
    for(let i = 0; i < phases.length; i++) {
        const start = parseCustomDateTime(phases[i].start);
        const end = parseCustomDateTime(phases[i].end);
        if(now >= start && now <= end) return i;
    }
    return -1; // কোনো ফেজ সক্রিয় না থাকলে
}

// সময় ফরম্যাট করুন (দিন, ঘন্টা, মিনিট)
function formatTime(timeInMilliseconds) {
    const days = Math.floor(timeInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeInMilliseconds % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// UI আপডেট করুন
function updateUI() {
    const phaseIndex = getCurrentPhase();
    
    if(phaseIndex === -1) {
        document.getElementById('currentPhase').textContent = "Completed";
        document.getElementById('elapsedTime').textContent = "00d 00h 00m 00s";
        document.getElementById('remainingTime').textContent = "00d 00h 00m 00s";
        document.getElementById('progressBar').style.width = "100%";
        return;
    }

    const phase = phases[phaseIndex];
    const endDate = parseCustomDateTime(phase.end);
    const startDate = parseCustomDateTime(phase.start);
    const now = new Date();

    // সময় বাকি
    let timeLeft = endDate - now;
    if(timeLeft < 0) timeLeft = 0;

    // অতিক্রান্ত সময়
    const elapsedTime = now - startDate;

    // টাইমার ক্যালকুলেশন
    const remainingFormatted = formatTime(timeLeft);
    const elapsedFormatted = formatTime(elapsedTime);

    // প্রোগ্রেস বার
    const totalDuration = endDate - startDate;
    const progress = (elapsedTime / totalDuration) * 100;

    // UI আপডেট
    document.getElementById('currentPhase').textContent = phase.name;
    document.getElementById('elapsedTime').textContent = `${elapsedFormatted}`;
    document.getElementById('remainingTime').textContent = `${remainingFormatted}`;
    document.getElementById('progressBar').style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

// প্রতি সেকেন্ডে আপডেট করুন
setInterval(updateUI, 1000);
updateUI(); // প্রাথমিক কল



/* 3rd */

function updateCounter() {
    const targetDate = new Date("June 25, 2025 23:59:59").getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        document.getElementById("counter22").innerHTML = "Time's up!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("counter22").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCounter, 1000);
updateCounter();
});

