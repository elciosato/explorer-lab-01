import "./css/index.css"

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

globalThis.setCardType = setCardType
