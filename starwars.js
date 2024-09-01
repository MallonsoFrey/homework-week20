const select = document.getElementById('select')
const input = document.getElementById('number')
const button = document.getElementById('btn')
const output = document.querySelector('.output')

button.addEventListener('click', showResult)

async function showResult() {
    output.innerHTML = ''
    const selectOption = select.value
    const inputValue = input.value
    try {
        if (isNaN(inputValue) || inputValue > 10 || inputValue < 1) {
            throw new Error('Ошибка: Введите число от 1 до 10');
        }

        output.innerText = 'Идёт загрузка...'

        await getData(selectOption, inputValue)
    } catch (error) {
        output.innerText = `Ошибка: ${error}`;
    } finally {
        console.log('Загрузка завершена')
    }
}

async function getData(option, num) {
    try {
        const response = await fetch (`https://swapi.py4e.com/api/${option}/${num}`)
        if (!response.ok) {
            return Promise.reject(response.status)
        }

        const data = await response.json()
        if(!data.name) {
            return Promise.reject('Имя объекта не найдено')
        }

        const info = document.createElement('div')
        info.innerHTML = `<h1>Name:${data.name}</h1>`
        output.innerHTML = ''
        output.appendChild(info)
    } catch (error) {
        if (typeof error === 'number') {
            output.innerText = `Ошибка: Сервер вернул статус ${error}`
        } else {
            output.innerText = 'Ошибка при получении данных: ' + error.message
        }
    }
}