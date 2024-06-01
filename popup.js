document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('promptForm');
    const promptInput = document.getElementById('promptInput');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');

    const parser = new DOMParser();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSource" }, (response) => {
        // Only keep what's inside the first div, to avoid overusing GPT with scripts etc...
        doc = parser.parseFromString(response, 'text/html');
        firstDiv = doc.querySelector('.jobsearch-RightPane');
        childrenArray = Array.from(firstDiv.children);
        response = childrenArray.map(child => child.outerHTML).join('');

        // Add job offer website to background prompt
        prompt_standard = prompt_standard + response + "\n'''Extract the major keypoints of this offer. Try to make them appear in your cover letter. Make sure you don't repeat yourself.'''";
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
            'Authorization': 'Bearer sk-proj-7WFNC1E4kWHUKjaBdR4AT3BlbkFJtFFiQ33UataSlwQXPTRf'
            },
            body: JSON.stringify({
            messages:  [{ role: "system", content: prompt_standard }],
            model: "gpt-3.5-turbo"
            })
        });
        if (!response.ok) {
            throw new Error('API Request error', response);
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