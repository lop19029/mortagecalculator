//Aproves computeMortage()
var RUN_CALCULATION;

function formValidator(){
    /*Checks if any of the form fields is empty, if so, calls displayAlert() and returns false.
    Also sets focus to the first empty field.
    Otherwise, returns true.*/

    //Declare variables and set values
    var apr, term, amount, alert;
    alert = false;
    apr = document.getElementById("apr");
    term = document.getElementById("term");
    amount = document.getElementById("amount");

    //Check for empty fields
    if(apr.value.length === 0){
        alert = true;
        displayAlert(alert);
        document.getElementById("apr").focus();
        return
    }
    if(term.value.length === 0){
        alert = true;
        displayAlert(alert);
        document.getElementById("term").focus();
        return
    }
    if(amount.value.length === 0){
        alert = true;
        displayAlert(alert);
        document.getElementById("amount").focus();
        return
    }
    else{
        displayAlert(alert);
        computeMortage();
        return
    }
}

function fieldValidator(){
    /*Takes the value from apr and Loan term, and checks if they fill the input requirements for each of them
    If something is wrong, sets RUN_CALCULATION = false and wipes the payment field
    If they are okay, sets RUN_CALCULATION = true and run formValidator() */
    
    var apr, term;
    apr = parseFloat(document.getElementById("apr").value);
    term = parseInt(document.getElementById("term").value);
   
    if (apr <= 0 || apr > 25.00){
        document.getElementById("aprAlert").innerHTML = "*APR value must be higher than 0 and lower or equal 25.00";
        document.getElementById("apr").focus();
        document.getElementById("payment").value = ""
        RUN_CALCULATION = false;
    }
    if(term <= 0 || term > 40){
        document.getElementById("termAlert").innerHTML = "*Loan term must be higher that 0 and lower or equal 40 years";
        document.getElementById("term").focus();
        document.getElementById("payment").value = ""
        RUN_CALCULATION = false;
    }
    if(apr > 0 & apr <= 25.00) {
        document.getElementById("aprAlert").innerHTML = "";
    }
    if(term > 0 & term <= 40){
        document.getElementById("termAlert").innerHTML = "";
    }
    if((term > 0 & term <= 40) & (apr >= 0 & apr <= 25.00)){ 
        RUN_CALCULATION = true;
        formValidator()       
}

}

function displayAlert(alert){
    /*Receives an alert boolean value, if true, displays an alert message
    at the top of the calculator.
    Otherwise, sets the alert message to an empty string*/
    if(alert === true){
        document.getElementById("alert").innerHTML = "*All the calculator fields must be filled";
        document.getElementById("payment").value = ""
    }
    else{
        document.getElementById("alert").innerHTML = "";
    }
}

function computeMortage(){
    /*Calculates Monthly Payment and displays on the calculator if RUN_CALCULATION = true
    Otherwise, wipes the payment field and calls FieldValidator()*/
    var apr, term, amount, payment, monthlyPayment;

    if (RUN_CALCULATION){
      
      apr = (parseFloat(document.getElementById("apr").value) / 100) / 12;
      term = parseFloat(document.getElementById("term").value) * 12;
      amount = parseFloat(document.getElementById("amount").value);
      //Do math
      payment = amount * apr * (Math.pow(1 + apr, term)) / (Math.pow(1 + apr, term) - 1);
    
      //Display value on Calculator
      monthlyPayment = payment.toFixed(2);
      if(monthlyPayment === "NaN"){
        document.getElementById("payment").value = "Loading...";
      }
      else{
        document.getElementById("payment").value = monthlyPayment;   

      } 
    }
    else{
        document.getElementById("payment").value = ""
        fieldValidator()
    }
    
} 
