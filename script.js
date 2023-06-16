"use strict";
console.log("Hello ts");
handleOnLoad();
function isPropertyOfUserData(propertyName) {
    if (propertyName === 'name' ||
        propertyName === 'email' ||
        propertyName === 'cpf') {
        return true;
    }
    return false;
}
function isAnUserData(value) {
    if (value && typeof value === 'object' && !Array.isArray(value))
        if ('name' in value && 'email' in value && 'cpf' in value)
            return true;
    return false;
}
function handleOnLoad() {
    const form = document.getElementById("register-form");
    if (form) {
        form.addEventListener("keyup", handleKeyUp);
    }
    const userFromStorage = localStorage.getItem('userData');
    const userDataFromStorage = userFromStorage ? (JSON.parse(userFromStorage)) : (undefined);
    if (isAnUserData(userDataFromStorage)) {
        if (form instanceof HTMLFormElement) {
            [...form.elements].filter((inputEle) => {
                return inputEle instanceof HTMLInputElement;
            }).forEach((inputData) => {
                const inputName = inputData.name;
                if (isPropertyOfUserData(inputName)) {
                    inputData.value = userDataFromStorage[inputName];
                }
            });
        }
    }
}
function handleKeyUp(e) {
    const input = e.target;
    if (input instanceof HTMLInputElement) {
        const userInStorage = localStorage.getItem('userData');
        const userDataInStorage = userInStorage ? (JSON.parse(userInStorage)) : (undefined);
        const userInStorageExistAsObject = userDataInStorage && typeof userDataInStorage === 'object' && (!Array.isArray(userInStorage));
        const user = userInStorageExistAsObject ? (userDataInStorage) : {};
        user[input.name] = input.value;
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
