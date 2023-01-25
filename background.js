function playSound() {
  // Use the sound from My Digital Hand
  const audio = new Audio("https://mydigitalhand.org/sounds/bell.mp3");
  audio.play();
}

chrome.runtime.onMessage.addListener(function (request) {
  const event = request.event;
  const number = request.number;
  if (event === "queue") {
    const message = `There are ${number} student(s) joined the queue`;
    chrome.notifications.create("", {
      title: "Course Care",
      message,
      iconUrl: "icon.png",
      type: "basic",
    }, playSound);
  }
});
