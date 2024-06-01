document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('promptForm');
    const promptInput = document.getElementById('promptInput');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const prompt = promptInput.value;
      if (!prompt) {
        return;
      }

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer skccc'
            },
            body: JSON.stringify({
            messages:  [{ role: "system", content: prompt }],
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

// Get source code
function get_page_source_code() {
  console.log("Func: get_page_source_code");
  return document.documentElement.outerHTML;
}

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

// Get source code
function get_page_source_code() {
  console.log("Func: get_page_source_code");
  return document.documentElement.outerHTML;
}
