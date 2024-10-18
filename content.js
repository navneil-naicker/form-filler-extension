async function fillFormFields() {
  let l_data;
  const jsonURL = chrome.runtime.getURL("data.json");

  await fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
      l_data = data;
      console.log(l_data);
    })
    .catch((error) => {
      console.error(error);
    });

  document.querySelectorAll("input").forEach((input) => {
    const type = input?.type?.toLocaleLowerCase() || "text";
    if (type === "email") {
      const randomIndex = Math.floor(Math.random() * l_data.emails.length);
      const email = l_data.emails[randomIndex];
      input.value = email;
    }
    if (type === "number") {
      input.value = Math.floor(Math.random() * 1000) + 1;
    }
    if (type === "date") {
      const startTimestamp = new Date(2020, 0, 1).getTime();
      const endTimestamp = new Date(2024, 11, 31).getTime();
      const randomTimestamp =
        Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
        startTimestamp;
      const date = new Date(randomTimestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      input.value = formattedDate;
    }
    if (type === "radio") {
      const radioButtons = document.querySelectorAll(
        `input[type="radio"][name="${input.name}"]`
      );
      const randomIndex = Math.floor(Math.random() * radioButtons.length);
      radioButtons[randomIndex].checked = true;
    }
  });

  document.querySelectorAll("select").forEach((input) => {
    const options = input.options;
    const randomIndex = Math.floor(Math.random() * options.length);
    input.selectedIndex = randomIndex;
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillForm") {
    fillFormFields();
  }
});
