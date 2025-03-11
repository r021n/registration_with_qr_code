setInterval(() => {
  fetch("/api/count")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#registerCount").innerText = data.count;
    })
    .catch((error) => console.error("Gagal fetching data: ", error));
}, 3000);
