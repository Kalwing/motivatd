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
