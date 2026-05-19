// Trigonometri Yolu - Soru Verileri
const questions = {
    easy: [
        { question: "Sin30º değeri kaçtır?", options: ["1", "0", "1/2", "1/3"], correct: 2 },
        { question: "Cos180º değeri kaçtır?", options: ["0", "1", "1/2", "-1"], correct: 3 },
        { question: "tanx.cotx=?", options: ["2", "1", "0", "-1"], correct: 1 },
        { question: "sin²x+cos²x =?", options: ["1", "0", "-1", "2"], correct: 0 },
        { question: "sin60º - cos30º + tan45º =?", options: ["0", "1/2", "2", "1"], correct: 3 },
        { question: "sinx + cosx = 1/3 ise sinx.cosx =?", options: ["-4/9", "-2/9", "1", "-1/9"], correct: 0 },
        { question: "tanx + cotx = 3 ise tan²x + cot²x =?", options: ["5", "6", "7", "8"], correct: 2 },
        { question: "sin1980º=?", options: ["1/2", "1", "0", "-1"], correct: 2 },
        { question: "tan (-1260º)=?", options: ["0", "Tanımsız", "1", "-1"], correct: 0 },
        { question: "a=sin15 b=cos80 c=cos20 değerlerinin sıralaması hangisidir?", options: ["a<b<c", "b<a<c", "c<a<b", "a<c<b"], correct: 1 },
        { question: "-780° lik açının esas ölçüsü x°, 7485°lik açının esas ölçüsü y°dir. Buna göre x + y toplamının esas ölçüsü kaç derecedir?", options: ["225", "45", "135", "315"], correct: 0 },
        { question: "x ve y birer gerçek sayıdır. A = 2sinx – 3cosy olduğuna göre, A'nın kaç farklı tam sayı değeri vardır?", options: ["9", "10", "11", "12"], correct: 2 },
        { question: "sin²1 + sin²2 + sin²3 +....+ sin²90° toplamının sonucu kaçtır?", options: ["45", "89/2", "87/2", "91/2"], correct: 3 },
        { question: "a = sin200° b = tan154° c = cos350° olduğuna göre; a, b, c nin işaretlerini bulunuz.", options: ["-,-", "+,+,+", "+,-,-", "-,-,+"], correct: 0 },
        { question: "Dik koordinat düzleminde pozitif yönlü 270°lik merkez açı, orijin merkezli birim çemberi A noktasında kesmektedir. Buna göre A noktasının koordinatlarını bulunuz.", options: ["1,1", "0,1", "0,-1", "-1,0"], correct: 2 },
        { question: "x + y = 90° ise tan (2x+3y) . sin (x+2y) =?", options: ["tany", "cosy", "siny", "coty"], correct: 2 },
        { question: "(tanx + cotx) : secx =?", options: ["secx", "cosecx", "tanx", "cosx"], correct: 1 },
        { question: "4sinx = 5cosx ise tanx =?", options: ["1", "-1", "4/5", "5/4"], correct: 3 },
        { question: "arctan (-1) =?", options: ["315°", "135°", "45°", "225°"], correct: 0 },
        { question: "cos² (arctan1/2) =?", options: ["4/5", "3/5", "2/5", "1/5"], correct: 0 },
        { question: "cos(x) = 1/2 denkleminin çözüm kümesi nedir?", options: ["x = π/3 + 2kπ veya x = 5π/3 + 2kπ", "x = π/6 + 2kπ veya x = 11π/6 + 2kπ", "x = π/4 + kπ veya x = 7π/4 + kπ", "x = π/2 + kπ veya x = 3π/2 + kπ"], correct: 1 },
        { question: "sin(2x) = √3/2 denkleminin çözüm kümesi nedir?", options: ["x = π/6 + kπ veya x = π/3 + kπ", "x = π/12 + kπ veya x = 5π/12 + kπ", "x = π/4 + kπ veya x = 3π/4 + kπ", "x = π/8 + kπ veya x = 3π/8 + kπ"], correct: 1 },
        { question: "tan(x - π/4) = 1 denkleminin çözüm kümesi nedir?", options: ["x = π/2 + kπ", "x = π/4 + kπ", "x = 3π/4 + kπ", "x = π + kπ"], correct: 3 },
        { question: "2cos²(x) - 1 = 0 denkleminin çözüm kümesi nedir?", options: ["x = π/4 + kπ/2", "x = π/2 + kπ", "x = π/3 + kπ", "x = π/6 + kπ"], correct: 0 },
        { question: "sin(3x) = cos(x) denkleminin çözüm kümesi nedir?", options: ["x = π/8 + kπ/2 veya x = π/4 + kπ", "x = π/6 + kπ/2 veya x = π/3 + kπ", "x = π/10 + kπ/2 veya x = π/5 + kπ", "x = π/12 + kπ/2 veya x = π/6 + kπ"], correct: 1 },
        { question: "sin(x) + cos(x) = 0 denkleminin çözüm kümesi nedir?", options: ["x = π/4 + kπ", "x = 3π/4 + kπ", "x = 3π/4 + kπ", "x = π/2 + kπ"], correct: 2 },
        { question: "tan²(x) - 1 = 0 denkleminin çözüm kümesi nedir?", options: ["x = π/4 + kπ/2", "x = π/4 + kπ", "x = π/2 + kπ", "x = π/3 + kπ"], correct: 0 },
        { question: "sin(x) = 1/2 denkleminin [0, 2π] aralığındaki çözüm kümesi nedir?", options: ["{π/6, 5π/6}", "{π/3, 2π/3}", "{π/4, 3π/4}", "{π/2, 3π/2}"], correct: 0 },
        { question: "cos(2x) = 0 denkleminin çözüm kümesi nedir?", options: ["x = π/4 + kπ/2", "x = π/2 + kπ", "x = π/3 + kπ", "x = π/6 + kπ"], correct: 0 }
    ],
    medium: [
        { question: "(tan210° - sin300°) / (cos360° - cos120°) ifadesinin değeri kaçtır?", options: ["√3/2", "√3/6", "1/2", "5√3/9"], correct: 3 },
        { question: "(cos2π - sinπ) / (cot(π/4) + tan2π) ifadesinin değeri kaçtır?", options: ["-1", "0", "-2", "1"], correct: 3 },
        { question: "arcsin(√3/2) ifadesinin eşiti aşağıdakilerden hangisidir?", options: ["π/3", "π/6", "2π/3", "π/2"], correct: 0 },
        { question: "arctan1 ifadesinin eşiti aşağıdakilerden hangisidir?", options: ["5π/4", "π/4", "π/6", "π/3"], correct: 1 },
        { question: "(tan50° / cot40°) + (sin20° / cos250°) işleminin sonucu kaçtır?", options: ["2", "1", "-1", "0"], correct: 3 },
        { question: "sin²(2π - x) . tan²(π/2 + x) ifadesinin eşiti aşağıdakilerden hangisidir?", options: ["tan²x", "cos²x", "1", "sin²x"], correct: 1 },
        { question: "7x = π olduğuna göre, (cos3x / cos4x) - (sin5x / sin2x) ifadesinin değeri kaçtır?", options: ["2", "0", "-2", "1"], correct: 2 },
        { question: "f(x) = 5 . sin⁴(3x - 1) fonksiyonunun esas periyodu hangisidir?", options: ["π/2", "π/3", "π/6", "2π/3"], correct: 1 },
        { question: "tan(π - arcsin(1/1/5)) ifadesinin değeri kaçtır?", options: ["-1/2", "1/2", "2", "-2"], correct: 0 },
        { question: "tanx - cotx = 5 olduğuna göre, tan²x + cot²x kaçtır?", options: ["26", "27", "25", "22"], correct: 1 },
        { question: "cos60° + cos61° + cos62° + ... + cos119° ifadesinin değeri kaçtır?", options: ["-1", "-1/2", "1", "1/2"], correct: 3 },
        { question: "ifadesine göre; (2sinx - cosx) / (2cosx + sinx) = 1/3 olduğuna göre, cotx kaçtır?", options: ["1", "2", "1/2", "1/3"], correct: 0 },
        { question: "cos120° / tan330° ifadesinin değeri kaçtır?", options: ["1/2", "√3/2", "-√3/2", "-1/2"], correct: 1 },
        { question: "3π/2 < x < 2π olmak üzere sinx = -7/25 olduğuna göre, secx kaçtır?", options: ["25/24", "-25/24", "-24/25", "24/25"], correct: 0 },
        { question: "8sinx - 2 ifadesinin alabileceği en büyük değer kaçtır?", options: ["3", "6", "4", "5"], correct: 1 },
        { question: "sin²x / (1 - cosx) ifadesi aşağıdakilerden hangisine eşittir?", options: ["sinx - cosx", "1 + sinx", "1 + cosx", "1 - sinx"], correct: 2 },
        { question: "sin²(π/8) + cos²(π/8) ifadesinin değeri kaçtır?", options: ["2", "1", "1/2", "1/3"], correct: 1 },
        { question: "(3sin²50° + 3cos²50° - 2) / (4sin²40° + 4cos²40°) ifadesinin değeri kaçtır?", options: ["1/5", "1/4", "1/3", "1/2"], correct: 1 },
        { question: "sinx - cosx = 1/5 olduğuna göre, sinx . cosx ifadesinin değeri kaçtır?", options: ["2", "12/25", "3/5", "18/25"], correct: 1 },
        { question: "sinx - cosx / (2sinx + 4cosx) = 1/3 olduğuna göre, cotx kaçtır?", options: ["1/8", "1/7", "1/6", "1/3"], correct: 1 },
        { question: "(sin²20° + sin²70°) / (tan25° . tan65°) ifadesinin değeri kaçtır?", options: ["1", "2", "3", "4"], correct: 0 },
        { question: "ABC bir üçgen olmak üzere, cos(A + B) + cosC ifadesi aşağıdakilerden hangisine eşittir?", options: ["0", "1", "2cosC", "-1"], correct: 0 },
        { question: "x = π/10 olmak üzere, (sin3x . cos6x) / (cos4x . sin7x) ifadesinin değeri kaçtır?", options: ["2", "1", "0", "-1"], correct: 3 },
        { question: "cos(π/4) - sin(9π/4) + cot(17π/4) ifadesinin değeri kaçtır?", options: ["2", "1", "0", "-1"], correct: 1 },
        { question: "f(x) = sin4x + tan6x olduğuna göre, f(π/24) değeri kaçtır?", options: ["1/4", "1/2", "1", "3/2"], correct: 3 },
        { question: "cot(-θ) / tan(-θ) ifadesi aşağıdakilerden hangisine eşittir?", options: ["cot²θ", "-cotθ", "tan²θ", "-cot²θ"], correct: 0 },
        { question: "(sin(-300°) + cos(-150°)) / tan(-60°) ifadesinin değeri kaçtır?", options: ["2", "1", "0", "-1"], correct: 3 },
        { question: "arctan(√3) ifadesinin değeri kaçtır?", options: ["π/8", "π/6", "π/4", "π/3"], correct: 3 }
    ],
    hard: [
        { question: "cos[π/2 - arcsin(3/5)] ifadesinin değeri kaçtır?", options: ["1", "4/5", "3/5", "2/5"], correct: 2 },
        { question: "Bir ABC üçgeninin kenarları arasında c² = a² + b² + a.b bağıntısı vardır. Buna göre, m(Ĉ) kaç derecedir?", options: ["100", "110", "120", "135"], correct: 2 },
        { question: "cos(π/2 + arccot2) ifadesinin değeri kaçtır?", options: ["-1/√5", "1/√5", "2/√5", "-2/√5"], correct: 0 },
        { question: "Şekildeki ABC üçgeninde m(BÂC) = 45°, |AB| = 40 cm ve |AC| = 30√2 cm olduğuna göre, |BC| = x kaç cm'dir?", image: "images/zor4.png", options: ["10√10", "30", "10√11", "20"], correct: 0 },
        { question: "Şekildeki ABC üçgeninde |AC| = 20 cm, |BC| = 60 cm ve m(BÂC) = x + 90° olduğuna göre, sinx kaçtır?", image: "images/zor5.png", options: ["1/|√10", "1/√5", "1/3", "1/2"], correct: 0 },
        { question: "sin42° . cos18° + cos42° . sin18° ifadesinin değeri kaçtır?", options: ["√3/2", "1/2", "1/3", "√3/4"], correct: 0 },
        { question: "sin105° ifadesinin değeri kaçtır?", options: ["(√6 + √2) / 4", "(√6 + √2) / 5", "(√6 + √2) / 6", "(√6 - √2) / 4"], correct: 0 },
        { question: "(tan40° + tan20°) / (1 - tan40° . tan20°) ifadesinin değeri kaçtır?", options: ["1", "√2", "√3", "2"], correct: 2 },
        { question: "tanx = 1/3 olduğuna göre, sin2x kaçtır?", options: ["1/10", "1/5", "2/5", "3/5"], correct: 3 },
        { question: "(cosx + 5) . (7 - cosx) ifadesinin en büyük değeri kaçtır?", options: ["40", "36", "35", "28"], correct: 1 },
        { question: "2 . sin22,5° . cos22,5° ifadesinin değeri kaçtır?", options: ["1/√2", "√3/2", "1/2", "1"], correct: 0 },
        { question: "3 - 2sin²x = √3 olduğuna göre, cos2x kaçtır?", options: ["√3 - 2", "√3 - 1", "2√3 / 3", "0"], correct: 0 },
        { question: "sin²6° + 5 . tan20° . tan70° + sin²84° ifadesinin değeri kaçtır?", options: ["4", "5", "6", "7"], correct: 2 },
        { question: "a, b ve c dar açılar olmak üzere cosa = 1/4, cosb = 1/2, cosc = 1/3 olduğuna göre, aşağıdakilerden hangisi doğrudur?", options: ["a > b > c", "a > c > b", "b > c > a", "c > b > a"], correct: 1 },
        { question: "sin60° . tan30° - √2 . cos45° ifadesinin değeri kaçtır?", options: ["-1/2", "1/2", "3/2", "1"], correct: 0 }
    ]
};

// Değişkenler
let currentTimer = null, currentDifficulty = null, currentQuestion = null;
let timeLeft = 0, totalTime = 0, shuffledCorrectIndex = null;

// Süreler (İstek üzerine güncellendi)
const timerDurations = { easy: 45, medium: 60, hard: 75 };

// DOM Elementleri
const mainScreen = document.getElementById('mainScreen'), questionScreen = document.getElementById('questionScreen');
const timerEl = document.getElementById('timer'), questionTextEl = document.getElementById('questionText');
const questionImageEl = document.getElementById('questionImage'), optionBtns = document.querySelectorAll('.option-btn');
const resultMessageEl = document.getElementById('resultMessage');

// Zorluk seçimi
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentDifficulty = btn.dataset.difficulty;
        totalTime = timerDurations[currentDifficulty];
        startQuestion();
    });
});

function startQuestion() {
    const list = questions[currentDifficulty];
    currentQuestion = list[Math.floor(Math.random() * list.length)];
    mainScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    questionTextEl.textContent = currentQuestion.question;
    if (currentQuestion.image) {
        questionImageEl.innerHTML = `<img src="${currentQuestion.image}" alt="Soru">`;
        questionImageEl.classList.remove('hidden');
    } else {
        questionImageEl.classList.add('hidden');
    }

    const opts = [...currentQuestion.options];
    const correctVal = currentQuestion.options[currentQuestion.correct];
    for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    shuffledCorrectIndex = opts.indexOf(correctVal);

    optionBtns.forEach((btn, i) => {
        btn.textContent = opts[i];
        btn.className = 'option-btn';
        btn.disabled = false;
    });
    resultMessageEl.classList.add('hidden');
}

function startTimer() {
    timeLeft = totalTime;
    updateTimerUI();
    currentTimer = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            showResult(false, "SÜRE DOLDU!");
        }
    }, 1000);
}

function updateTimerUI() {
    timerEl.textContent = timeLeft;
    const ratio = timeLeft / totalTime;
    timerEl.classList.remove('timer-green', 'timer-yellow', 'timer-red');
    if (ratio > 0.5) timerEl.classList.add('timer-green');
    else if (ratio > 0.25) timerEl.classList.add('timer-yellow');
    else timerEl.classList.add('timer-red');
}

optionBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        clearInterval(currentTimer);
        const isCorrect = (i === shuffledCorrectIndex);
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) optionBtns[shuffledCorrectIndex].classList.add('correct');
        optionBtns.forEach(b => b.disabled = true);
        showResult(isCorrect, isCorrect ? "TEBRİKLER!" : "YANLIŞ CEVAP!");
    });
});

function showResult(isSuccess, msg) {
    resultMessageEl.textContent = msg;
    resultMessageEl.className = `result-message ${isSuccess ? 'success' : 'failure'}`;
    resultMessageEl.classList.remove('hidden');
    setTimeout(returnToMain, 2500);
}

function returnToMain() {
    questionScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
}

// Modal Kontrolleri
const infoModal = document.getElementById('infoModal');
document.getElementById('infoBtn').onclick = () => infoModal.classList.remove('hidden');
document.getElementById('closeModal').onclick = () => infoModal.classList.add('hidden');
document.getElementById('backBtn').onclick = () => infoModal.classList.add('hidden');
document.querySelector('.global-back-btn').onclick = returnToMain;
