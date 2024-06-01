document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('promptForm');
    const promptInput = document.getElementById('promptInput');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');


    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSource" }, (response) => {
        console.log(response);
        prompt_standard = prompt_standard + response;
      });
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      try {
        console.log(prompt_standard)
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-proj-4jixGyefCO1KDaNnqbp0T3BlbkFJIpxNtGHWgu6c1P23h7zY'
            },
            body: JSON.stringify({
            messages:  [{ role: "system", content: prompt_standard }],
            model: "gpt-3.5-turbo"
            })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la requête API');
        }

        const data = await response.json();
        const result = data.choices[0].message["content"];
        console.log(data);
        resultText.textContent = result;
        resultDiv.style.display = 'block';
        console.log(resultText);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a").forEach(function (element) {
    element.addEventListener("click", function () {
      alert("Option cliquée: " + this.textContent);
    });
  });
});

// Create text button
document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("btnText");
  button.addEventListener("click", function () {
    console.log("Click: btnText");
    source_code = get_page_source_code();
    console.log(source_code);
  });
});

// Create email button
document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("btnEmail");
  button.addEventListener("click", function () {
    console.log("Click: btnEmail");
    source_code = get_page_source_code();
    console.log(source_code);
  });
});