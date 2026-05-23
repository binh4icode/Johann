      setInterval(()=>{
        const time = document.querySelector(".display #time");
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let day_night = "PM";

// Create an if statement that will check if hours is greater than
//12 and if true then change day_night to "PM" and set hours = hours -12
if (hours>12) {
  let day_night ="AM"
    hours = hours - 12
  }

if (seconds<10) {
  seconds = "0" + seconds
}

if (minutes<10) {
  minutes = "0" + minutes
}
if (hours<10) {
  hours = "0" + hours
  }


//Create 3 more if statemenets that will add a zero to the left of the number if the number only has one digit.
//do it for seconds, minutes and hours.


        time.textContent = hours + ":" + minutes + ":" + seconds + " "+ day_night;
      });


      
// Array of image URLs
const images = [
  'images/read.jpg',
  'images/cat.jpg',
  'images/cat2.jpg',
  'images/cat3.jpg',
  'images/cat5.jpg',
  'images/CLOCKS.jpg',
  'images/dog.jpg',
  'images/dog.jpg',
  'images/dog2.jpg',
  'images/dog3.jpg',
  'images/illusion.jpg',
  'images/otters.jpg',
];

// Track previously used index to avoid immediate repeats
let lastIndex = -1;

// Function to get a random image different from the last one
function getRandomImage() {
  let randomIndex;
  
  // If there's only one image, return it
  if (images.length === 1) {
    return images[0];
  }
  
  // Get a random index different from the last one
  do {
    randomIndex = Math.floor(Math.random() * images.length);
  } while (randomIndex === lastIndex);
  
  lastIndex = randomIndex;
  return images[randomIndex];
}

// Function to change the background
function changeBackground() {
  const randomImage = getRandomImage();
  document.body.style.backgroundImage = `url('${randomImage}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.transition = 'background-image 1s ease-in-out';
}

// Set initial background
changeBackground(); 

// Change background every 30 seconds (30000 milliseconds)
setInterval(changeBackground, 30000);