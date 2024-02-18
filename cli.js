const readline = require('readline');

const vocab = {
  "Gate": {
    "grammarType": "Nouns",
    "declension": "1",
    "gender": "feminine",
    "words": ["porta", "portae", "portae", "portam", "porta"]
  },
  "Gates": {
    "grammarType": "Nouns",
    "declension": "1",
    "gender": "feminine",
    "words": ["portae", "portarum", "portis", "portas", "portis"]
  },
  "Friend": {
    "grammarType": "Nouns",
    "declension": "2",
    "gender": "masculine",
    "words": ["amicus", "amici", "amico", "amicum", "amico"]
  },
  // ... (add more nouns as needed)
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function quiz() {
  console.log("Welcome to the Lingua Latina Declension Quiz!");
  let score = 0;
  const numQuestions = Object.keys(vocab).length;

  function askQuestion(index) {
    const currentNoun = Object.keys(vocab)[index];
    const currentData = vocab[currentNoun];
    const correctWords = currentData.words;

    rl.question(`\nProvide the correct words for the ${currentData.grammarType} '${currentNoun}': `, (userAnswer) => {
      const userWords = userAnswer.split(',').map(word => word.trim());
      
      const isCorrect = userWords.every((word, i) => word.toLowerCase() === correctWords[i].toLowerCase());

      if (isCorrect) {
        console.log("Correct!");
        score++;
      } else {
        console.log(`Wrong! The correct words are: ${correctWords.join(', ')}`);
      }

      if (index < numQuestions - 1) {
        askQuestion(index + 1);
      } else {
        console.log(`\nQuiz complete! Your score: ${score}/${numQuestions}`);
        rl.close();
      }
    });
  }

  askQuestion(0);
}

if (require.main === module) {
  quiz();
}
