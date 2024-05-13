function changePage(pageName) {
    var mainContent = document.getElementById('mainContent');
    var labsButtons = document.querySelectorAll('#LabsButtons button');

    // Знайти натиснуту кнопку за pageName
    var pressedButton = Array.from(labsButtons).find(function (btn) {
        return btn.onclick && btn.onclick.toString().includes(pageName);
    });

    // Зняти попередню натиснутість з усіх кнопок
    labsButtons.forEach(function (btn) {
        btn.classList.remove('pressed');
        // Зняти стилі з попередньої натиснутої кнопки
        btn.style.backgroundColor = '#D9D9D9';
        btn.style.color = '#000000';
    });

    // Додати клас "pressed" до нової натиснутої кнопки
    if (pressedButton) {
        pressedButton.classList.add('pressed');
        // Змінити стилі нової натиснутої кнопки
        pressedButton.style.backgroundColor = '#555';
        pressedButton.style.color = '#EFF9FF';
    }

    var labsFolderPath = 'labs/';
    var labFilePath = labsFolderPath + pageName;

    fetch(labFilePath)
        .then(response => response.text())
        .then(data => {
            mainContent.innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}

function changeContent(contentType) {
    var mainContent = document.querySelector('.main2-content');
    var contentButtons = document.querySelectorAll('.buttons button');

    // Знайти натиснуту кнопку за contentType
    var pressedButton = Array.from(contentButtons).find(function (btn) {
        return btn.onclick && btn.onclick.toString().includes(contentType);
    });

    // Зняти попередню натиснутість з усіх кнопок
    contentButtons.forEach(function (btn) {
        btn.classList.remove('pressed');
        // Зняти стилі з попереднього вибраного контенту
        btn.style.backgroundColor = '#D9D9D9';
        btn.style.color = '#000000';
    });

    // Додати клас "pressed" до нової натиснутої кнопки
    if (pressedButton) {
        pressedButton.classList.add('pressed');
        // Змінити стилі ново вибраного контенту
        pressedButton.style.backgroundColor = '#555';
        pressedButton.style.color = '#EFF9FF';
    }

    var contentFilePath = 'content/' + contentType + '.html';

    fetch(contentFilePath)
        .then(response => response.text())
        .then(data => {
            mainContent.innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}


//------------------- start Лабораторна №5 МАСИВИ -------------------------
function sumBetweenMinMax(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let maxIndex = arr.indexOf(max);
    let minIndex = arr.indexOf(min);
    let startIndex = Math.min(maxIndex, minIndex) + 1;
    let endIndex = Math.max(maxIndex, minIndex);
    let sum = 0;
    for (let i = startIndex; i < endIndex; i++) {
        sum += arr[i];
    }
    return sum;
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) {
            continue;
        }
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

function generateArray() {
    const numElements = parseInt(document.getElementById("numElements").value);
    const initialArray = [];
    for (let i = 0; i < numElements; i++) {
        initialArray.push(Math.floor(Math.random() * 100));
    }
    document.getElementById("initialArray").innerText = "Початковий масив: " + initialArray.join(", ");
    const resultArray = quickSort([...initialArray]);
    document.getElementById("resultArray").innerText = "Відсортований масив: " + resultArray.join(", ");
    const sum = sumBetweenMinMax(initialArray);
    document.getElementById("sum").innerText = "Сума елементів між min та max: " + sum;
}
//------------- end Лабораторна №5 МАСИВИ ------------------------




//------------------- start Лабораторна №5 БУДИЛЬНИК ---------------------------
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const currentTimeElement = document.getElementById('currentTime');
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Оновлення часу кожну секунду
setInterval(updateTime, 1000);

let alarmInterval; // ідентифікатор інтервалу

// Функція для встановлення будильника
function setAlarm() {
    // Отримуємо дату та час введені користувачем
    const alarmDate = document.getElementById('alarmDate').value;
    const alarmTime = document.getElementById('alarmTime').value;

    // чи введено як дату, так і час
    if (alarmDate && alarmTime) {
        const alarmDateTime = new Date(`${alarmDate}T${alarmTime}`);
        const currentTime = new Date();

        // інтервал для перевірки часу та активації будильника
        alarmInterval = setInterval(function() {
            const now = new Date();
            if (now >= alarmDateTime) {
                document.getElementById('message').textContent = 'Будильник спрацював!';
                clearInterval(alarmInterval); // очищення інтервалу, якщо будильник спрацював
            }
        }, 1000);

        //повідомлення про будильник
        document.getElementById('message').textContent = `Будильник встановлено на ${alarmDateTime}`;
    } else {
        alert('Будь ласка, виберіть дату та час для встановлення будильника.');
    }
}

//вимкнення будильника
function disableAlarm() {
    clearInterval(alarmInterval); // зупинити перевірку часу для будильника
    document.getElementById('message').textContent = 'Будильник вимкнено';
}

//----------------- end Лабораторна №5 БУДИЛЬНИК ------------------------
