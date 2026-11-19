import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

const formatValue = (value) => {
  if (!Number.isFinite(value)) return 'Error'
  if (Math.abs(value) > 1e12 || (Math.abs(value) > 0 && Math.abs(value) < 1e-8)) return value.toExponential(4)
  return Number(value.toPrecision(11)).toString()
}

export default function CalculatorPad({ language = 'en' }) {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [replaceDisplay, setReplaceDisplay] = useState(false)
  const tr = language === 'tr'

  const enterDigit = (digit) => {
    if (display === 'Error' || replaceDisplay) {
      setDisplay(digit)
      setReplaceDisplay(false)
      return
    }
    setDisplay((current) => current === '0' ? digit : current.length < 16 ? `${current}${digit}` : current)
  }

  const enterDecimal = () => {
    if (display === 'Error' || replaceDisplay) {
      setDisplay('0.')
      setReplaceDisplay(false)
      return
    }
    if (!display.includes('.')) setDisplay(`${display}.`)
  }

  const calculate = (left, right, op) => {
    if (op === '+') return left + right
    if (op === '−') return left - right
    if (op === '×') return left * right
    if (op === '÷') return right === 0 ? Number.NaN : left / right
    return right
  }

  const chooseOperator = (nextOperator) => {
    const current = Number(display)
    if (operator && !replaceDisplay && storedValue !== null) {
      const result = calculate(storedValue, current, operator)
      setDisplay(formatValue(result))
      setStoredValue(result)
    } else {
      setStoredValue(current)
    }
    setOperator(nextOperator)
    setReplaceDisplay(true)
  }

  const equals = () => {
    if (!operator || storedValue === null) return
    const result = calculate(storedValue, Number(display), operator)
    setDisplay(formatValue(result))
    setStoredValue(null)
    setOperator(null)
    setReplaceDisplay(true)
  }

  const clear = () => {
    setDisplay('0')
    setStoredValue(null)
    setOperator(null)
    setReplaceDisplay(false)
  }

  const backspace = () => {
    if (replaceDisplay || display === 'Error') {
      setDisplay('0')
      setReplaceDisplay(false)
      return
    }
    setDisplay((current) => current.length <= 1 || (current.length === 2 && current.startsWith('-')) ? '0' : current.slice(0, -1))
  }

  const percent = () => {
    const value = Number(display) / 100
    setDisplay(formatValue(value))
    setReplaceDisplay(true)
  }

  const toggleSign = () => {
    if (display !== '0' && display !== 'Error') setDisplay((current) => current.startsWith('-') ? current.slice(1) : `-${current}`)
  }

  const keys = [
    { label: 'AC', action: clear, type: 'muted' },
    { label: '±', action: toggleSign, type: 'muted' },
    { label: '%', action: percent, type: 'muted' },
    { label: '÷', action: () => chooseOperator('÷'), type: 'operator' },
    { label: '7', action: () => enterDigit('7') },
    { label: '8', action: () => enterDigit('8') },
    { label: '9', action: () => enterDigit('9') },
    { label: '×', action: () => chooseOperator('×'), type: 'operator' },
    { label: '4', action: () => enterDigit('4') },
    { label: '5', action: () => enterDigit('5') },
    { label: '6', action: () => enterDigit('6') },
    { label: '−', action: () => chooseOperator('−'), type: 'operator' },
    { label: '1', action: () => enterDigit('1') },
    { label: '2', action: () => enterDigit('2') },
    { label: '3', action: () => enterDigit('3') },
    { label: '+', action: () => chooseOperator('+'), type: 'operator' },
    { label: '⌫', action: backspace, type: 'muted', ariaLabel: tr ? 'Son rakamı sil' : 'Backspace' },
    { label: '0', action: () => enterDigit('0'), wide: true },
    { label: '.', action: enterDecimal },
    { label: '=', action: equals, type: 'equals' },
  ]

  return (
    <div className="calculator">
      <div className="calculator-display" aria-live="polite">
        <span className="calculator-expression">{storedValue !== null && operator ? `${formatValue(storedValue)} ${operator}` : (tr ? 'HESAP MAKİNESİ' : 'CALCULATOR')}</span>
        <strong>{display}</strong>
      </div>
      <div className="calculator-keys">
        {keys.map((key, index) => (
          <button
            key={`${key.label}-${index}`}
            className={`calc-key ${key.type || ''} ${key.wide ? 'calc-wide' : ''} ${operator === key.label ? 'is-active' : ''}`}
            type="button"
            onClick={key.action}
            aria-label={key.ariaLabel || key.label}
          >{key.label}</button>
        ))}
      </div>
      <p className="calc-caption"><RotateCcw size={13} /> {tr ? 'Temel dört işlem hesap makinesi' : 'Basic four-function calculator'}</p>
    </div>
  )
}
