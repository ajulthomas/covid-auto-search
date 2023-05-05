const MY_CENTERS = [
  705695, // appolo
  602758, // trust eye
  578236, // indira ghandi
  623405, // anghadikadavu PHC
  // 623348, 115071, 115052, 604361, 115071,
];
let slot_flag = false;

function loop() {
  setInterval(fetchData, 10000);
}

function fetchData() {
  fetch(
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=297&date=18-07-2021"
  )
    .then((response) => response.json())
    .then((data) => {
      checkData(data.centers);
    });
}

function checkData(centers) {
  centers.forEach((center) => {
    // if (MY_CENTERS.includes(center.center_id)) {
    //   console.log("checking center : ", center.name);
    sessions = center.sessions;
    if (sessions.length > 0) {
      sessions.forEach((session) => {
        checkSlots(session, center);
      });
    }
    //}
  });
}

function checkSlots(session, center) {
  // console.log("checking center session: ", center.name);
  if (session.available_capacity > 0 && session.available_capacity_dose1 > 0) {
    showData(session, center);
    slot_flag = true;
    playAlarm();
    // alert("Slot found");
  } else {
    console.log(
      "slots not found ",
      center.name,
      session.available_capacity,
      session.available_capacity_dose1
    );
    // setTimeout(playAlarm, 0);
    // playAlarm();
    // showData(session, center);
  }
}

function showData(session, center) {
  var slotsList = document.getElementById("slots_list");
  var listItem = document.createElement("li");
  var textData = document.createTextNode(
    `Center: ${center.name} slots: ${session.available_capacity} dose1: ${session.available_capacity_dose1} date: ${session.date}`
  );
  listItem.appendChild(textData);
  slotsList.appendChild(listItem);
}

function playAlarm() {
  const mp3_url = "./mixkit-alarm-tone-996.wav";
  new Audio(mp3_url).play();
}

function getdate() {}

window.onload = loop;
