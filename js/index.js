import * as vc from './valueConstructor.js';
import { ReklamaLink } from './reklamaPlugin.js';
import * as lc from './listConstructor.js';
if (localStorage.innerUl == null) {
    localStorage.setItem('innerUl', `<li id='♫ghost'>Гостевой режим</li><!---->`);
    localStorage.setItem('♫ghostbet', 0);
    localStorage.setItem('♫ghostscore', 0);
    localStorage.setItem('♫ghosthistory', '');
};
//localStorage.clear()
let docQS = function (x) {
    return document.querySelector(x);
};
let getElementByInnerText = function (text) {
    for (let i = 0; i < document.getElementsByTagName('*').length; i++) {
        const element = document.getElementsByTagName('*')[i];
        if (element.innerText == text) {
            return element;
        };
    };
};
let ul = document.createElement('ul');
let selectedUser = '♫ghost';
localStorage.setItem('selectedUser', selectedUser)
let width = document.querySelector('.track1').offsetWidth;
let height = width * 0.1267;
let historyList = new lc.List({
    'parent': docQS('.controlPad'),
    'style': [('line-height: 140%;padding: 10px 20px 10px 3%;font-size: 2.1em;color: var(--color);flex-grow: 1;border: 2px var(--color) solid;box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.44); overflow-y:auto; max-height:' + docQS('.controlPad').offsetHeight + 'px; height:' + docQS('.controlPad').offsetHeight + 'px; box-sizing:border-box; overflow-x:auto; max-width:' + "66.93%" + ';'), 'list-style: number; margin-bottom: 5px;'],
});
let myReklama = new ReklamaLink(document.querySelector('div.management'), 'Получить деньги', 1, 'newPage', '/reklama.html');

let theme = 'white';
let start = document.querySelector('.start');
let numTwo = document.querySelector('.numTwo');
let numOne = document.querySelector('.numOne');
let carOne = document.querySelector('#carOne');
let carTwo = document.querySelector('#carTwo');
let selectedNum = null;
export let bet = new vc.ValueObject({
    'object': document.querySelector('.bet'),
    'value': 0,
    'defaultText': 'Твоя ставка: <span id="bet">&value&</span> $',
});
export let score = new vc.ValueObject({
    'value': 0,
    'defaultText': 'Твой счёт: <span id="score">&value&</span> $',
    'object': docQS('.score'),
});
let plusTen = docQS('.plus');
let minusTen = docQS('.minus');
let allCash = docQS('.allCash');
let allCashWhere = bet;
let allCashUnWhere = score;
function every() {
    if (score.value == 0 && bet.value == 0) {
        myReklama.powerOn();
    } else {
        myReklama.powerOff();
    }
    if (bet.value != 0) {
        allCash.innerHTML = 'Вернуть все';
        allCashUnWhere = bet;
        allCashWhere = score;
    } else {
        allCash.innerHTML = 'Поставить все';
        allCashWhere = bet;
        allCashUnWhere = score;
    };
    localStorage.setItem(localStorage.getItem('selectedUser') + 'score', score.getValue());
    localStorage.setItem(localStorage.getItem('selectedUser') + 'bet', bet.getValue());

    docQS('#myList0').innerHTML = localStorage.getItem(selectedUser + 'history');

    checkEm();
};
allCash.onclick = function () {
    allCashWhere.addValue(allCashUnWhere.value);
    allCashUnWhere.setValue(0);
    let allCashBeforeWhere = allCashWhere;
    allCashWhere = allCashUnWhere;
    allCashUnWhere = allCashBeforeWhere;
    every();
};
plusTen.onclick = function () {
    if (score.value > 0) {
        bet.addValue(10);
        score.substractValue(10);
    };
    every();
};
minusTen.onclick = function () {
    if (bet.value >= 10) {
        bet.substractValue(10);
        score.addValue(10)
    };
    every();
};
myReklama.a.onclick = function () {
    score.addValue(50);
    every();
    historyList.addLi('Была просмотрена реклама, за которую вы получили 50$');
    localStorage.setItem(selectedUser + 'history', docQS('#myList0').innerHTML);
};
let themeNode = document.createElement('link');
themeNode.rel = 'stylesheet';
themeNode.href = './css/black.css';
function checkEm() {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    if (theme == 'black') {
        if (docQS('link#themeWhite') != undefined) {
            document.head.removeChild(themeNode);
        };
        link.href = './css/black.css';
        link.id = 'themeBlack';
    } else {
        if (docQS('link#themeBlack') != undefined) {
            document.head.removeChild(themeNode);
        };
        link.href = './css/white.css';
        link.id = 'themeWhite';
    };
    themeNode.href = link.href;
    document.head.appendChild(link);
    let localWidth = document.body.offsetWidth;
    let localHeight = document.body.offsetHeight;
    if (localHeight > localWidth) {
        docQS('#rotateDevice').style.display = 'block';;
        document.body.style.overflow = 'hidden';
        if (theme == 'black') {
            docQS('#rotateDeviceImg').src = './res/rotateDeviceBlackTheme.png';
        } else {
            docQS('#rotateDeviceImg').src = './res/rotateDeviceWhiteTheme.png';
        };
    };
    historyList.ul.style.height = docQS('.controlPad').offsetHeight + 'px';
    document.body.style.setProperty('--height', height + 'px');
    document.body.style.fontSize = `${localWidth / 151.9}px`;
};
document.body.onclick = checkEm();
checkEm()
start.onclick = function () {
    if (bet.value > 0 && selectedNum != null) {
        historyList.addLi('Вы поставили ставку в размере ' + bet.getValue() + '$ на машину номер ' + selectedNum + '. Кто же победит?');
        localStorage.setItem(selectedUser + 'history', docQS('#myList0').innerHTML);
        let btns = [start, plusTen, minusTen, allCash, numOne, numTwo];
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.add('_disabledBtns_');
            numTwo.classList.remove('_selectedNum_');
            numOne.classList.remove('_selectedNum_');
        };
        let random = Math.random();
        if (random < 0.5) {
            go(carOne, 1);
            go(carTwo, 2);
        } else {
            go(carTwo, 2);
            go(carOne, 1);
        }
    } else if (bet.value <= 0 && selectedNum == null) {
        alert('Сделай ставку и выбери машину!');
    } else if (bet.value > 0 && selectedNum == null) {
        selectedNum = prompt('Выбери машину!\n 1 или 2');
        selectedNum == 1 ? checkSelect(numOne) : checkSelect(numTwo);
    } else if (bet.value <= 0 && selectedNum != null) {
        alert('Сделай ставку')
    };
};
let winnerCar = false;
let go = function (car, carNum) {
    carOne.style.left = '0%';
    carTwo.style.left = '0%';
    let progress = 0;
    winnerCar = false;
    let interval = setInterval(() => {
        if (winnerCar == true) {
            clearInterval(interval);
            let btns = [start, plusTen, minusTen, allCash, numOne, numTwo];
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove('_disabledBtns_');
            };
        };
        let speed = Math.random() * 0.15;
        car.style.left = `${progress}%`;
        progress += speed;
        if (progress > 82) {
            winnerCar = true;
            if (carNum == selectedNum) {
                alert(`Победа`);
                score.addValue(bet.getValue() * 2);
                historyList.addLi('<span style="color:green;">Победа!</span> Вы ставили ставку на машину номер ' + selectedNum + '. К счету было добавлено ' + bet.getValue() * 2 + '$. Текущий счет ' + score.getValue() + '$.');
                localStorage.setItem(selectedUser + 'history', docQS('#myList0').innerHTML);
                clearInterval(interval);
            } else {
                historyList.addLi('<span style="color:red;">Проигрыш.</span> Вы ставили ставку на машину номер ' + selectedNum + '. Вы потеряли ' + bet.getValue() + '$. Текущий счет ' + score.getValue() + '$.');
                localStorage.setItem(selectedUser + 'history', docQS('#myList0').innerHTML);
                alert(`Проигрышь`);
                clearInterval(interval);
            }
            bet.setValue(0);
            selectedNum = null;
        };
        every()
    }, 1);
};
function checkSelect(e) {
    let target;
    if (e == numOne || e == numTwo) { target = e; } else { target = e.target; };
    if (target.classList.contains('numOne')) {
        numTwo.classList.remove('_selectedNum_');
        target.classList.add('_selectedNum_');
        selectedNum = 1;
    } else {
        numOne.classList.remove('_selectedNum_');
        target.classList.add('_selectedNum_');
        selectedNum = 2;
    };
};
numOne.onclick = checkSelect;
numTwo.onclick = checkSelect;
ul.id = 'myList1';
ul.innerHTML = localStorage.getItem('innerUl');
ul.style = 'width:20%;';
docQS('#saveAccount').onclick = () => {
    //Сохраняю аккаунтСохраняю аккаунтСохраняю аккаунтСохраняю аккаунтСохраняю аккаунтСохраняю аккаунтСохраняю аккаунтСохраняю аккаунтСохраняю аккаунтСохраняю аккаунт
    let input = docQS('#nameAccount');
    let x = 0;
    if (localStorage.getItem('♫' + input.value) != '' && localStorage.getItem('♫' + input.value) != null) {
        x = 1;
    };
    if (input.value != '' && input.value != 'Нет аккаунтов' && x < 1 && input.value.split('')[0] != '♫' && input.value.split('').length < 15) {
        let newUser = document.createElement('li');
        newUser.innerHTML = input.value;
        let newUserInString = `<li id='♫${input.value}'>${input.value}</li><!---->`;
        localStorage.setItem('innerUl', localStorage.getItem('innerUl') + newUserInString)
        ul.innerHTML = localStorage.getItem('innerUl');
        localStorage.setItem('♫' + input.value, input.value);
        localStorage.setItem('♫' + input.value + 'score', 0);
        localStorage.setItem('♫' + input.value + 'bet', 0);
        score.setValue(localStorage.getItem(selectedUser + 'score'));
        bet.setValue(localStorage.getItem(selectedUser + 'bet'));
        localStorage.setItem('♫' + input.value + 'history', '');
        every();
        input.value = 'Аккаунт создан';
        input.style.color = 'red';
        setTimeout(() => {
            input.value = '';
            input.style.color = 'white';
        }, 2700);
    } else {
        alert('Некорекктное имя аккаунта');
        console.log(x);
    };
};
docQS('#accounts').appendChild(ul);
docQS('#accounts').onclick = (e) => {
    let el = e.target;
    if (el.id.split('')[0] == '♫') {
        bet.setValue(localStorage.getItem(el.id + 'bet'))
        score.setValue(localStorage.getItem(el.id + 'score'))
        selectedUser = el.id;
        localStorage.setItem('selectedUser', selectedUser);
        historyList.ul.innerHTML = localStorage.getItem('♫' + selectedUser + 'history', '');
    };
    every()
};
let contextMenu = new lc.List({
    'parent': document.body,
    'id': '╦context-menu',
    'articlesParams': [['className', '╦context-menu__item']]
})
contextMenu.addLi('<a href="#" class="╦context-menu__link fa fa-editName"> Изменить название</a>');
contextMenu.addLi('<a href="#" class="╦context-menu__link fa fa-delete"> Удалить аккаунт</a>');


let menu = document.querySelector("#╦context-menu");
let menuState = 0;
let active = "context-menu--active";
let eee = null;
oncontextmenu = function (e) {
    checkEm();
    if (e.target.innerHTML != 'Гостевой режим') {
        if (menuState == 1 && e.target.className.split('')[0] != '╦') {
            //Тут вроде когда выходишь из меню(таких места 2, второе где-то нижеZ)
            eee.style.background = ''
            eee.style = ''
            docQS('#accounts').style.background = '';
            ul.style = ''
            menuState = 0;
            menu.classList.remove(active);
        };
        if (e.target.id.split('')[0] == '♫') {
            // Место где моё меню открывается
            e.target.style.background = 'black'
            e.target.style = 'background:black;float: none;text-align: center;margin-left: auto;margin-right: auto;font-size: 0.8em;'
            e.preventDefault();
            eee = e.target;
            menu.classList.add(active);
            menuState = 1;
            menu.style.setProperty('--x', e.x + 'px');
            menu.style.setProperty('--y', e.y + 'px');
        };
    };
};
menu.onmouseover = function () {
    docQS('#accounts').style.background = '#222';
    ul.style = 'position: absolute;list-style: none;z-index: 400;padding: 0;overflow: hidden;display: block;background: #222;border - top: 0;-webkit - box - shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25);box - shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25); '
};
menu.onclick = function () {
    docQS('#accounts').style.background = '#222';
    ul.style = 'position: absolute;list-style: none;z-index: 400;padding: 0;overflow: hidden;display: block;background: #222;border - top: 0;-webkit - box - shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25);box - shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25); '
};
for (let i = 0; i < document.getElementsByTagName('*').length; i++) {
    const el = document.getElementsByTagName('*')[i];
    if (el.onclick == null) {
        el.onclick = (e) => {
            //Когда выходишь из КОНТЕКСТ-менюшки
            checkEm();
            if (menuState == 1 && e.target.className.split('')[0] != '╦') {
                eee.style.background = ''
                eee.style = ''
                docQS('#accounts').style.background = '';
                ul.style = ''
                menuState = 0;
                menu.classList.remove(active);
            };
        };
    };
};
//                              edit>context-menu
docQS('.fa-editName').onclick = () => {
    let input = docQS('#accountNameEdit');
    docQS('div.edit').style.display = 'block';
    docQS('#saveNameAccount').onclick = () => {
        let x = 0;
        if (localStorage.getItem('♫' + input.value) != '' && localStorage.getItem('♫' + input.value) != null) {
            x = 1;
        };
        if (input.value != '' && input.value != 'Нет аккаунтов' && x < 1 && input.value.split('')[0] != '♫' && input.value.split('').length < 15) {
            localStorage.setItem(eee.id, '');
            localStorage.setItem(eee.id + 'bet', '');
            localStorage.setItem(eee.id + 'score', '')
            let inUl = localStorage.getItem('innerUl').split('<');
            for (let i = 0; i < inUl.length; i++) {
                const el = inUl[i];
                if (el == `li id='${eee.id}'>${eee.innerHTML}`) {
                    inUl[inUl.indexOf(`li id='${eee.id}'>${eee.innerHTML}`)] = `li id='♫${input.value}'>${input.value}`;
                    console.log(inUl);
                    localStorage.setItem('innerUl', inUl.join('<'));
                };
            };
            eee.id = '♫' + input.value;
            eee.innerHTML = input.value;
            localStorage.setItem(eee.id, eee.id);
            localStorage.setItem(eee.id + 'bet', 0);
            localStorage.setItem(eee.id + 'score', 0);

        } else {
            console.log(x);
            alert('Некорректное имя пользователя');
        };
    };
};
docQS('.fa-delete').onclick = () => {
    let inUl = localStorage.getItem('innerUl').split('<!---->')
    for (let i = 0; i < inUl.length; i++) {
        const el = inUl[i];
        let n = inUl.indexOf(el);
        if (el == `<li id='♫${eee.id}'>${eee.innerHTML}</li>`) {
            inUl.splice(n, 1);
        };
    };
    localStorage.setItem('innerUl', inUl.join('<!---->'));
    eee.parentNode.removeChild(eee);
};
bet.setValue(localStorage.getItem(selectedUser + 'bet'));
score.setValue(localStorage.getItem(selectedUser + 'score'));
docQS('.exit').onclick = (e) => {
    let target = e.target;
    target.parentNode.style.display = 'none';
};



every();