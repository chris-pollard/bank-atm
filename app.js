var startBtn = document.querySelector('.start-btn');
var numberInput = document.querySelector('.number-input');
var nextBtn = document.querySelector('.next-btn');
var cancelBtn = document.querySelector('.cancel-btn');
var enterBtn = document.querySelector('.enter-btn');
var page1Buttons = document.querySelectorAll('.page-1');
var display = document.querySelector('.display');

var cellA1 = document.querySelector('.a1');
var cellA2 = document.querySelector('.a2');
var cellA3 = document.querySelector('.a3');
var cellB1 = document.querySelector('.b1');
var cellB2 = document.querySelector('.b2');
var cellB3 = document.querySelector('.b3');
var cellC1 = document.querySelector('.c1');
var cellC2 = document.querySelector('.c2');
var cellC3 = document.querySelector('.c3');
var allCells = document.querySelectorAll('.cell');
var topLevelOptions = document.querySelectorAll('.top-level-options');

var page = 0;
var balance = 0;
var withdrawCount = 0;


function toggleHidden(item, index) {
    item.classList.toggle('hidden');
}

function handleStart() {
    if (page === 0) {
        cellB2.textContent = 'welcome! enter 4 digit pin and press ok'

        page1Buttons.forEach(toggleHidden);

        page = 1;
    }
}

startBtn.addEventListener('click',handleStart);

function isPin() {
    var pinAttempt = numberInput.value.toString().length;

    if (pinAttempt === 4) {
        return true
    } else {
        return false
    }
}

function clearInput() {
    numberInput.value = null;
}

function handleEnter() {
    if (page === 1) {

        if (isPin()) {
            cellA2.textContent = 'press next to choose option then press ok';
            cellB2.textContent = 'deposit funds';
            cellB1.textContent = 'view balance';
            cellB3.textContent = 'withdraw funds';
    
            cellB1.classList.add('selected'); 
            


            page = 2;
        } else {
            cellB2.textContent = 'invalid pin. try again';
        }

        
    } else if (page === 2) {
        if (topLevelOptions[0].classList.contains('selected')) {
            showBalance();
        } else if (topLevelOptions[1].classList.contains('selected')) {
            loadDepositPage();
        } else if (topLevelOptions[2].classList.contains('selected')) {
            loadWithdrawPage();
        }


    } else if (page === 3) {
        cellA2.textContent = 'press next to choose option then press ok';
        cellB2.textContent = 'deposit funds';
        cellB1.textContent = 'view balance';
        cellB3.textContent = 'withdraw funds';

        cellB1.classList.add('selected'); 
        clearInput();
        page = 2;
    } else if (page === 4) {
        
        balance += Number(numberInput.value);
        cellA2.textContent = 'press next to choose option then press ok';
        cellB2.textContent = 'deposit funds';
        cellB1.textContent = 'view balance';
        cellB3.textContent = 'withdraw funds';

        cellB1.classList.add('selected'); 
        if (display.classList.contains('zero-background') && balance > 0) {
            display.classList.remove('zero-background');
        }

        page = 2;
    } else if (page === 5) {
        if (balance - Number(numberInput.value) < 0) {
            cellB2.textContent = 'You do not have enough funds to process this request. Press cancel to go back.'
        } else if (withdrawCount >= 5) {
            balance -= (Number(numberInput.value) + 2);
            
            cellB2.textContent = 'Over 5 withdrawals so $2 fee. Re-enter amount to continue.';
            
            page = 7;
        } else {
            balance -= Number(numberInput.value);
            cellA2.textContent = 'press next to choose option then press ok';
            cellB2.textContent = 'deposit funds';
            cellB1.textContent = 'view balance';
            cellB3.textContent = 'withdraw funds';
    
            cellB1.classList.add('selected'); 
            withdrawCount += 1;
            page = 2;
        }

        if (balance === 0) {
            display.classList.add('zero-background');
        }
        
    } else if (page === 6) {
        balance = 0;
        page = 0;
        cellB2.textContent = '';
        page1Buttons.forEach(toggleHidden);
    } else if (page === 7) {
        balance -= (Number(numberInput.value) + 2);
        cellA2.textContent = 'press next to choose option then press ok';
        cellB2.textContent = 'deposit funds';
        cellB1.textContent = 'view balance';
        cellB3.textContent = 'withdraw funds';

        cellB1.classList.add('selected'); 
        withdrawCount += 1;
        page = 2;
    }

    clearInput();
}

function showBalance() {

    cellA2.textContent = 'balance';
    cellB2.textContent = `$${balance}`;
    topLevelOptions[0].classList.remove('selected');
    cellB1.textContent = '';
    cellB3.textContent = '';
    page = 3;
}

function loadDepositPage() {
    cellB2.textContent = 'Enter amount and press ok';
    topLevelOptions[1].classList.remove('selected');
    cellA2.textContent = '';
    cellB1.textContent = '';
    cellB3.textContent = '';

    page = 4;
}

function loadWithdrawPage() {
    cellB2.textContent = 'Enter amount and press ok';
    topLevelOptions[2].classList.remove('selected');
    cellA2.textContent = '';
    cellB1.textContent = '';
    cellB3.textContent = '';

    page = 5;
}

enterBtn.addEventListener('click',handleEnter);

function handleNext() {
    for (var i = 0; i < topLevelOptions.length; i++) {
        if (topLevelOptions[i].classList.contains('selected')) {


            topLevelOptions[i].classList.remove('selected');
            if (i === topLevelOptions.length - 1) {
                topLevelOptions[0].classList.add('selected');
            } else {
                topLevelOptions[i+1].classList.add('selected');
            }
            
            


            break
        }
    }
}

nextBtn.addEventListener('click',handleNext);



function handleCancel() {
    if (page > 2) {
        cellA2.textContent = 'press next to choose option then press ok';
        cellB2.textContent = 'deposit funds';
        cellB1.textContent = 'view balance';
        cellB3.textContent = 'withdraw funds';

        cellB1.classList.add('selected'); 

        page = 2;
    } else {
        for (i = 0; i < allCells.length; i++) {
            
            allCells[i].classList.remove('selected');
            allCells[i].textContent = '';
            cellB2.textContent = 'Exit?'

        
        }

        page = 6;
    }

    clearInput();
}


cancelBtn.addEventListener('click',handleCancel);