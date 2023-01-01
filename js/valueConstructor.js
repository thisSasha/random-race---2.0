export { ValueObject }
function ValueObject(params) {
    if(params.object==undefined) {console.error('requiedParameter@object. Обязательный параметр object в params ValueObject')}
    this.localStorage = params.localStorage;
    this.localStorageName = params.localStorageName;
    this.object = params.object;
    if (this.localStorage) {
        this.value = localStorage.getItem(this.localStorageName);
        localStorage.setItem(this.localStorageName, this.value);
    } else {
        this.value = params.value;
    }
    function checkDefaultText(thi) {
        let x = params.defaultText.split('&');
        x.forEach(el => {
            if (el == 'value') {
                x[x.indexOf(el)] = thi.value;
                x = x.join(' ');
            };
        });
        thi.defaultText = x;
        thi.object.innerHTML = thi.defaultText;
    };
    checkDefaultText(this);
    this.substractValue = function (value) {
        this.value -= value;
        this.object.innerHTML = this.defaultText;
        checkDefaultText(this);
        if (this.localStorage) {
            localStorage.setItem(this.localStorageName, this.value);
        }
    };
    this.setValue = function (value) {
        this.value = value;
        this.object.innerHTML = this.defaultText;
        checkDefaultText(this);
        if (this.localStorage) {
            localStorage.setItem(this.localStorageName, this.value);
        }
    };
    this.addValue = function (value) {
        this.value += value;
        this.value = parseInt(this.value)
        checkDefaultText(this);
        if (this.localStorage) {
            localStorage.setItem(this.localStorageName, this.value);
        }
    };
    this.getValue = function () {
        return this.value;
    }
    this.value = parseInt(this.value)
};