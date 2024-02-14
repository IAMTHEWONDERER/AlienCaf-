const alienId = document.getElementById("alienId");
alienId.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const origin = document.getElementById("origin").value;
  addNewUser(name, age, origin);
  reservePage();
});

async function addNewUser(name, age, origin) {
  try {
    const data = await fetch(
      `/users?name=${name}&age=${age}&origin=${origin}`,
      { method: "POST" }
    );
  } catch (error) {
    console.error(error);
  }
}
document.getElementById("reservation").addEventListener("click", function () {
  const origin = document.getElementById("origin").value;
  let destinationUrl;

  switch (origin) {
    case "human":
      destinationUrl = "/human.html";
      break;
    case "voidborn":
      destinationUrl = "/voidborn.html";
      break;
    case "celestial":
      destinationUrl = "/celestial.html";
      break;
    case "yordle":
      destinationUrl = "/yordle.html";
      break;
    default:
      destinationUrl = "/index.html";
  }

  // Redirect to the chosen URL
  window.location.href = destinationUrl;
});
