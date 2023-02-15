const user = {
    level: localStorage.getItem(`level`) || 0,
    exp: localStorage.getItem(`exp`) === `NaN` ? 0 : localStorage.getItem(`exp`),
    photo:"img/viktor.jpg",
    taskEasy: localStorage.getItem(`taskEasy`) || 0,
    taskHard: localStorage.getItem(`taskHard`) || 0,
    taskColumn: localStorage.getItem(`taskColumn`) || 0,
    taskEquation: localStorage.getItem(`taskEquation`) || 0,
    taskPay: localStorage.getItem(`taskPay`) || 0,
    taskTime: localStorage.getItem(`taskTime`) || 0,

    expMax: function(){ // increase exp need for each next lvl
        return 100 + (this.level * 10);
    },
    
    getExp: function(exp){
        user.exp += exp;
        while (user.exp >= user.expMax()){
            user.exp = user.exp % user.expMax();
            user.level++;
        }  
        switch (exp){
            case 15: this.taskEasy++; break;
            case 30: this.taskHard++; break;
            case 50: this.taskColumn++; break;
            case 25: this.taskEquation++; break;
            case 60: this.taskPay++; break;
        }
    },

    formUpdate: function(){
        const currentExp = document.getElementById(`currentExp`),
              maxExp = document.getElementById(`max`),
              bar = document.querySelector(`.exp_bar_filled`);

        currentExp.textContent = user.exp;
        maxExp.textContent = user.expMax();
        bar.style.width = `${Math.round(user.exp / user.expMax() * 100)}%`; // exp bar fill

        document.querySelector(`.userModal`).childNodes[5].innerHTML =`<center><b><h2>You are ${this.level} level.</h2></b></center>`;

        document.getElementById(`infoStat`).innerHTML = `
            <ul>
            <li><B>Easy : ${this.taskEasy}</B></li>
            <li><b>Hard : ${this.taskHard}</b></li>
            <li><b>Column : ${this.taskColumn}</b></li>
            <li><b>Equation  : ${this.taskEquation}</b></li>
            <li><b>Money : ${this.taskPay}</b></li>
            <li><b>Time : ${this.taskTime}</b></li>
            </ul>
        `;        
    },
    
    saveToLocal: function (){ 
       localStorage.setItem(`level`,this.level);
       localStorage.setItem(`exp`,this.exp);
       localStorage.setItem(`taskEasy`,this.taskEasy);
       localStorage.setItem(`taskHard`,this.taskHard);
       localStorage.setItem(`taskColumn`,this.taskColumn);
       localStorage.setItem(`taskEquation`,this.taskEquation);
       localStorage.setItem(`taskPay`,this.taskPay);
       localStorage.setItem(`taskTime`,this.taskTime);
    },
};