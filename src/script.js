import datepicker from 'js-datepicker';
import 'js-datepicker/dist/datepicker.min.css';
import { DateTime } from "luxon";

let selectedDate

document.addEventListener('DOMContentLoaded', () => {
  const datepickerContainer = document.querySelector('.date-picker');
  const picker = datepicker(datepickerContainer, {
    onSelect: (instance, date) => {
      if(date) {
        selectedDate = DateTime.fromJSDate(date);
        console.log(selectedDate)
      }
    }
  });
  const calculate = document.querySelector('.calculate');
  calculate.addEventListener("click", () => {
    if(selectedDate && DateTime.now().diff(selectedDate, 'days').days > 0) {
      datepickerContainer.classList.remove('invalid');
      const today = DateTime.now();
      const age = today.diff(selectedDate, ['years', 'months', 'days']);
      const ageResult = `You are <b>${age.values.years} years ${age.values.months} months</b> old`;
      const ageButton = document.querySelector('.date-result');
      ageButton.innerHTML=ageResult;
    } else {
      datepickerContainer.classList.add('invalid');
      const ageButton = document.querySelector('.date-result');
      ageButton.innerHTML = 'Select a valid date'
    }
  })
});

