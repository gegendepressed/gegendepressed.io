const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Sairaj Pai.", "a tablaplayer.", "gegendepressed ?", "a developer."];
const typingDelay = 75; // Decreased typing delay for smoother effect
const erasingDelay = 25; // Decreased erasing delay for smoother effect
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay); // Changed delay for starting erasing
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});


   function validateForm() {
    let myForm = document.forms["myForm"];
    let name = myForm["name"].value;
    let email = myForm["email"].value;
    let subject = myForm["subject"].value;
    let message = myForm["message"].value;
    let finalstring = name+"\n"+email+"\n"+subject+"\n"+message;
    
    console.log(finalstring);
    fetch('https://pingme.developer.li/api/sendmessage', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": "relativesciencex",
        "message": finalstring,
        "securitykey": 4209})
    })
    .then(response => console.log(response.status))

  } 
