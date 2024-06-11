document.addEventListener("DOMContentLoaded", () => {
  init();

  document
    .getElementById("promptForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      await generateContent();
    });

  document.getElementById("saveApiKey").addEventListener("click", () => {
    const apiKey = document.getElementById("apiKey").value;
    chrome.storage.local.set({ apiKey: apiKey }, () => {
      alert("API Key saved!");
    });
  });

  document.getElementById("checkApiKey").addEventListener("click", () => {
    chrome.storage.local.get(["apiKey"], (result) => {
      alert("Current API Key: " + result.apiKey);
    });
  });

  document.getElementById("menu_main").addEventListener("click", () => {
    document.getElementById("main").style.display = "block";
    document.getElementById("config").style.display = "none";
  });

  document.getElementById("menu_conf").addEventListener("click", () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("config").style.display = "block";
  });

  const fileInput = document.getElementById("cv");
  const fileNameInput = document.getElementById("cv_name");

  // Load stored file name and content if available
  chrome.storage.local.get(["fileName", "fileContent"], function (result) {
    if (result.fileName) {
      fileNameInput.disabled = false;
      fileNameInput.value = result.fileName;
      fileNameInput.disabled = true;
    }
    if (result.fileContent) {
      console.log("Stored file content:", result.fileContent);
    }
  });

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const fileName = file.name;
      chrome.storage.local.set(
        { fileName: fileName, fileContent: content },
        function () {
          console.log("File data saved");
          fileNameInput.disabled = false;
          fileNameInput.value = fileName;
          fileNameInput.disabled = true;
        }
      );
    };
    reader.readAsText(file);
  });
});

function init() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSource" }, (response) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, "text/html");
      const firstDiv = doc.querySelector(".jobsearch-RightPane");
      const childrenArray = Array.from(firstDiv.children);
      const responseHtml = childrenArray
        .map((child) => child.outerHTML)
        .join("");

      // Add job offer website to background prompt
      prompt_standard =
        responseHtml +
        "\n'''Extract the major keypoints of this offer. Try to make them appear in your cover letter. Make sure you don't repeat yourself.'''";
    });
  });
}

async function generateContent() {
  const resultText = document.getElementById("resultText");
  const resultDiv = document.getElementById("result");

  try {
    const apiKey = await getApiKey();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: prompt_standard }],
        model: "gpt-3.5-turbo",
      }),
    });

    if (!response.ok) throw new Error("API Request error");

    const data = await response.json();
    resultText.textContent = data.choices[0].message["content"];
    resultDiv.style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    alert("Error: " + error.message);
  }
}

// display user API key
function getApiKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["apiKey"], (result) => {
      if (result.apiKey) {
        resolve(result.apiKey);
      } else {
        reject(new Error("No API Key found"));
      }
    });
  });
}
