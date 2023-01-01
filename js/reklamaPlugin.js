export { getStylesNames, ReklamaLink }
let myI = 0;
let dynamicStyles = null;
function addAnimation(body) {
    if (!dynamicStyles) {
        dynamicStyles = document.createElement('style');
        dynamicStyles.type = 'text/css';
        document.head.appendChild(dynamicStyles);
    };
    dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
};
let styles = {
    'blackRaindbowBrigth': {
        'powered': {
            'interval': '0.65s',
            'many': true,
            'etaps': `
    0%{
        color: #bc0000;
    }
    50%{
        color: #0053ff;
    }
    100%{
        color: #bc0000;
    }`,
        },
        'unpowered': {
            'etaps': [{ 'color': 'grey'}],
        },
        'style': '',
    },
};
function getStylesNames(where) {
    if (typeof where == "object") {
        let reklamaObject = document.createElement('div');
        reklamaObject.innerHTML = styles;
        where.appendChild(reklamaObject);
    } else {
        console.log(styles);
    };
};
function ReklamaLink(objectDiv, text, style, type, href, ...positionXandY) {
    let thisForChildren = this;
    this.objectDiv = objectDiv;
    this.a = document.createElement('a');
    this.a.href = href;
    this.a.target = 'blank';
    this.a.id = 'myLink' + myI.toString();
    this.a.innerHTML = text;
    if (positionXandY[0] != undefined && positionXandY[0] != undefined) {
        this.objectA.style.position = 'absolute';
        this.objectA.style.left = positionXandY[0][0];
        this.objectA.style.top = positionXandY[0][1];
    }
    this.objectDiv.prepend(this.a)
    if (typeof objectDiv != "object") {
        console.error('incorrectParemeterObject. Такого обьекта не существует')
    };
    if (typeof style == "object") {

    } else if (typeof style == "string") {

    } else if (typeof style == "number") {
        this.poweredStyle = styles[Object.keys(styles)[style - 1]].powered;
        this.unpoweredStyle = styles[Object.keys(styles)[style - 1]].unpowered;
    };
    function checkPower() {
        function myLocalFunc(powerOrNo) {
            if (thisForChildren[powerOrNo].many) {
                addAnimation(
    `
    @keyframes myLink${myI}{
        ${thisForChildren[powerOrNo].etaps}
    }
    `
                )
                thisForChildren.a.style.pointerEvents = 'all';
                thisForChildren.a.style.animation = `myLink${myI} ${thisForChildren[powerOrNo].interval} infinite linear`
            } else {
                thisForChildren.a.style.animation = ``;
                thisForChildren.a.style.pointerEvents = 'none';
                let keys = Object.keys(thisForChildren[powerOrNo].etaps[0]);
                let values = Object.values(thisForChildren[powerOrNo].etaps[0]);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = values[i];
                    thisForChildren.a.style[key] = value;
                }
            };
        };
        if (thisForChildren.power) {
            myLocalFunc('poweredStyle');
        } else {
            myLocalFunc('unpoweredStyle')
        };
    };
    this.powerOn = function () {
        thisForChildren.power = true;
        checkPower()

    };
    this.powerOff = function () {
        thisForChildren.power = false;
        checkPower()

    };
    this.powerOn();
    myI++
};