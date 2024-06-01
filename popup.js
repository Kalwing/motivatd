document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a').forEach(function (element) {
      element.addEventListener('click', function () {
        alert('Option cliquée: ' + this.textContent);
      });
    });
  });