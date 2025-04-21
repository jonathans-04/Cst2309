"use strict";

/*
   New Perspectives on HTML5 and CSS3, 8th Edition
   Tutorial 9
   Tutorial Case

   Countdown Clock
   Author: Jonathan Sichka
   Date:   4-21-2025

*/

/*
1. B - B
2. D - D
3. A
4. C - C
5. D - D
6. C - C
7. C - C
8. B - B


*/


/* Execute the function to run and display the countdown clock */
runClock();
setInterval("runClock()", 1000); // Call the runClock function every second


/* Function to create and run the countdown clock */
function runClock() {

/* Store the current date and time */
var currentDay = new Date();
var dateStr = currentDay.toLocaleDateString();
var timeStr = currentDay.toLocaleTimeString();

/* Display the current date and time */
document.getElementById("dateNow").innerHTML = 
dateStr + "<br>" + timeStr;


/* Calculate the days until January 1st */
var newYear = new Date("January 1, 2021");
var nextYear = currentDay.getFullYear() + 1;
newYear.setFullYear(nextYear);
var daysLeft = (newYear - currentDay) / (1000 * 60 * 60 * 24);


/* Calculate the hours left in the current day */
var hrsLeft = (daysLeft - Math.floor(daysLeft)) * 24;

/* Calculate the minutes and seconds left in the current hour */
var minsLeft = (hrsLeft - Math.floor(hrsLeft)) * 60;
var secsLeft = (minsLeft - Math.floor(minsLeft)) * 60;

document.getElementById("days").textContent = Math.floor(daysLeft);
document.getElementById("hrs").textContent = Math.floor(hrsLeft);
document.getElementById("mins").textContent = Math.floor(minsLeft);
document.getElementById("secs").textContent = Math.floor(secsLeft);
}




/* Session 9.2 Quick Check
1.  D
2.  C
3.  C
4. A
5. B
6. D
7. B   
8. A  
*/


/* Session 9.3 Quick Check
1. B
2. C    
3. A    D
4.      C
5. D
6. A
7. A    C
8. D    A
*/


