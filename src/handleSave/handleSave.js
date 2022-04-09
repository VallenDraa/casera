export default function handleSave(e) {
  const heartClass = e.target.previousElementSibling.classList;
  const saveMes = e.target.nextElementSibling;

  if (heartClass.contains('fa-regular')) {
    heartClass.replace('fa-regular', 'fa-solid');
    saveMes.textContent = 'Saved';
  } else {
    heartClass.replace('fa-solid', 'fa-regular');
    saveMes.textContent = 'Saved';
  }
}
