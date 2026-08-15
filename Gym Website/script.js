// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// BMI Calculator

function calculateBMI(){

  let height =
  document.getElementById("height").value / 100;

  let weight =
  document.getElementById("weight").value;

  let bmi = weight / (height * height);

  let result =
  document.getElementById("result");

  if(bmi < 18.5){
    result.innerHTML =
    `Your BMI is ${bmi.toFixed(1)} - Underweight`;
  }

  else if(bmi < 25){
    result.innerHTML =
    `Your BMI is ${bmi.toFixed(1)} - Normal`;
  }

  else if(bmi < 30){
    result.innerHTML =
    `Your BMI is ${bmi.toFixed(1)} - Overweight`;
  }

  else{
    result.innerHTML =
    `Your BMI is ${bmi.toFixed(1)} - Obese`;
  }
}