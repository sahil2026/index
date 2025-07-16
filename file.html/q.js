const quizBox = document.getElementById("quiz-box");
const levelDisplay = document.getElementById("level");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const levelupSound = document.getElementById("levelup-sound");
const winSound = document.getElementById("win-sound");

function playCorrect() { correctSound.play(); }
function playWrong() { wrongSound.play(); }
function playLevelUp() { levelupSound.play(); }
function playWin() { winSound.play(); }

let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;

const allLevels = [
  // Level 1
  [
    { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: "Delhi" },
    { question: "What color is the sky on a clear day?", options: ["Red", "Green", "Blue", "Black"], answer: "Blue" },
    { question: "How many legs does a dog have?", options: ["2", "3", "4", "5"], answer: "4" },
    { question: "Which animal says 'meow'?", options: ["Dog", "Cat", "Cow", "Horse"], answer: "Cat" },
    { question: "What do you drink to stay hydrated?", options: ["Oil", "Juice", "Water", "Cola"], answer: "Water" },
    { question: "What shape is a football?", options: ["Square", "Round", "Triangle", "Oval"], answer: "Round" },
    { question: "What is the color of a banana?", options: ["Red", "Yellow", "Blue", "Green"], answer: "Yellow" },
    { question: "Which number comes after 4?", options: ["2", "3", "5", "6"], answer: "5" }
  ],
  // Level 2
  [
    { question: "What planet do we live on?", options: ["Mars", "Venus", "Earth", "Jupiter"], answer: "Earth" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which of these is a bird?", options: ["Dog", "Cat", "Eagle", "Frog"], answer: "Eagle" },
    { question: "What is the color of grass?", options: ["Blue", "Green", "Brown", "Orange"], answer: "Green" },
    { question: "Which fruit is red inside?", options: ["Apple", "Banana", "Guava", "Mango"], answer: "Apple" },
    { question: "How many hours are in a day?", options: ["24", "12", "30", "48"], answer: "24" },
    { question: "Which one is a domestic animal?", options: ["Lion", "Tiger", "Goat", "Leopard"], answer: "Goat" },
    { question: "What do bees make?", options: ["Milk", "Honey", "Sugar", "Oil"], answer: "Honey" }
  ],
  // Level 3
  [
    { question: "What gas do plants use for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], answer: "Carbon Dioxide" },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "What is the boiling point of water?", options: ["90°C", "80°C", "100°C", "110°C"], answer: "100°C" },
    { question: "What is the square root of 16?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: "Mars" },
    { question: "Which is the tallest mammal?", options: ["Elephant", "Horse", "Giraffe", "Tiger"], answer: "Giraffe" },
    { question: "Which day comes after Friday?", options: ["Thursday", "Saturday", "Monday", "Sunday"], answer: "Saturday" },
    { question: "How many letters in the English alphabet?", options: ["24", "25", "26", "27"], answer: "26" }
  ],
  // Level 4
  [
    { question: "Who wrote the national anthem of India?", options: ["Tagore", "Gandhi", "Nehru", "Tilak"], answer: "Tagore" },
    { question: "Which organ pumps blood?", options: ["Liver", "Brain", "Heart", "Lungs"], answer: "Heart" },
    { question: "What is the largest ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: "Pacific" },
    { question: "What currency is used in the USA?", options: ["Euro", "Dollar", "Pound", "Peso"], answer: "Dollar" },
    { question: "Who invented the telephone?", options: ["Newton", "Einstein", "Bell", "Edison"], answer: "Bell" },
    { question: "What does a thermometer measure?", options: ["Weight", "Speed", "Temperature", "Height"], answer: "Temperature" },
    { question: "Which state is known as the 'Land of Five Rivers'?", options: ["Punjab", "Kerala", "UP", "Rajasthan"], answer: "Punjab" },
    { question: "Which part of the plant makes food?", options: ["Root", "Stem", "Leaf", "Flower"], answer: "Leaf" }
  ], 
  // Level 5
  [
    { question: "What is the largest bone in the human body?", options: ["Tibia", "Femur", "Skull", "Humerus"], answer: "Femur" },
    { question: "Who painted the Mona Lisa?", options: ["Picasso", "Leonardo da Vinci", "Michelangelo", "Van Gogh"], answer: "Leonardo da Vinci" },
    { question: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
    { question: "Which country gifted the Statue of Liberty to the US?", options: ["France", "Germany", "Italy", "UK"], answer: "France" },
    { question: "What is the freezing point of water?", options: ["0°C", "10°C", "32°C", "-5°C"], answer: "0°C" },
    { question: "Which planet has the most moons?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Saturn" },
    { question: "Who is the father of computers?", options: ["Turing", "Jobs", "Charles Babbage", "Gates"], answer: "Charles Babbage" },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" }
  ],

  // Level 6
  [
    { question: "Which vitamin is produced in the skin with sunlight?", options: ["A", "B", "C", "D"], answer: "D" },
    { question: "Which Nobel Prize did Albert Einstein win?", options: ["Physics", "Chemistry", "Peace", "Literature"], answer: "Physics" },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"], answer: "Mitochondria" },
    { question: "Which blood cells fight infections?", options: ["Red", "White", "Platelets", "Plasma"], answer: "White" },
    { question: "Which instrument measures earthquakes?", options: ["Thermometer", "Barometer", "Seismograph", "Hydrometer"], answer: "Seismograph" },
    { question: "Which is the longest river in the world?", options: ["Amazon", "Yangtze", "Mississippi", "Nile"], answer: "Nile" },
    { question: "What is the main gas in the sun?", options: ["Helium", "Hydrogen", "Nitrogen", "Oxygen"], answer: "Hydrogen" },
    { question: "Which language has the most native speakers?", options: ["English", "Hindi", "Mandarin", "Spanish"], answer: "Mandarin" }
  ],

  // Level 7
  [
    { question: "Who developed the theory of evolution?", options: ["Einstein", "Darwin", "Galileo", "Newton"], answer: "Darwin" },
    { question: "Which is the smallest prime number?", options: ["1", "2", "3", "0"], answer: "2" },
    { question: "Which organ filters blood in the human body?", options: ["Lungs", "Liver", "Heart", "Kidneys"], answer: "Kidneys" },
    { question: "What is H2SO4 commonly known as?", options: ["Nitric Acid", "Hydrochloric Acid", "Sulphuric Acid", "Acetic Acid"], answer: "Sulphuric Acid" },
    { question: "Which country has the largest population?", options: ["USA", "India", "Russia", "China"], answer: "India" },
    { question: "How many players are in a cricket team?", options: ["10", "11", "12", "9"], answer: "11" },
    { question: "What is the SI unit of force?", options: ["Pascal", "Joule", "Newton", "Watt"], answer: "Newton" },
    { question: "In which year did man first land on the moon?", options: ["1969", "1971", "1955", "1980"], answer: "1969" }
  ],

  // Level 8
  [
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
    { question: "What is the chemical symbol for gold?", options: ["Ag", "Gd", "Au", "Pb"], answer: "Au" },
    { question: "Which element is a halogen?", options: ["Chlorine", "Oxygen", "Calcium", "Carbon"], answer: "Chlorine" },
    { question: "Which layer protects Earth from UV rays?", options: ["Stratosphere", "Troposphere", "Ozone", "Ionosphere"], answer: "Ozone" },
    { question: "Which mathematician invented calculus independently?", options: ["Gauss", "Fermat", "Leibniz", "Pascal"], answer: "Leibniz" },
    { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
    { question: "How many chromosomes are in human cells?", options: ["42", "46", "44", "48"], answer: "46" },
    { question: "What is the SI unit of electric current?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ampere" }
  ],

  // Level 9
  [
    { question: "Which gas causes global warming?", options: ["CO2", "O2", "N2", "H2"], answer: "CO2" },
    { question: "Which was the first country to launch a satellite?", options: ["USA", "Russia", "India", "China"], answer: "Russia" },
    { question: "What does DNA stand for?", options: ["Deoxyribo Nucleic Acid", "Double Nucleic Acid", "Dino Nucleic Atom", "None"], answer: "Deoxyribo Nucleic Acid" },
    { question: "What is the longest bone in the body?", options: ["Skull", "Spine", "Femur", "Humerus"], answer: "Femur" },
    { question: "Which organ has the most neurons?", options: ["Heart", "Liver", "Brain", "Skin"], answer: "Brain" },
    { question: "Which Indian won the first Nobel Prize?", options: ["Tagore", "Kalam", "Gandhi", "C.V. Raman"], answer: "Tagore" },
    { question: "Which Indian state has the highest literacy rate?", options: ["Kerala", "Punjab", "Goa", "Tamil Nadu"], answer: "Kerala" },
    { question: "Which country lies on two continents?", options: ["Spain", "Turkey", "Australia", "South Africa"], answer: "Turkey" }
  ],

  // Level 10
  [
    { question: "Which Indian was called the 'Missile Man'?", options: ["Raman", "Kalam", "Vikram Sarabhai", "Tagore"], answer: "Kalam" },
    { question: "Which Indian satellite was first sent to Mars?", options: ["Mangalyaan", "Chandrayaan", "RISAT", "INSAT"], answer: "Mangalyaan" },
    { question: "Which Indian PM signed the Indo-US nuclear deal?", options: ["Modi", "Manmohan Singh", "Nehru", "Indira Gandhi"], answer: "Manmohan Singh" },
    { question: "Which king built the Taj Mahal?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"], answer: "Shah Jahan" },
    { question: "In which year did India become a Republic?", options: ["1947", "1950", "1952", "1949"], answer: "1950" },
    { question: "Where is the Great Barrier Reef located?", options: ["Australia", "USA", "India", "Brazil"], answer: "Australia" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["India", "China", "Japan", "Thailand"], answer: "Japan" },
    { question: "Who was the first woman PM of India?", options: ["Sonia Gandhi", "Indira Gandhi", "Pratibha Patil", "Sarojini Naidu"], answer: "Indira Gandhi" }
  ],
];
function loadQuestion() {
  levelDisplay.textContent = `Level: ${currentLevel + 1}`;
  const currentQ = allLevels[currentLevel][currentQuestionIndex];
  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = "";
  currentQ.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, btn);
    optionsEl.appendChild(btn);
  });
  nextBtn.classList.add("hidden");
}

function checkAnswer(selected, btn) {
  const correct = allLevels[currentLevel][currentQuestionIndex].answer;
  const buttons = document.querySelectorAll(".option");

  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) {
      b.classList.add("correct");
    } else if (b.textContent === selected) {
      b.classList.add("wrong");
    }
  });

  if (selected === correct) {
    score++;
    playCorrect();
  } else {
    playWrong();
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < 8) {
    loadQuestion();
  } else {
    currentLevel++;
    if (currentLevel < allLevels.length) {
      playLevelUp();
      currentQuestionIndex = 0;
      loadQuestion();
    } else {
      endQuiz();
    }
  }
};

function endQuiz() {
  playWin();
  quizBox.classList.add("hidden");
  resultEl.classList.remove("hidden");

  const playerName = prompt("🎓 Enter your name for the leaderboard:") || "Anonymous";
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  leaderboard.push({ name: playerName, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));

  let boardHTML = "<h3>🏆 Leaderboard</h3><ol>";
  leaderboard.forEach(entry => {
    boardHTML += `<li>${entry.name}: ${entry.score}</li>`;
  });
  boardHTML += "</ol>";

  resultEl.innerHTML = `
    <h2>🎉 You Finished the Royal Quiz!</h2>
    <p>Your Score: ${score} / ${allLevels.length * 8}</p>
    ${boardHTML}
  `;
}

window.onload = () => {
  loadQuestion();
};
