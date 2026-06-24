// Массив допустимых номеров картинок
const validNumbers = [
    0, 6, 10, 44, 55, 59, 60, 70, 171, 283, 415, 422, 424, 428, 431, 443, 447, 450, 451, 486,
    546, 550, 552, 591, 554, 561, 583, 605, 684, 690, 693, 785, 801, 809, 822, 866, 874, 888,
    917, 1017, 1052, 1100, 1101, 1103, 1104, 1105, 1106, 1107, 1116, 1118, 1130, 1136, 1149,
    1158, 1166, 1323, 1207, 1926, 5012, 5023, 5026, 5027
];

document.getElementById('searchBtn').addEventListener('click', searchImage);
document.getElementById('numberInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchImage();
    }
});

function searchImage() {
    const numberInput = document.getElementById('numberInput');
    const resultDiv = document.getElementById('result');
    const number = parseInt(numberInput.value);

    // Проверяем, что введено число
    if (isNaN(number)) {
        resultDiv.innerHTML = '<p class="error">Пожалуйста, введите корректный номер</p>';
        return;
    }

    // Проверяем, есть ли такой номер в списке допустимых
    if (!validNumbers.includes(number)) {
        resultDiv.innerHTML = `<p class="error">Картинка с номером ${number} не найдена в доступных номерах</p>`;
        return;
    }

    // Формируем путь к картинке
    const imagePath = `PLU RC2/${number}.jpg`;

    resultDiv.innerHTML = '<p class="loading">Загрузка картинки...</p>';

    console.log(`Попытка загрузить картинку: ${imagePath}`);

    fetch(imagePath)
        .then(response => {
            if (response.ok) {
                console.log(`Картинка ${number} успешно загружена`);
                resultDiv.innerHTML = `
                    <div class="image-container">
                        <img src="${imagePath}" alt="Картинка ${number}" onerror="handleImageError(${number})">
                        <p>Картинка №${number}</p>
                    </div>
                `;
            } else {
                console.error(`Ошибка загрузки картинки ${number}: ${response.status}`);
                handleImageError(number);
            }
        })
        .catch(error => {
            console.error(`Ошибка при загрузке картинки ${number}:`, error);
            handleImageError(number);
        });
}

function handleImageError(number) {
    console.warn(`Картинка №${number} не найдена или недоступна`);
    resultDiv.innerHTML = `<p class="error">Картинка №${number} не найдена или недоступна</p>`;
}
