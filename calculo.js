const calculator = document.querySelector('#calculator')
const keys = calculator.querySelector('#keyboard')
const displayPress = document.querySelector('#last-calc')
const display = document.querySelector('#resul-screen')


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = displayPress.textContent

        const calculate = (n1, operator, n2) => {
            const firstNum = parseFloat(n1)
            const secondNum = parseFloat(n2)

            switch (operator) {
                case '+':
                    return firstNum + secondNum
                case '-':
                    return firstNum - secondNum
                case 'x':
                    return firstNum * secondNum
                case '/':
                    return firstNum / secondNum
                case '%':
                    return firstNum * (secondNum / 100)
                default:
                    return null
            }
        }

        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if (
                displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'
            ) {
                displayPress.textContent = keyContent
            } else {
                displayPress.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        if (
            action === '-' ||
            action === '+' ||
            action === 'x' ||
            action === '/' ||
            action === '%' ||
            action === 'plusMinus'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }

            displayPress.textContent = displayedNum + " " + action + " "
            calculator.dataset.operator = action
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                displayPress.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'clear') {
            if (key.textContent === 'C') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'C'
            }

            display.textContent = 0
            displayPress.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action === 'cancelEntry') {
            console.log('cancel Entry!')
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})