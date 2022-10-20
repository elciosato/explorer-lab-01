import "./css/index.css"
import IMask from "imask"

const ccBgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogoImg = document.querySelector(".cc-logo span:nth-child(2) img")
function setCardType(type) {
  const cardType = {
    visa: ["#2D57F2", "#436D99", "/cc-visa.svg"],
    mastercard: ["#C69347", "#DF6F29", "/cc-mastercard.svg"],
    default: ["black", "gray", "/cc-default.svg"],
  }
  let index = "default"

  if (type in cardType) {
    index = type
  }

  ccBgColor1.setAttribute("fill", cardType[index][0])
  ccBgColor2.setAttribute("fill", cardType[index][1])
  ccLogoImg.setAttribute("src", cardType[index][2])
}

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regExp: /^4[0-9]{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regExp: /(^5[1-5][0-9]{0,2}|^22[2-9][0-9]|^2[3-7][0-0]{0,2})[0-9]{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const cardNumber = (dynamicMasked.value + appended).replace(/\D/g, "")
    return dynamicMasked.compiledMasks.find(function (m) {
      return cardNumber.match(m.regExp)
    })
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addCardButton = document.querySelector("#add-card-button")
addCardButton.addEventListener("click", () => {
  alert("Add Card Button pressed")
})

const formCard = document.querySelector("form")
formCard.addEventListener("submit", (e) => {
  e.preventDefault()
})

function displayValue(qSelector, value, defaultValue) {
  const elementValue = document.querySelector(qSelector)
  elementValue.innerText = value ? value : defaultValue
}

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  displayValue(".cc-holder .value", cardHolder.value, "FULANO DA SILVA")
})

securityCodeMasked.on("accept", () => {
  displayValue(".cc-security .value", securityCodeMasked._value, "123")
})

expirationDateMasked.on("accept", () => {
  displayValue(".cc-expiration .value", expirationDateMasked._value, "02/32")
})

cardNumberMasked.on("accept", () => {
  displayValue(".cc-number", cardNumberMasked._value, "1234 5678 9012 3456")
  setCardType(cardNumberMasked.masked.currentMask.cardType)
})
