
export function userEndValidation(input) {
    const re = new RegExp("^[a-zA-Z0-9 ]+$");


    if (input.value.length < 5) {
        input.setCustomValidity("need at least 5 characters")
    } else if (input.value.length > 50) {
        input.setCustomValidity("max 50 characters")
    } else if (!re.test(input.value)) {

        input.setCustomValidity("only letters and numbers")
    } else {
        input.setCustomValidity("")
    }

    input.reportValidity()

}

export function playCount(input) {
    const re = new RegExp("^[0-9]+$");

    if (!re.test(input.value)) {

        input.setCustomValidity("only numbers allowed")
    } else {
        input.setCustomValidity("")
    }
}

export function bigStringUserInputValidation(input) {
    const re = new RegExp("^[a-zA-Z0-9 ]+$");


    if (input.value.length < 5) {
        input.setCustomValidity("need at least 5 characters")
    } else if (input.value.length > 100) {
        input.setCustomValidity("max 100 characters")
    } else if (!re.test(input.value)) {

        input.setCustomValidity("only letters and numbers")
    } else {
        input.setCustomValidity("")
    }

    input.reportValidity()

}

export function gameSelectedValidation(game){

    if(game.firstChild.textContent == "No Games Found" || game.firstChild.textContent == ""){
        game.setCustomValidity("you must select a game" )
    }   else{
       game.setCustomValidity("")
    }
    game.reportValidity()

}