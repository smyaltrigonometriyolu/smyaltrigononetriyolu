// Trigonometri Yolu — oyun mantığı (sorular: questions-data.js)

const questionQueues = {};

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Her seviye için soru indeks kuyruğu (yeni turda karıştırılır)
function initQuestionQueues() {
    ['easy', 'medium', 'hard'].forEach((level) => {
        const count = questions[level].length;
        questionQueues[level] = shuffleArray(Array.from({ length: count }, (_, i) => i));
    });
}

// Sıradaki soruyu al; gösterilen soruyu listenin sonuna at (yakında tekrar etmesin)
function getNextQuestion(difficulty) {
    const queue = questionQueues[difficulty];
    if (!queue || queue.length === 0) {
        return null;
    }
    const index = queue.shift();
    queue.push(index);
    return questions[difficulty][index];
}

// DOM elementleri
const mainScreen = document.getElementById('mainScreen');
const questionScreen = document.getElementById('questionScreen');
const infoBtn = document.getElementById('infoBtn');
const infoModal = document.getElementById('infoModal');
const closeModal = document.getElementById('closeModal');
const backBtn = document.getElementById('backBtn');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const timerEl = document.getElementById('timer');
const chronometerEl = document.getElementById('chronometer');
const chronometerProgressEl = document.getElementById('chronometerProgress');
const difficultyBadgeEl = document.getElementById('difficultyBadge');
const questionTextEl = document.getElementById('questionText');
const questionImageEl = document.getElementById('questionImage');
const optionBtns = document.querySelectorAll('.option-btn');
const resultOverlayEl = document.getElementById('resultOverlay');
const resultIconEl = document.getElementById('resultIcon');
const resultTitleEl = document.getElementById('resultTitle');
const resultSubtitleEl = document.getElementById('resultSubtitle');
const resultHintEl = document.getElementById('resultHint');
const confettiLayerEl = document.getElementById('confettiLayer');
const questionBackBtn = document.getElementById('questionBackBtn');
const resultProgressEl = document.getElementById('resultProgress');
const toastEl = document.getElementById('toast');
const statsBtn = document.getElementById('statsBtn');
const statsModal = document.getElementById('statsModal');
const statsBody = document.getElementById('statsBody');
const closeStatsModal = document.getElementById('closeStatsModal');
const statsCloseBtn = document.getElementById('statsCloseBtn');
const statsNewTurBtn = document.getElementById('statsNewTurBtn');
const statsEndTurBtn = document.getElementById('statsEndTurBtn');
const newTurBtn = document.getElementById('newTurBtn');
const endTurBtn = document.getElementById('endTurBtn');
const turStatusText = document.getElementById('turStatusText');
const statsModalTitle = document.getElementById('statsModalTitle');

const RESULT_DISPLAY_MS = 6200;

const resultVariants = {
    success: [
        { title: 'Harika! Doğru Cevap!', subtitle: 'Bir hamle hakkı senin — tahtada hamle sırası sende!' },
        { title: 'Mükemmel!', subtitle: 'Trigonometri senin lehine! Hamle hakkını kaptın.' },
        { title: 'İşte Bu!', subtitle: 'Doğru bildin; şimdi piyonunu oyna veya rakibe engel koy.' }
    ],
    failure: [
        { title: 'Maalesef… Yanlış!', subtitle: 'Bu turda hamle hakkını kaybettin.' },
        { title: 'Olmadı Bu Sefer', subtitle: 'Cevap tutmadı — sıra masada rakibinde.' },
        { title: 'Bir Dahaki Tur', subtitle: 'Yanlış cevap: hamle hakkı rakibe geçti.' }
    ],
    timeout: {
        icon: '0',
        title: 'Süre Doldu!',
        subtitle: 'Zaman senin aleyhine işledi.',
        hint: 'Hamle hakkı rakibe geçti. Bir sonraki turda tekrar dene!'
    }
};

const resultHints = {
    success: 'Masa oyununda piyonunu bir kare ilerlet veya rakibine engel koy.',
    failure: 'Sıra rakibinde — o şimdi piyonunu oynayabilir veya engel koyabilir.'
};

let resultTimeoutId = null;
let lastCorrectAnswerText = '';
let toastTimeoutId = null;

const CHRONO_CIRCUMFERENCE = 2 * Math.PI * 42;

// Tur istatistikleri (masa oyunu oturumu)
function createEmptyRoundStats() {
    return {
        active: false,
        totalAnswered: 0,
        byLevel: {
            easy: { correct: 0, wrong: 0, timeout: 0 },
            medium: { correct: 0, wrong: 0, timeout: 0 },
            hard: { correct: 0, wrong: 0, timeout: 0 }
        },
        mistakes: []
    };
}

let roundStats = createEmptyRoundStats();

// Ses efektleri (harici dosya gerekmez)
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.12) {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.value = volume;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.stop(ctx.currentTime + duration);
    } catch (_) {
        /* ses kapalı veya desteklenmiyor */
    }
}

function playSound(kind) {
    if (kind === 'success') {
        playTone(523, 0.12);
        setTimeout(() => playTone(659, 0.12), 90);
        setTimeout(() => playTone(784, 0.18), 180);
    } else if (kind === 'failure') {
        playTone(330, 0.2, 'sawtooth', 0.08);
        setTimeout(() => playTone(262, 0.28, 'sawtooth', 0.08), 140);
    } else if (kind === 'timeout') {
        playTone(200, 0.35, 'square', 0.06);
    }
}

function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => toastEl.classList.add('hidden'), 2800);
}

function updateTurBar() {
    const n = roundStats.totalAnswered;
    if (!roundStats.active && n === 0) {
        turStatusText.textContent = 'Tur başlamadı';
        endTurBtn.disabled = true;
    } else {
        turStatusText.textContent = roundStats.active
            ? `Tur devam ediyor · ${n} soru`
            : `Son tur · ${n} soru`;
        endTurBtn.disabled = n === 0;
    }
}

function startNewRound() {
    if (roundStats.active && roundStats.totalAnswered > 0) {
        const ok = window.confirm('Yeni tur başlatılırsa mevcut tur istatistikleri silinir. Devam edilsin mi?');
        if (!ok) {
            return;
        }
    }
    hideResultOverlay();
    returnToMainScreen();
    roundStats = createEmptyRoundStats();
    roundStats.active = true;
    initQuestionQueues();
    updateTurBar();
    updateStatsModalButtons();
    statsModal.classList.add('hidden');
    showToast('Yeni tur başladı! İstatistikler sıfırlandı.');
}

function updateStatsModalButtons() {
    const turActive = roundStats.active && roundStats.totalAnswered > 0;
    if (statsEndTurBtn) {
        statsEndTurBtn.classList.toggle('hidden', !turActive);
    }
    if (statsModalTitle) {
        statsModalTitle.textContent = turActive ? 'Canlı Tur Özeti' : 'Tur Özeti';
    }
}

function endRound() {
    if (roundStats.totalAnswered === 0) {
        showToast('Henüz soru çözülmedi. Önce en az bir soru çözün.');
        return;
    }

    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }
    hideResultOverlay();
    questionScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');

    roundStats.active = false;
    renderStatsBody(true);
    updateStatsModalButtons();
    statsModal.classList.add('modal-top');
    statsModal.classList.remove('hidden');
    updateTurBar();
    showToast('Tur bitti. Özeti inceleyebilirsin.');
}

function recordAnswer(outcome, difficulty, question, correctText, chosenText = '') {
    if (!roundStats.active) {
        roundStats.active = true;
    }
    roundStats.totalAnswered += 1;
    const bucket = roundStats.byLevel[difficulty];
    bucket[outcome] += 1;

    if (outcome === 'wrong' || outcome === 'timeout') {
        roundStats.mistakes.push({
            level: difficulty,
            question: question.question,
            correct: correctText,
            chosen: chosenText,
            type: outcome
        });
    }
    updateTurBar();
}

function renderStatsBody(showSummary = false) {
    const levels = ['easy', 'medium', 'hard'];
    const labels = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' };

    if (!statsBody) {
        return;
    }

    if (roundStats.totalAnswered === 0) {
        statsBody.innerHTML = '<p class="stats-empty">Henüz bu turda soru çözülmedi. Zar rengine göre bir seviye seçerek başlayın.</p>';
        return;
    }

    const totalCorrect = levels.reduce((s, l) => s + roundStats.byLevel[l].correct, 0);
    const totalWrong = levels.reduce((s, l) => s + roundStats.byLevel[l].wrong, 0);
    const totalTimeout = levels.reduce((s, l) => s + roundStats.byLevel[l].timeout, 0);

    let html = '';
    if (showSummary) {
        html += '<p class="stats-summary-intro">Masa oyunu turun bitti. İşte özet:</p>';
    } else if (roundStats.active) {
        html += '<p class="stats-summary-intro">Tur devam ediyor — anlık özet:</p>';
    }

    html += `<p class="stats-total-line"><strong>Toplam ${roundStats.totalAnswered} soru</strong> · <span class="stat-ok">✓ ${totalCorrect}</span> · <span class="stat-bad">✗ ${totalWrong}</span> · <span class="stat-time">⏱ ${totalTimeout}</span></p>`;
    html += '<div class="stats-grid">';
    levels.forEach((level) => {
        const s = roundStats.byLevel[level];
        const total = s.correct + s.wrong + s.timeout;
        if (total === 0) {
            return;
        }
        html += `
            <div class="stats-level-card stats-${level}">
                <h4>${labels[level]}</h4>
                <p><span class="stat-ok">✓ ${s.correct}</span> · <span class="stat-bad">✗ ${s.wrong}</span> · <span class="stat-time">⏱ ${s.timeout}</span></p>
            </div>`;
    });
    html += '</div>';

    if (roundStats.mistakes.length > 0) {
        html += '<h4 class="stats-mistakes-title">Yanlış / süre dolan sorular</h4><ul class="stats-mistakes-list">';
        roundStats.mistakes.forEach((m) => {
            const shortQ = m.question.length > 72 ? `${m.question.slice(0, 72)}…` : m.question;
            const extra = m.chosen ? `<br><small>Seçtiğin: ${m.chosen}</small>` : '';
            html += `<li><strong>${labels[m.level]}</strong> — ${shortQ}<br><small>Doğru: ${m.correct}</small>${extra}</li>`;
        });
        html += '</ul>';
    } else if (showSummary) {
        html += '<p class="stats-all-good">Bu turda hata yok — harika!</p>';
    }

    statsBody.innerHTML = html;
}

function openStatsModal() {
    renderStatsBody(!roundStats.active && roundStats.totalAnswered > 0);
    updateStatsModalButtons();
    statsModal.classList.add('modal-top');
    statsModal.classList.remove('hidden');
}

const difficultyLabels = {
    easy: 'Kolay',
    medium: 'Orta',
    hard: 'Zor'
};

// Değişkenler
let currentTimer = null;
let currentDifficulty = null;
let currentQuestion = null;
let timeLeft = 45;
let totalTime = 45;
let shuffledCorrectIndex = null;

// Timer süreleri zorluk bazlı
const timerDurations = {
    easy: 45,
    medium: 60,
    hard: 75
};

// Zorluk butonlarına tıklama olayı
function requestAppFullscreen() {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (!req) {
        return;
    }
    Promise.resolve(req.call(el)).then(() => {
        document.body.classList.add('is-fullscreen');
    }).catch(() => {});
}

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        getAudioContext();
        requestAppFullscreen();
        currentDifficulty = btn.dataset.difficulty;
        startQuestion();
    });
});

// Info butonu
infoBtn.addEventListener('click', () => {
    infoModal.classList.remove('hidden');
});

// Modal kapatma
closeModal.addEventListener('click', () => {
    infoModal.classList.add('hidden');
});

// Modal dışına tıklama ile kapatma
infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
        infoModal.classList.add('hidden');
    }
});

// Geri butonu
backBtn.addEventListener('click', () => {
    infoModal.classList.add('hidden');
});

function updateChronometerDisplay() {
    const ratio = totalTime > 0 ? timeLeft / totalTime : 0;
    const offset = CHRONO_CIRCUMFERENCE * (1 - ratio);

    timerEl.textContent = timeLeft;
    chronometerProgressEl.style.strokeDasharray = `${CHRONO_CIRCUMFERENCE}`;
    chronometerProgressEl.style.strokeDashoffset = `${offset}`;

    chronometerEl.classList.remove('phase-yellow', 'phase-red');

    if (ratio <= 0.25) {
        chronometerEl.classList.add('phase-red');
    } else if (ratio <= 0.5) {
        chronometerEl.classList.add('phase-yellow');
    }
}

// Soru başlat
function startQuestion() {
    if (questions[currentDifficulty].length === 0) {
        showToast('Bu zorluk seviyesinde henüz soru yok.');
        return;
    }

    currentQuestion = getNextQuestion(currentDifficulty);
    if (!currentQuestion) {
        showToast('Soru yüklenemedi. Sayfayı yenileyin.');
        return;
    }

    difficultyBadgeEl.textContent = difficultyLabels[currentDifficulty];
    difficultyBadgeEl.className = `difficulty-badge ${currentDifficulty}`;

    mainScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');

    displayQuestion();
    startTimer();
}

// Soruyu göster
function displayQuestion() {
    questionTextEl.textContent = currentQuestion.question;

    if (currentQuestion.image) {
        questionImageEl.innerHTML = `<img src="${currentQuestion.image}" alt="Soru görseli">`;
        questionImageEl.classList.remove('hidden');
    } else {
        questionImageEl.classList.add('hidden');
    }

    const shuffledOptions = [...currentQuestion.options];
    const originalCorrectIndex = currentQuestion.correct;
    
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    
    shuffledCorrectIndex = shuffledOptions.indexOf(currentQuestion.options[originalCorrectIndex]);
    lastCorrectAnswerText = shuffledOptions[shuffledCorrectIndex];

    optionBtns.forEach((btn, index) => {
        const textEl = btn.querySelector('.option-text');
        if (textEl) {
            textEl.textContent = shuffledOptions[index];
        } else {
            btn.textContent = shuffledOptions[index];
        }
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });

    hideResultOverlay();
}

function spawnConfetti(count = 48) {
    confettiLayerEl.innerHTML = '';
    const colors = ['#34d399', '#22d3ee', '#a78bfa', '#fbbf24', '#f472b6', '#818cf8'];

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * 0.4}s`;
        piece.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
        piece.style.width = `${6 + Math.random() * 8}px`;
        piece.style.height = `${6 + Math.random() * 8}px`;
        confettiLayerEl.appendChild(piece);
    }
}

function hideResultOverlay() {
    if (resultTimeoutId) {
        clearTimeout(resultTimeoutId);
        resultTimeoutId = null;
    }
    resultOverlayEl.classList.add('hidden');
    resultOverlayEl.classList.remove('is-visible', 'result-success', 'result-failure', 'result-timeout');
    questionScreen.classList.remove('is-dimmed');
    confettiLayerEl.innerHTML = '';
    document.body.classList.remove('flash-success', 'flash-failure');
}

function showResult(type) {
    hideResultOverlay();

    let icon, title, subtitle, hint;

    if (type === 'timeout') {
        const t = resultVariants.timeout;
        icon = t.icon;
        title = t.title;
        subtitle = t.subtitle;
        hint = `${t.hint} Doğru cevap: ${lastCorrectAnswerText}`;
    } else {
        const pool = resultVariants[type];
        const pick = pool[Math.floor(Math.random() * pool.length)];
        icon = type === 'success' ? '✓' : '✗';
        title = pick.title;
        subtitle = pick.subtitle;
        hint = type === 'failure'
            ? `${resultHints.failure} Doğru cevap: ${lastCorrectAnswerText}`
            : resultHints.success;
    }

    const progressBar = resultProgressEl.querySelector('span');
    if (progressBar) {
        progressBar.style.animation = 'none';
        void progressBar.offsetWidth;
        progressBar.style.animation = `progressShrink ${RESULT_DISPLAY_MS}ms linear forwards`;
    }

    resultIconEl.textContent = icon;
    resultTitleEl.textContent = title;
    resultSubtitleEl.textContent = subtitle;
    resultHintEl.textContent = hint;

    resultOverlayEl.className = `result-overlay result-${type}`;
    resultOverlayEl.classList.remove('hidden');
    requestAnimationFrame(() => {
        resultOverlayEl.classList.add('is-visible');
    });

    questionScreen.classList.add('is-dimmed');

    playSound(type === 'success' ? 'success' : type === 'timeout' ? 'timeout' : 'failure');

    if (type === 'success') {
        document.body.classList.add('flash-success');
        spawnConfetti();
    } else {
        document.body.classList.add('flash-failure');
    }

    resultTimeoutId = setTimeout(() => {
        returnToMainScreen();
    }, RESULT_DISPLAY_MS);
}

function finishAnswer(type, chosenText = '') {
    const outcome = type === 'success' ? 'correct' : type === 'timeout' ? 'timeout' : 'wrong';
    recordAnswer(outcome, currentDifficulty, currentQuestion, lastCorrectAnswerText, chosenText);
    showResult(type);
}

// Timer başlat
function startTimer() {
    totalTime = timerDurations[currentDifficulty];
    timeLeft = totalTime;
    updateChronometerDisplay();

    currentTimer = setInterval(() => {
        timeLeft--;
        updateChronometerDisplay();

        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            handleTimeout();
        }
    }, 1000);
}

// Süre dolduğunda
function handleTimeout() {
    optionBtns.forEach(btn => {
        btn.disabled = true;
    });

    if (shuffledCorrectIndex !== null) {
        optionBtns[shuffledCorrectIndex].classList.add('correct');
    }

    finishAnswer('timeout');
}

// Seçenek butonlarına tıklama olayı
optionBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        clearInterval(currentTimer);

        optionBtns.forEach(b => {
            b.disabled = true;
        });

        const chosenText = btn.querySelector('.option-text')?.textContent || '';

        if (index === shuffledCorrectIndex) {
            btn.classList.add('correct');
            finishAnswer('success');
        } else {
            btn.classList.add('wrong');
            optionBtns[shuffledCorrectIndex].classList.add('correct');
            finishAnswer('failure', chosenText);
        }
    });
});

// Ana ekrana dön
function returnToMainScreen() {
    hideResultOverlay();

    questionScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');

    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }

    currentQuestion = null;
    currentDifficulty = null;
    timeLeft = 45;
    totalTime = 45;
    chronometerEl.classList.remove('phase-yellow', 'phase-red');
}

questionBackBtn.addEventListener('click', () => {
    returnToMainScreen();
});

document.querySelectorAll('.global-back-btn').forEach(btn => {
    if (btn !== questionBackBtn) {
        btn.addEventListener('click', () => {
            returnToMainScreen();
        });
    }
});

statsBtn.addEventListener('click', openStatsModal);
closeStatsModal.addEventListener('click', () => statsModal.classList.add('hidden'));
statsCloseBtn.addEventListener('click', () => statsModal.classList.add('hidden'));
statsModal.addEventListener('click', (e) => {
    if (e.target === statsModal) {
        statsModal.classList.add('hidden');
    }
});
newTurBtn.addEventListener('click', () => {
    startNewRound();
    statsModal.classList.add('hidden');
});
statsNewTurBtn.addEventListener('click', () => {
    startNewRound();
    statsModal.classList.add('hidden');
});
endTurBtn.addEventListener('click', endRound);
statsEndTurBtn.addEventListener('click', () => {
    if (roundStats.active) {
        endRound();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initQuestionQueues();
});

document.addEventListener('fullscreenchange', () => {
    const on = !!(document.fullscreenElement || document.webkitFullscreenElement);
    document.body.classList.toggle('is-fullscreen', on);
});

updateTurBar();
updateStatsModalButtons();