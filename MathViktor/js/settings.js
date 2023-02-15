const settings = {
    id: `settings`,
    name: `Settings`,
    src: `img/settings.png`,

    easyCount: localStorage.getItem(`easyCount`) || 9,
    easyEleMin: localStorage.getItem(`easyEleMin`) || 3,
    easyEleMax: localStorage.getItem(`easyEleMax`) || 4,

    hardCount: localStorage.getItem(`hardCount`) || 9,
    hardEleMin: localStorage.getItem(`hardEleMin`) || 2,
    hardEleMax: localStorage.getItem(`hardEleMax`) || 3,

    columnCount: localStorage.getItem(`columnCount`) || 6,

    equationCount: localStorage.getItem(`equationCount`) || 9,
    equationEleMin: localStorage.getItem(`equationEleMin`) || 3,
    equationEleMax: localStorage.getItem(`equationEleMax`) || 4,
    
    moneyPayMin: localStorage.getItem(`moneyPayMin`) || 10,
    moneyPayMax: localStorage.getItem(`moneyPayMax`) || 50,
    
    timeTaskCount: localStorage.getItem(`timeTaskCount`) || 1,
    timeFormat: localStorage.getItem(`timeFormat`) || 24,
    timeMinuteAsist: localStorage.getItem(`timeMinuteAsist`) === `true` ? true : false,

    load: function (){
        const labels = document.querySelectorAll(`select`);
        const result = Object.keys(this).map(key => [this[key]]);
        document.getElementById(`timeMinuteAsist`).checked = this.timeMinuteAsist === `true` ? true : false;
        labels.forEach((label, i) => {
            label.value = result[i + 3];
        });
    },
    
    save: function (){
        const labels = document.querySelectorAll(`select`);
        const result = Object.keys(this).map(key => [this[key]]);
        labels.forEach((item, i) => {
            localStorage.setItem(item.id, item.value);
        });
        localStorage.setItem(`timeMinuteAsist`, document.getElementById(`timeMinuteAsist`).checked);

        this.easyCount = localStorage.getItem(`easyCount`);
        this.easyEleMin = localStorage.getItem(`easyEleMin`);
        this.easyEleMax = localStorage.getItem(`easyEleMax`);
    
        this.hardCount = localStorage.getItem(`hardCount`);
        this.hardEleMin = localStorage.getItem(`hardEleMin`);
        this.hardEleMax = localStorage.getItem(`hardEleMax`);
    
        this.columnCount = localStorage.getItem(`columnCount`);
    
        this.equationCount = localStorage.getItem(`equationCount`);
        this.equationEleMin = localStorage.getItem(`equationEleMin`);
        this.equationEleMax = localStorage.getItem(`equationEleMax`);
        
        this.moneyPayMin = localStorage.getItem(`moneyPayMin`) ;
        this.moneyPayMax = localStorage.getItem(`moneyPayMax`) ;

        this.timeTaskCount = localStorage.getItem(`timeTaskCount`);
        this.timeFormat = localStorage.getItem(`timeFormat`);
        this.timeMinuteAsist = localStorage.getItem(`timeMinuteAsist`);
    },
};