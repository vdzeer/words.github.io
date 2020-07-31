'use strict';
// v1.0
const rusText = document.querySelector('.main-input'),
    enText = document.querySelector('.main-textarea'),
    btn = document.querySelector('.btn'),
    words = document.querySelector('.words');

let diList;

localStorage.length < 1 ? diList = [] : diList = JSON.parse(localStorage.getItem('words'));

const addWords = inx => {
    let en = diList[inx].english;
    let enWords = '';
    en = en.split(' - ');
    en.forEach(item => {
        enWords += `<span class="item-en__text">${item}</span>`
    });
    words.innerHTML += `
        <div class="item">
            <div class="item-ru">
                <span class="item-ru__text">${diList[inx].russian}</span>
            </div>
            <div class="item-en">
                ${enWords}
            </div>
            <div class="item-remove">&#10006;</div>
        </div>
    `;
    addEventDel();
}

const form = () => {
    diList.forEach((item, idx) => {
        addWords(idx);
    });
}


btn.addEventListener('click', () => {
    if (rusText.value === '' || enText.value === '') {
        if (rusText.value === '' && enText.value === '') {
            rusText.style.border = '1.2px solid #f00';
            enText.style.border = '1.2px solid #f00';
        } else if (enText.value === '') {
            enText.style.border = '1.2px solid #f00';
        } else {
            rusText.style.border = '1.2px solid #f00';
        }
        setTimeout(() => {
            rusText.style.border = 'none';
            enText.style.border = 'none';
        }, 3000);
    } else {
        form();
        diList.push(new CreateWord(enText.value, rusText.value));
        localStorage.setItem('words', JSON.stringify(diList));
        addWords(diList.length - 1);
        rusText.value = '';
        enText.value = '';
    }
});

function CreateWord(eng, rus) {
    this.english = eng;
    this.russian = rus;
}

function deleteWord(e) {
    let name = e.target.parentNode.firstChild.nextSibling.textContent;
    name = name.replace(/\s+/g, '');
    diList = diList.filter((item) => {
        if(item.russian === name) {
            return false;
        } else {
            return true;
        }
    });
    e.target.parentNode.remove();
    localStorage.setItem('words', JSON.stringify(diList));
}

function addEventDel() {
    const dels = document.querySelectorAll('.item-remove');
    for (const item of dels) {
        item.addEventListener('click', e => {
            deleteWord(e);
        })
    }
}

function init() {
    if(!(localStorage.length < 1)) {
        form();
    }
}

addEventDel();

init();