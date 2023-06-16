console.log("Hello ts");
handleOnLoad();

interface UserData {
    name: string,
    email: string,
    cpf: string,
}

interface InputData {
    name: string,
    value: string,
}

interface Window {
    user: any,
}

function isPropertyOfUserData(propertyName: string): propertyName is 'name' | 'email' | 'cpf' {
    if (propertyName === 'name' ||
        propertyName === 'email' ||
        propertyName === 'cpf') {
        return true;
    }
    return false;

}

function isAnUserData(value: unknown): value is UserData {
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

    const userFromStorage: string | null = localStorage.getItem('userData');
    const userDataFromStorage: unknown = userFromStorage?(JSON.parse(userFromStorage)):(undefined);

    if (isAnUserData(userDataFromStorage)) {
        window.user = userDataFromStorage;
        if (form instanceof HTMLFormElement) {
            [...form.elements].filter((inputEle): inputEle is HTMLInputElement => {
                return inputEle instanceof HTMLInputElement;
            }).forEach((inputData) => {
                const inputName = inputData.name;
                if (isPropertyOfUserData(inputName)) {
                    inputData.value = userDataFromStorage[inputName];
                }
            })
        }
    }
}

function handleKeyUp(e: Event) {
    const input = e.target;

    if (input instanceof HTMLInputElement) {
        const userInStorage = localStorage.getItem('userData');
        const userDataInStorage = userInStorage ? (JSON.parse(userInStorage)) : (undefined);
        const userInStorageExistAsObject = userDataInStorage && typeof userDataInStorage === 'object' && (!Array.isArray(userInStorage));
        const user: any = userInStorageExistAsObject ? (userDataInStorage) : {};
        user[input.name] = input.value;
        window.user = user;
        localStorage.setItem('userData', JSON.stringify(user));
    }
}

