//create infoButton
const infoButton = document.createElement(`div`);
infoButton.classList.add(`infoButton`, `title`);
infoButton.id = `infoBut`;
infoButton.innerText = `Description`;
document.querySelector(`.userModal`).append(infoButton);

// create infoBox on press
const infoBox = document.createElement(`div`);
infoBox.id = `infoBut1`;
infoButton.addEventListener(`click`, () => {
    if (document.querySelector(`.infoBox`) === null) {
        infoBox.classList.add(`infoBox`, `infoB`);
        infoButton.append(infoBox);
        let i = 0;
        const descAnimation = setInterval(() => {
            i += 4;
            if (i < 150) {
                infoButton.style.height = 40 + i + `px`;
            } else {
                clearInterval(descAnimation);
            }
        }, 10);
        infoBox.innerText = `You can turn off this noisie "info" by clicking here again.`;
        window.addEventListener(`mouseover`, rec, true);
    } else {
        document.querySelector(`.infoBox`).remove();
        infoButton.style.height = `30px`;
        window.removeEventListener(`mouseover`, rec, true);
        // infoButton.style.borderRadius = `20px 20px 20px 20px`;
    }
    
});
function rec (event){
    if (event.target.nodeName !== `HTML`) {
        const elem = event.target; // rec needed only to get element from event (cant put event.target in infoPoint)
        infoPoint(elem);
    }
}

// parsing parents to find needed ID
function infoPoint (elem) {
    switch (elem.id) {
        //userModal
        case `infoPhoto`: infoBox.innerText = `Here is where your photo is supposed to be.`;
            break;
        case `infoUser`: infoBox.innerText = `Here you can find a bit of information about the user.`;
            break;
        case `infoExp`: infoBox.innerText = `Current experience and progress bar towards the next level.`;
            break;
        case `infoStat`: infoBox.innerText = `You can see here how many examples you have already completed.`;
            break;
        case `infoBut`: infoBox.innerText = `You can turn off this "info" by clicking here again.`;
            break;
        case `infoBut1`: infoBox.innerText = `You can turn off this "info" by clicking here again.`;
            break;

        //Cathegories    
        case `easy`: infoBox.innerText = `"Easy" examples can be generated with each element in the range of 0-20.
         The number of examples and elements can be adjusted in the settings.`;
            break;
        case `hard`: infoBox.innerText = `"Hard" examples can be generated with each element in the range of 0-100.
         The number of examples and elements can be adjusted in the settings.`;
            break;
        case `column`: infoBox.innerText = `In the "Column" section,
         you can learn to count two elements within the range of 1000-5000.`;
            break;
        case `equation`: infoBox.innerText = `Here you should find "X".
         The elements should be in the range of 0-10, and "X" cannot be below zero.`;
            break;
        case `moneyPay`: infoBox.innerText = `In the "Money" section,
         a price is generated and you need to pay the correct amount by clicking on the money.`;
            break;
        case `time`: infoBox.innerText = `In the "Time" section, you need to set the correct time on the clock.
         You can add up to 4 additional tasks in the settings menu.`;
            break;
        case `settings`: infoBox.innerText = `Here you can configure the examples and tasks to make them harder or easier.`;
            break;
            
            // others
        case `infoBackBtn`: infoBox.innerText = `By clicking this button, you can go to the category selection.
         However, if you haven't solved all the examples, you will lose 100 experience points.
          (Your current experience cannot drop below zero.)`;
            break;
        case `infoClock`: infoBox.innerText = `In this section, you need to set the arrows to the correct time.
         You can switch the arrows by clicking on the same arrow a second time.`;
            break;
        case `infoCheckAnswer`: infoBox.innerText = `Let's see if you have counted it right.
         Both "Enter" buttons are available here.`;
            break;
        case `infoNote`: infoBox.innerText = `Here, you can write the solution if you need to.`;
            break;
        case `infoAnswer`: infoBox.innerText = `Write your answer here.`;
            break;
        case `infoExample`: 
            if (document.querySelectorAll(`.money`).length === 11) {
                infoBox.innerText = `Click on the money to pay the right amount.`;
            } else {
                infoBox.innerText = `Click it and solve it!`;
            }
            break;
        
        default:
            if (elem.parentNode === document.body){
                infoBox.innerText = `Move your cursor over objects to see their description.`;
            } else {
                infoPoint(elem.parentElement);
            }
            break;
    }

}