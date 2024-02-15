const alienId = document.getElementById("alienId");
alienId.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const origin = document.getElementById("origin").value;
  const password = document.getElementById("password").value;
  const id = Math.floor(Math.random()*100000)+1


  addNewUser(id,name, age, origin,password);

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
window.location.href = `${destinationUrl}?id=${id}&name=${name}&age=${age}&origin=${origin}&pass=${password}`;
});

async function addNewUser(id,name, age, origin,password) {
  try {
    const data = await fetch(
      `/users?id=${id}&name=${name}&age=${age}&origin=${origin}&pass=${password}`,
      { method: "POST" }
    );
  } catch (error) {
    console.error(error);
  }
}
