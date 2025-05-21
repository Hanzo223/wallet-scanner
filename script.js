const words = [
  "crypto", "wallet", "token", "ledger", "seed", "vault", "secure",
  "matrix", "contract", "block", "node", "stake", "alpha", "price", "gas",
  "bit", "smart", "toggle", "pulse", "layer", "hash", "mining"
];

// DOM Elements
const scannerOutput = document.getElementById("scanner-output");
const resultDiv = document.getElementById("result");
const walletDisplay = document.getElementById("wallet-display");
const walletIcon = document.getElementById("wallet-icon");
const walletName = document.getElementById("wallet-name");
const walletBalance = document.getElementById("wallet-balance");
const seedPhrase = document.getElementById("seed-phrase");

// Wallet options
const wallets = [
  { name: "Phantom Wallet", image: "images/phantom.png" },
  { name: "Trust Wallet", image: "images/trust.png" },
  { name: "Exodus Wallet", image: "images/exodus.png" }
];

let scanInterval;

// Generate one line of random 8 words (no repeats in line)
function generateRandomWords(count) {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  return "wallet balance 0: " + selected.join(" ");
}

// Start scanning animation
function startScan() {
  // Reset display
  scannerOutput.innerHTML = "";
  resultDiv.classList.add("hidden");
  walletDisplay.style.display = "none";
  seedPhrase.textContent = "";

  // Start interval
  scanInterval = setInterval(() => {
    const line = document.createElement("div");
    line.textContent = generateRandomWords(9);
    scannerOutput.appendChild(line);
    scannerOutput.scrollTop = scannerOutput.scrollHeight;
  }, 1);

  // Stop after 20 seconds and show result
  setTimeout(showResult, 20000);
}

// Show wallet result
function showResult() {
  clearInterval(scanInterval);

  // Select random wallet and balance
  const selected = wallets[Math.floor(Math.random() * wallets.length)];
  const randomBalance = (Math.random() * (5000 - 100) + 100).toFixed(2);

  // Set UI
  walletIcon.src = selected.image;
  walletName.textContent = selected.name;
  walletBalance.textContent = `$${randomBalance} Available`;

  // Generate unique 12-word seed phrase
  const shuffledWords = [...words].sort(() => 0.5 - Math.random());
  const phrase = shuffledWords.slice(0, 12).join(" ");
  seedPhrase.textContent = phrase;

  // Reveal result
  walletDisplay.style.display = "flex";
  resultDiv.classList.remove("hidden");
}

// Auto start
window.onload = startScan;