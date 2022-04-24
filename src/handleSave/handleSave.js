export function changeToSave(e) {
  const heartClass = e.target.previousElementSibling.classList;
  const saveMes = e.target.nextElementSibling;
  heartClass.replace('fa-solid', 'fa-regular');
  saveMes.textContent = 'Save Dish';
}

export function changeToSaved(e) {
  const heartClass = e.target.previousElementSibling.classList;
  const saveMes = e.target.nextElementSibling;
  heartClass.replace('fa-regular', 'fa-solid');
  saveMes.textContent = 'Saved';
}
