"use strict";

window.addEventListener(`DOMContentLoaded`, () => {

// introduction
blockScreen.classList.remove(`hide`);
blockScreen.style.opacity = 1;
blockScreen.style.backgroundColor = `black`;

const introModal = document.createElement(`div`);
introModal.classList.add(`intro`);
blockScreen.append(introModal);
introModal.innerText = `
Introduction:

This is an electronic task book for my son. Here, he can solve mathematical problems, learn to tell time, and practice counting money.

A few words about the project:

This is my first project where I learned JavaScript, along with HTML and CSS. I acquired this knowledge from online courses, and I tried to apply it right away. As a result, I encountered many problems and errors. However, by solving them, I learned many nuances and features of the language.

It all began with simple examples, but as I became more proficient in the language, the project grew with me. I rewrote it from scratch more than once. Since I did not have hosting, I used OpenServer to develop the project. Later, I refocused on LocalUse, as my son could not start the server himself.

You can click on "Description" and move your cursor around to see information about the content.
`;

const descrImg = document.createElement(`img`);
descrImg.src = `img/descr.jpg`;
descrImg.width = `300`;
descrImg.height = `50`;
introModal.append(descrImg);

const btnContinue = document.createElement(`div`);
btnContinue.classList.add(`btn`, `btn_center`);
btnContinue.id = `cont`;
btnContinue.innerText = `Continue`;
introModal.append(btnContinue);

introModal.innerHTML += `Thank you for Your time.`;

document.getElementById(`cont`).addEventListener(`click`, () => {
    console.log(parseInt(blockScreen.style.opacity));
    introModal.remove();
    let i = 100;
    const fade = setInterval(() =>{
        if (i > 0) {
            blockScreen.style.opacity = i + `%`;
            i--;
            console.log(`anima`);
        } else {
            console.log(`stop`);
            blockScreen.classList.add(`hide`);
            blockScreen.style.backgroundColor = `grey`;
            blockScreen.style.opacity = `50%`;
            clearInterval(fade);
        }
    }, 20);
});


user.formUpdate();

///////////////////////// ///////////////////////// Main switch to Cathegories
categoryField.addEventListener(`click`, (event) => {
    if (event.target.parentElement.classList.contains(`category`)){
        switch (event.target.parentElement.id) {
            case `easy`:
                categoryField.parentElement.classList.add(`hide`);
                workspace.classList.remove(`hide`);
                document.querySelector(`.task__center`).textContent = easy.description;  
                easy.getExamples(settings.easyCount, settings.easyEleMin, settings.easyEleMax, -20, 20);
                easy.createExamples();
                globalExp = 15;
            break;
            case `hard`: 
                categoryField.parentElement.classList.add(`hide`);
                workspace.classList.remove(`hide`);
                document.querySelector(`.task__center`).textContent = hard.description;  
                hard.getExamples(settings.hardCount, settings.hardEleMin, settings.hardEleMax, -100, 100); 
                hard.createExamples();
                globalExp = 30;
            break;
            case `column`:
                categoryField.parentElement.classList.add(`hide`);
                workspace.classList.remove(`hide`);
                document.querySelector(`.task__center`).textContent = column.description;  
                column.getExamples(settings.columnCount); 
                column.createExamples();
                globalExp = 50;
            break;    
            case `equation`:
                categoryField.parentElement.classList.add(`hide`);
                workspace.classList.remove(`hide`);
                document.querySelector(`.task__center`).textContent = equation.description;  
                easy.getExamples(settings.equationCount, settings.equationEleMin, settings.equationEleMax, -10, 10); 
                equation.createExamples();
                globalExp = 25;
            break;
            case `moneyPay`:
                categoryField.parentElement.classList.add(`hide`);
                workspace.classList.remove(`hide`);
                document.querySelector(`.task__center`).textContent = moneyPay.description;  
                moneyPay.createTask(settings.moneyPayMin * 100, settings.moneyPayMax * 100);
            break;
            case `time`: 
                categoryField.parentElement.classList.add(`hide`);
                workspace.classList.remove(`hide`);
                document.querySelector(`.task__center`).textContent = time.description;  
                time.startTime(settings.timeFormat);
            break;
            case `settings`: 
                if (window.prompt(`Please write : kidlock`) === `kidlock`) {
                    blockScreen.classList.remove(`hide`);
                    document.body.style.overflow = `hidden`;
                    document.querySelector(`.setting`).classList.remove(`hide`);
                    settings.load();
                } else {
                    window.alert(`Incorret password`);
                }
            break;
             
        }
    }
});

/////////////////////////////////Button back at examples whit exp penalties
const backModal = document.querySelector(`.back_modal`);

function confirmBackBtn(e){
    if (e.target.classList.contains(`btn_yes`)){
        user.exp -= 100;
        user.exp = user.exp < 0 ? 0 : user.exp;
        user.formUpdate();
        user.saveToLocal();
        
        backModal.classList.add(`hide`);
        blockScreen.classList.add(`hide`);
        workspace.classList.add(`hide`);
        categoryField.parentElement.classList.remove(`hide`);
        
    } else if (e.target.classList.contains(`btn_no`)){
        backModal.classList.add(`hide`);
        blockScreen.classList.add(`hide`);
    }
    
    backModal.removeEventListener(`click`, confirmBackBtn, true);
}

document.querySelector(`.btn_back`).addEventListener(`click`, () => {
    backModal.classList.remove(`hide`);
    blockScreen.classList.remove(`hide`);
    backModal.childNodes[1].textContent = `You lose 100 expirience.`;
    backModal.addEventListener(`click`, confirmBackBtn, true);
});



////////////////////////////////////create category elements
const categoryAll = [easy, hard, column, equation, moneyPay, time, settings];
categoryField.style.flexWrap = `wrap`;

function catAnimation (elem, direction){
    if (direction) {
        // clearInterval(close);
        
    } else {
        
    }
}

categoryAll.forEach(cat => {
    const category = document.createElement(`div`);
    category.innerHTML = `
    <img src="${cat.src}" alt="" class="category__img"> 
    <div class="category__descr">${cat.name}</div>
    `;
    category.style = "height: 100px; box-shadow: #404040 0px 0px 70px 0px; margin-bottom: 40px;";
    category.classList.add(`category`);
    category.id = cat.id;
    categoryField.append(category);
    
    //open animation
    category.children[0].addEventListener(`pointerenter`, (e) => {
        let i = 0;
        window.open = setInterval(() => {
            if (parseInt(e.target.parentElement.style.height) < 160) {
                i++;
                e.target.parentElement.style.height = (parseInt(e.target.parentElement.style.height) + 2) +`px`;                                  
                e.target.parentElement.style.boxShadow =` 0px 0px 70px ${i}px #404040`;
                e.target.parentElement.style.marginBottom = (parseInt(e.target.parentElement.style.marginBottom) - 2) + `px`;
            } else {
                clearInterval(open);
            }
        },10);
    });
    
    // close
    category.children[0].addEventListener(`pointerout`, (e) => {
        clearInterval(window.open);
        e.target.parentElement.style.height = 100 + `px`; 
        e.target.parentElement.style.marginBottom = 40 + `px`;
        e.target.parentElement.style.boxShadow =` 0px 0px 70px 0px #404040`;
        
    });
});

document.querySelector(`.setings_done`).addEventListener(`click`,() => {
    settings.save();
    blockScreen.classList.add(`hide`);
    document.body.style.overflow = ``;
    document.querySelector(`.setting`).classList.add(`hide`);
});




//todo



});