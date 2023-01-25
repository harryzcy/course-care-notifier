// running in page https://course.care/course/<course-id>/event/<event-id>/queue

function parseUrl() {
  const url = window.location.href;
  const match = /course\.care\/course\/(.*?)\/event\/(.*?)\/queue/.exec(url);
  return {
    courseId: match[1],
    eventId: match[2],
  };
}

function playSound() {
  // Use the sound from My Digital Hand
  const audio = new Audio("https://mydigitalhand.org/sounds/bell.mp3");
  audio.play();
}

let notificationState = "initial";
let soundEnabled = false;

async function pullQueue() {
  const { courseId, eventId } = parseUrl();
  const url = `https://course.care/api/course/${courseId}/event/${eventId}`;
  const response = await fetch(url);

  const data = await response.json();
  const queued = +data[0].stats.queued; // convert string to number

  if (queued > 0) {
    if (notificationState === "initial") {
      chrome.runtime.sendMessage({ event: "queue", number: queued });
      if (soundEnabled) {
        playSound();
      }

      notificationState = "sent";
    }
  } else {
    notificationState === "initial"; // reset
  }
}

chrome.storage.local.get(["soundEnabled"], function (result) {
  soundEnabled = result.soundEnabled;
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local") {
    soundEnabled = changes.soundEnabled.newValue;
  }
});

pullQueue(); // initial pull

setInterval(function () {
  pullQueue();
}, 1000 * 5);
