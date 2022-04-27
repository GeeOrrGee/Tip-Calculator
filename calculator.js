//Input values
const billInput = document.getElementById('bill');
const pplNumber = document.getElementById('ppl');
console.log(typeof billInput.value);
// Button selectors

const buttons = document.querySelectorAll('.btn-wrapper > button');
const resetBtn = document.querySelector('.right-side button');
const customBtn = document.getElementById('custom');

console.log(resetBtn);

// result DOM

const tipElement = document.querySelector('.tip-result span');
const totalElement = document.querySelector('.total-per-prsn span');
console.log(parseInt(totalElement.innerText));
function submitForm(event) {
    event.preventDefault();
}

console.log(parseInt(tipElement.innerText));

//  core functions

function resetBtnClickHandler() {
    resetBtn.addEventListener('click', () => {
        billInput.value = '';
        pplNumber.value = '';
        tipElement.innerText = '0.00';
        totalElement.innerText = '0.00';
        resetBtn.classList.remove('reset-active');
    });
}
function customInput() {
    let newInputStore;
    customBtn.addEventListener('mouseenter', (event) => {
        const newInput = document.createElement('input');
        newInput.style.width = '7.8rem';
        newInput.style.backgroundColor = 'hsl(189, 41%, 97%)';
        newInput.style.border = 'none';
        newInput.style.borderRadius = '0.4rem';
        newInput.style.textAlign = 'right';
        newInput.style.color = 'hsl(183, 100%, 15%)';
        newInput.style.fontSize = '1.7rem';
        newInput.setAttribute('value', '');
        newInput.setAttribute('type', 'number');
        newInput.placeholder = '0';

        customBtn.replaceWith(newInput); // Styles and replacing elements

        function customPercentageHandler() {
            newInput.addEventListener('input', (event) => {
                if (validityCheck(newInput)) {
                    console.log(parseInt(newInput.value));
                    document
                        .querySelector('#invalid-ppl')
                        .classList.add('invalid-input');
                    return alert(
                        'Invalid Input! Only numbers higher than 0 are allowed. Enter the value of the bill and a number of people first.'
                    );
                } else if (
                    document
                        .querySelector('#invalid-ppl')
                        .classList.contains('invalid-input')
                ) {
                    document
                        .querySelector('#invalid-ppl')
                        .classList.remove('invalid-input');
                }

                calculation(newInput);
                resetBtn.classList.add('reset-active');
            });
        }

        customPercentageHandler();
        newInput.addEventListener('mouseleave', () => {
            newInput.replaceWith(customBtn);
        });
    });
}

function main() {
    for (const button of buttons) {
        button.addEventListener('click', () => {
            if (validityCheck(button)) {
                console.log(parseInt(button.value));
                document
                    .querySelector('#invalid-ppl')
                    .classList.add('invalid-input');
                return alert(
                    'Invalid Input! Only numbers higher than 0 are allowed. Enter the value of the bill and a number of people first.'
                );
            } else if (
                document
                    .querySelector('#invalid-ppl')
                    .classList.contains('invalid-input')
            ) {
                document
                    .querySelector('#invalid-ppl')
                    .classList.remove('invalid-input');
            }
            calculation(button);
            resetBtn.classList.add('reset-active');
        });
    }
}

function calculation(percentValue) {
    const tip =
        (parseInt(percentValue.value) * parseInt(billInput.value)) / 100;
    console.log(percentValue);
    const finalValue = parseInt(billInput.value) + tip;
    const perPersonFinal = finalValue / parseInt(pplNumber.value);
    const perPersonTip = tip / parseInt(pplNumber.value);
    tipElement.textContent = perPersonTip.toFixed(2);
    totalElement.textContent = perPersonFinal.toFixed(2);
}

function validityCheck(inputValues) {
    return (
        isNaN(parseInt(billInput.value)) ||
        parseInt(billInput.value) <= 0 ||
        isNaN(parseInt(inputValues.value)) ||
        parseInt(inputValues.value) <= 0 ||
        isNaN(parseInt(pplNumber.value)) ||
        parseInt(pplNumber.value) <= 0
    );
}

main();
customInput();
resetBtnClickHandler();
