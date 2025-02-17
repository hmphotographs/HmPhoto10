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
});
