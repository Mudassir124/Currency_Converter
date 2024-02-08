const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let all_Opt = document.querySelectorAll(".form_opt select");
let btn = document.querySelector("button");
let fromcurr = document.querySelector(".form_opt .from select");
let to = document.querySelector(".form_opt .to select");
let msg = document.querySelector(".msg");

for (let select of all_Opt) {
  for (let curr_code in countryList) {
    let new_opt = document.createElement("option");
    new_opt.innerText = curr_code;
    new_opt.value = curr_code;
    select.append(new_opt);
    if (select.name === "from" && curr_code === "USD") {
      new_opt.selected = true;
    } else if (select.name === "to" && curr_code === "INR") {
      new_opt.selected = true;
    }
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currcode = element.value;
  let cntryCode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${cntryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

const update_exchange_rate = async () => {
  let amount = document.querySelector("input");
  let amtval = amount.value;
  console.log(amtval);
  if (amtval === "" || amtval <= 0) {
    amtval = 1;
    amount.value = "1";
  }
  const url = `${base_url}/${fromcurr.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[to.value.toLowerCase()];

  let final_amount = amtval * rate;
  msg.innerText = `${amtval} ${fromcurr.value} = ${final_amount} ${to.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  update_exchange_rate(); // Call the function to update exchange rate when button is clicked
});
window.addEventListener("load", () => {
  update_exchange_rate();
});
