
export function userEndValidation(input){
const re = new RegExp("^[a-zA-Z0-9]+$");


if(input.value.length <5){
    input.setCustomValidity("need at least 5 characters" )
}else if(input.value.length >50) {
    input.setCustomValidity("max 50 characters")
 }else if(!re.test(input.value))  {

input.setCustomValidity("only letters and numbers")
 }else{
    input.setCustomValidity("")
 }

input.reportValidity()

 }