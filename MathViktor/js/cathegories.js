
let taskNo,
    exampls = [],
    globalExp;

const categoryField = document.getElementById(`category`),
    workspace = document.querySelector(`.workspace`),   
    exampleField = document.querySelector(`.exampls`),    
    answerBox = document.querySelector(`.answer_box`),
    btnDone = document.querySelector(`.answer_done`),
    blockScreen = document.querySelector(`.blockscreen`),
    messageScreen = document.querySelector(`.right_answer`);



function enterPress(e){
    if (e.code === `Enter` || e.code === `NumpadEnter`) {
        checkExample();
    }
}

// random func
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// checking answer func
function checkExample(){
    new Promise (resolve => {
        const input = document.querySelector(`.answer_input`);
        if (input.value == exampls[taskNo][0]){
            user.getExp(globalExp);
            user.formUpdate();
            document.getElementById(taskNo.toString()).classList.add(`green`);
            let x = 100;
            const fade = setInterval(() => {
                document.getElementById(taskNo.toString()).style.opacity = x + `%`;
                x--;
                if (x < 0 ) {
                    document.getElementById(taskNo.toString()).remove();
                    clearInterval(fade);
                    resolve();
                }
            },10);
        } else {
            document.getElementById(taskNo.toString()).classList.add(`red`);
        }
        answerBox.classList.add(`hide`);
        blockScreen.classList.add(`hide`);
        document.body.style.overflow = ``;
    }).then(() => {
        if (exampleField.childElementCount === 0){
            categoryField.parentElement.classList.remove(`hide`);
            workspace.classList.add(`hide`);
            user.saveToLocal();
        }
        btnDone.removeEventListener(`click`, checkExample, true);
        window.removeEventListener(`keydown`,enterPress, true);
    });
}


const easy = {
    name: `Easy`,
    src: `img/Easy_icon.png`,
    description: `Easy examples. Give 15 expirience for each.`,
    id: `easy`,
    exp: 15,

    getExamples: function (examplCount, elemCountMin, elemCountMax, min, max) {
        exampls = [];
        for (let counter = 1; counter <= examplCount; counter++){
            const elemCount = getRandom(elemCountMin, elemCountMax);
            let sum = Math.sqrt(Math.pow(getRandom(min, max), 2)),
                exempl = [];

            exempl.push(sum);
            for (let i = 2; i <= elemCount; i++){
                const x = getRandom(min, max);
                if (sum + x >= 0){
                    sum += x;
                    exempl.push(x);
                }else{i--;}
            }
            exempl.unshift(sum);
            exampls.push(exempl);
        }
    },
    
    createExamples: function(){
        exampleField.innerHTML = ``;
        exampls.forEach((exam, i) => {
            const task = document.createElement(`div`);
            let examStr = exam[1].toString();

            for (let i = 2; i < exam.length; i++){
                if (exam[i] < 0){
                    examStr += ` - ${exam[i] * -1}`;
                }else{
                    examStr += ` + ${exam[i]}`;
                }
            }

            task.innerHTML = `
                <div class="center">
                <p>${examStr} = ?</p>
                </div>
            `;
            task.classList.add(`case`);
            task.id = i;
            exampleField.append(task);
            task.addEventListener(`click`, () => {
                answerBox.classList.remove(`hide`);
                blockScreen.classList.remove(`hide`);
                document.body.style.overflow = `hidden`;
                answerBox.children[0].innerHTML = `<br>${examStr} = ?`;
                document.querySelector(`.answer_input`).value = ``;
                document.querySelector(`.answer_input_test`).value = ``;
                document.querySelector(`.answer_input`).focus();
                                                                                console.log(`answer : `,exam[0]);
                
                taskNo = i;// peredaju v checkExample
                btnDone.addEventListener(`click`, checkExample, true);
                window.addEventListener(`keydown`, enterPress, true);
            });
        });
    },
};

const hard = Object.assign({}, easy);
    hard.name = `Hard`;
    hard.src = `img/Hard_icon.png`;
    hard.description = `Hard examples. Give 30 expirience for each.`;
    hard.id = `hard`;
    hard.exp = 30;

const column = {
    name: `Column`,
    src: `img/Column_icon.png`,
    description: `Learning count in column. Give 50 expirience for each.`,
    id: `column`,
    exp: 50,
    getExamples: function (examplCount){
        exampls = [];
        for (let counter = 1; counter <= examplCount; counter++){
            let x = getRandom(1000, 5000),
                y = getRandom(1000, 5000);
                if (x > y){
                    exampls.push([x - y, x,` - `, y]);
                } else {
                    exampls.push([x + y, x,` + `, y]);
                } 
        }
    },

    createExamples: function (){
        exampleField.innerHTML = ``;
        exampls.forEach((exam, i) => {
            const task = document.createElement(`div`);
            task.innerHTML = `
                <div class="center">
                <p>${exam[1]}${exam[2]}${exam[3]} = ?</p>
                </div>
            `;
            task.classList.add(`case`);
            task.id = i;
            exampleField.append(task);

            task.addEventListener(`click`, () => {
                answerBox.classList.remove(`hide`);
                blockScreen.classList.remove(`hide`);
                document.body.style.overflow = `hidden`;
                                                                        console.log(`answer : `,exam[0]);
                answerBox.children[0].innerHTML = `
                    <div>${exam[1]}</div>
                    <div>${exam[2]}           = ?</div>
                    <div>${exam[3]}</div>
                `;
                answerBox.children[0].classList.remove(`answer_exampl`);
                answerBox.children[0].classList.add(`column_example`);
                document.querySelector(`.answer_input`).value = ``;
                document.querySelector(`.answer_input_test`).value = ``;
                document.querySelector(`.answer_input`).focus();
                
                taskNo = i;// peredaju v checkExample
                btnDone.addEventListener(`click`, checkExample, true);
                window.addEventListener(`keydown`, enterPress, true);
            });
        });
            
    },
};

const equation = {
    name: `Equation`,
    src: `img/Equation_icon.png`,
    description: `Equation examples. For each "X" you found, you will get 25 expirience.`,
    id: `equation`,
    exp: 25,

    createExamples: function(){
        exampleField.innerHTML = ``;
        exampls.forEach((exam, i) => {
            const task = document.createElement(`div`);
            let examStr = ``,
                x = getRandom(1, exam.length - 1);

            while (exam[x] < 0){
            x = getRandom(1, exam.length - 1);
            }
            exam.unshift(exam[x]);
            exam[x + 1] = `X`;

            for (let ii = 2; ii < exam.length; ii++){
                if (exam[ii] < 0){
                    examStr += ` - ${exam[ii] * -1}`;
                }else{
                    examStr += ` + ${exam[ii]}`;
                }
            }
            examStr += ` = ${exam[1]}`;
            examStr = examStr.slice(2);

            task.innerHTML = `
                <div class="center">
                <p>${examStr}</p>
                </div>
            `;
            task.classList.add(`case`);
            task.id = i;
            exampleField.append(task);
            task.addEventListener(`click`, () => {
                answerBox.classList.remove(`hide`);
                blockScreen.classList.remove(`hide`);
                document.body.style.overflow = `hidden`;
                answerBox.children[0].innerHTML = `<br>${examStr}`;
                document.querySelector(`.answer_input`).value = ``;
                document.querySelector(`.answer_input_test`).value = ``;
                document.querySelector(`.answer_input`).focus();
                                                                                console.log(`answer : `,exam[0]);
                
                taskNo = i;// peredaju v checkExample
                btnDone.addEventListener(`click`, checkExample, true);
                window.addEventListener(`keydown`, enterPress, true);
            });
        });
    },
};

const moneyPay = {
    name: `Money`,
    src: `img/euro_icon1.png`,
    description: `You need to pay : `,
    id: `moneyPay`,
    exp: 60,

    createTask: function (minPrice, maxPrice) {
        const price = getRandom(minPrice, maxPrice) / 100;
        const divPrice = document.createElement(`div`);
        const divAnswer = document.createElement(`div`);
        const moneyBase = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
        let answer = 0;

        divPrice.classList.add(`price`);
        divAnswer.classList.add(`price`);
        divPrice.innerText = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
        divAnswer.innerText = answer + ` \u20AC`;
        document.querySelector(`.task__center`).append(divPrice, divAnswer);


        exampleField.innerHTML = ``;
        moneyBase.forEach(item => {
            const div = document.createElement(`div`);
            div.classList.add(`money`);
            div.style.backgroundImage = `url(img/money/${item}.png)`;
            div.id = item;
            exampleField.append(div);

            div.addEventListener(`click`, () => {
                answer += +div.id;
                divAnswer.innerText = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
                .format(answer / 100);
                if (answer === Math.round(price * 100)) {
                    blockScreen.classList.remove(`hide`);
                    messageScreen.innerText = ` Well done! `;
                    messageScreen.classList.remove(`hide`);
                    setTimeout(() => {
                        workspace.classList.add(`hide`);
                        categoryField.parentElement.classList.remove(`hide`);
                        user.saveToLocal();
                        user.getExp(this.exp);
                        user.formUpdate();
                        blockScreen.classList.add(`hide`);
                        messageScreen.classList.add(`hide`);
                    },3000);
                } else if (answer > price * 100) {
                    answer = 0;
                    divAnswer.innerText = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
                    .format(answer / 100); 
                    blockScreen.classList.remove(`hide`);
                    messageScreen.innerText = ` You give too much money. Try again. `;
                    messageScreen.classList.remove(`hide`);
                    setTimeout(() => {
                        blockScreen.classList.add(`hide`);
                        messageScreen.classList.add(`hide`);
                    },3000);                   
                }
            });
        });

    },
};

const time = {
    name: `Time`,
    src: `img/Time_icon.png`,
    description: `Set time on the clock.`,
    id: `time`,
    exp: 50,
    hours: 0,
    minutes: 0,
    selectedArrow: `none`,
    selectedHour: 0,
    selectedMinute: 0,
    color: `white`,
    taskCount: settings.timeTaskCount,
    arrowDirection: `forward`,
    format: settings.timeFormat,

    startTime: function () {
        let hours = getRandom(0, this.format - 1),
            minutes = getRandom(0, 11) * 5;
        //reset
        exampleField.innerHTML = ``;
        this.hours = hours > 11 ? hours - 12 : hours;
        this.minutes = minutes;
        this.selectedArrow = `none`;
        this.selectedHour = 0;
        this.selectedMinute = 0;
        this.color = `white`;
        this.taskCount = settings.timeTaskCount;
        this.arrowDirection = `forward`;
        minutes = minutes < 10 ? `0` + minutes : minutes;
        hours = hours < 10 ? `0` + hours : hours;

        //   create time
        const divTimeTask = document.createElement(`div`);
        divTimeTask.innerText = `${hours}:${minutes}`;
        divTimeTask.classList.add(`price`);
        document.querySelector(`.task__center`).append(divTimeTask);

        // create clock and arrows
        const divClock = document.createElement(`div`);
        const arrowHour = document.createElement(`div`);
        const arrowMinute = document.createElement(`div`);
        divClock.classList.add(`clock`);
        divClock.id = `infoClock`;
        arrowHour.classList.add(`arrowHour`);
        arrowMinute.classList.add(`arrowMinute`);
        exampleField.innerHTML = ``;
        exampleField.append(divClock);
        divClock.append(arrowHour);
        divClock.append(arrowMinute);

        // create  div`s for hours
        for (let i = 0; i < 12; i++) {
            const divHour = document.createElement(`div`);
            divHour.classList.add(`hourArea`);
            divHour.id = i + `hour`;
            divClock.append(divHour);
        }
        // minutes helper show ?
        if (settings.timeMinuteAsist == `true`) {
            const divMinHelper = document.createElement(`div`);
            divMinHelper.classList.add(`minHelper`);
            divClock.append(divMinHelper);
        } else if (document.querySelector(`.minHelper`)) {
            document.querySelector(`.minHelper`).remove();
        }
        // positioning div`s for hours
        const coord = [
            [-665,175],
            [-696,254],
            [-687,312],
            [-659,333],
            [-630,314],
            [-622,254],
            [-650,176],
            [-722,95],
            [-829,37],
            [-959,15],
            [-1088,37],
            [-1196,95],
        ];
        const hourAreaArr = document.querySelectorAll(`.hourArea`);
        hourAreaArr.forEach((div, i) => {
            div.style.top = coord[i][0] + 300 + `px`; 
            div.style.left = coord[i][1] + `px`;
        });

        // highlight hourArea on moseover
        divClock.addEventListener(`pointerover`, event => {
            if (event.target.classList.contains(`hourArea`)) {
                event.target.style.opacity = `50%`;
                event.target.style.backgroundColor = this.color;
                event.target.style.boxShadow = `${this.color} 0px 0px 14px 13px`;
            }
        });

        divClock.addEventListener(`pointerout`, event => {
            if (event.target.classList.contains(`hourArea`)) {
                event.target.style.opacity = `0%`;
            }
        });
        
        console.log(`answer: hours => ${this.hours} - minutes => ${this.minutes}`);

        //     select arrow and move it to selected hourArea
        exampleField.addEventListener(`click`, function list (e)  {
            if (e.target.classList.contains(`arrowHour`)) {
                if (time.selectedArrow === `hour`) {
                    arrowMinute.innerHTML = `<div class="glow_blue"></div>`;
                    time.selectedArrow = `minute`;
                    arrowHour.innerHTML = ``;
                    time.color = `#6c52ec`;
                } else {
                    arrowHour.innerHTML = `<div class="glow_green"></div>`;
                    time.selectedArrow = `hour`;
                    arrowMinute.innerHTML = ``;
                    time.color = `#34ca4b`;
                }
                hourAreaArr.forEach(item => item.style.zIndex = 3);
            } else if (e.target.classList.contains(`arrowMinute`)) {
                if (time.selectedArrow === `minute`) {
                    arrowHour.innerHTML = `<div class="glow_green"></div>`;
                    time.selectedArrow = `hour`;
                    arrowMinute.innerHTML = ``;
                    time.color = `#34ca4b`;
                } else {
                    arrowMinute.innerHTML = `<div class="glow_blue"></div>`;
                    time.selectedArrow = `minute`;
                    arrowHour.innerHTML = ``;
                    time.color = `#6c52ec`;
                }
                hourAreaArr.forEach(item => item.style.zIndex = 3);
            } else if (e.target.classList.contains(`hourArea`)) {
                time.color = `white`;
                arrowHour.innerHTML = ``;
                arrowMinute.innerHTML = ``;
                hourAreaArr.forEach(item => item.style.zIndex = 0);
                if (time.selectedArrow === `hour`) {
                    time.selectedArrow = `none`;
                    time.selectedHour = e.target.id.slice(0,-4);
                    time.arrowMove(arrowHour, 30 * time.selectedHour);
                    if (time.selectedHour == time.hours && time.selectedMinute * 5 == time.minutes) {
                        if (time.taskCount > 0) {
                        time.nextStep(getRandom(-11, 11) * 5);
                        } else {
                            time.done();
                            exampleField.removeEventListener(`click`, list);
                        }
                    }
                } else if (time.selectedArrow === `minute`) {
                    time.selectedArrow = `none`;
                    time.selectedMinute = e.target.id.slice(0,-4);
                    time.arrowMove(arrowMinute, 30 * time.selectedMinute);
                    if (time.selectedHour == time.hours && time.selectedMinute * 5 == time.minutes) {
                        if (time.taskCount > 0) {
                            time.nextStep(getRandom(-11, 11) * 5);
                            } else {
                                time.done();
                                exampleField.removeEventListener(`click`, list);
                            }
                    }
                }
            }
        });
    },

    nextStep: function (timeAdd) { 
        while (timeAdd === 0) { //check for random 0
            timeAdd += getRandom(-11, 11) * 5;
        } 
        // new task to messageScreen => workspace/task
        if (timeAdd < 0) {
            this.arrowDirection = `backward`;
            messageScreen.textContent = `Your next task is subtract ${timeAdd * -1} minutes`;
            document.querySelector(`.task__center`).innerHTML = `Your next task is <div class="price">subtract ${timeAdd * -1} minutes</div>`;
        } else {
            this.arrowDirection = `forward`;
            messageScreen.textContent = `Your next task is add ${timeAdd} minutes`;
            document.querySelector(`.task__center`).innerHTML = `Your next task is <div class="price">add ${timeAdd} minutes</div>`;
        }
        
        blockScreen.classList.remove(`hide`);
        messageScreen.classList.remove(`hide`);
        document.body.style.overflow = `hidden`;
        setTimeout(() => {
            blockScreen.classList.add(`hide`);
            messageScreen.classList.add(`hide`);
            document.body.style.overflow = ``;
        },3000);

        this.changeTime(timeAdd);
        console.log(`answer: hours => ${this.hours} - minutes => ${this.minutes}`);
        this.taskCount--;
    },
    
    changeTime : function(time) {
        this.minutes += time;
        while (this.minutes < 0 || this.minutes >= 60) {
            if (this.minutes >= 60){
                this.minutes -= 60;
                this.hours++;
                if (this.hours >= 12) {
                    this.hours -= 12;
                }
            } else {
                this.minutes += 60;
                this.hours--;
                if (this.hours < 0) {
                    this.hours += 12;
                }
            }
        }
    },

    done: function () {
        messageScreen.innerText = `WoW! Great job! `;
        blockScreen.classList.remove(`hide`);
        messageScreen.classList.remove(`hide`);
        setTimeout(() => {
            workspace.classList.add(`hide`);
            categoryField.parentElement.classList.remove(`hide`);
            user.getExp(this.exp + 15 * settings.timeTaskCount); // 50 + 15 for each additional task
            user.taskTime++;
            user.saveToLocal();
            user.formUpdate();
            blockScreen.classList.add(`hide`);
            messageScreen.classList.add(`hide`);
        },3000);
    },

    arrowMove: function (arrow, degree) {
        let currentDeg = +arrow.style.transform.slice(7,-4);
        if (this.arrowDirection === `forward`) {
            const anim = setInterval(() => {
                if ( currentDeg !== degree && currentDeg < 360) {
                    currentDeg++;
                    arrow.style.transform = `rotate(${currentDeg}deg)`;
                } else if (currentDeg == 360) {
                    currentDeg = 0;
                } else if (currentDeg == degree) {
                    clearInterval(anim);
                }
            },arrow.classList.contains(`arrowHour`) ? 20 : 10);
        } else if (this.arrowDirection === `backward`) {
            const animBackward = setInterval(() => {
                if ( currentDeg !== degree && currentDeg > -1) {
                    currentDeg--;
                    arrow.style.transform = `rotate(${currentDeg}deg)`;
                } else if (currentDeg < 0) {
                    currentDeg = 360;
                } else if (currentDeg == degree) {
                    clearInterval(animBackward);
                }
            },arrow.classList.contains(`arrowHour`) ? 20 : 10);
        }
    },
    
};