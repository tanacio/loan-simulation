'use strict'
const money = document.getElementById('money');
const bonus = document.getElementById('bonus');
const bonusRatio = document.getElementById('bonus-ratio');
const paybackPeriod = document.getElementById('payback-period');
const interestRate = document.getElementById('interest-rate')
const repaymentMonthly = document.getElementById('repayment-monthly');
const repaymentBonus = document.getElementById('repayment-bonus');
const repaymentAnnual = document.getElementById('repayment-annual');
const repaymentAmount = document.getElementById('repayment-amount');

// ボーナス割合
function calcBonusRatio() {
  const calcResult = (bonus.value / money.value) * 100;
  bonusRatio.value = Math.floor(calcResult);
}

// 毎月の返済額（年12回）
function calcRepaymentMonthly() {
  // 金利を計算値にする
  const interestRateValue = interestRate.value / 100;
  const repaymentMonthlyValue = Math.floor(((money.value - bonus.value) * interestRateValue / 12 * (1 + interestRateValue / 12) ** (paybackPeriod.value * 12)) / ((1 + interestRateValue / 12) ** (paybackPeriod.value * 12) - 1) * 10000);
  repaymentMonthly.getElementsByTagName('output')[0].innerText = repaymentMonthlyValue.toLocaleString();
  return repaymentMonthlyValue;
}

// ボーナス月の返済額（年2回）
function calcRepaymentBonus() {
  // 金利を計算値にする
  const interestRateValue = interestRate.value / 100;
  const repaymentBonusValue = Math.floor((bonus.value * interestRateValue / 2 * (1 + interestRateValue / 2) ** (paybackPeriod.value * 2)) / ((1 + interestRateValue / 2) ** (paybackPeriod.value * 2) - 1) * 10000);
  repaymentBonus.getElementsByTagName('output')[0].innerText = (repaymentBonusValue + calcRepaymentMonthly()).toLocaleString();
  return repaymentBonusValue;
}

// 年間返済額
function calcRepaymentYearly() {
  const repaymentAnnualValue = calcRepaymentMonthly() * 12 + calcRepaymentBonus() * 2;
  repaymentAnnual.getElementsByTagName('output')[0].innerText = repaymentAnnualValue.toLocaleString();
  return repaymentAnnualValue;
}

// 総返済額
function calcRepaymentAmount() {
  const repaymentAmountValue = calcRepaymentYearly() * paybackPeriod.value;
  repaymentAmount.getElementsByTagName('output')[0].innerText = repaymentAmountValue.toLocaleString();
}

// すべての計算をし直す
function sync() {
  calcRepaymentMonthly();
  calcRepaymentBonus();
  calcRepaymentYearly();
  calcRepaymentAmount();
  calcBonusRatio();
}

// 値を変更したらすぐ計算する
money.onkeyup = sync;
bonus.onkeyup = sync;
paybackPeriod.onkeyup = sync;
interestRate.onkeyup = sync;

// 初回アクセス時はデフォルト値で計算結果を表示する
calcBonusRatio();
calcRepaymentMonthly();
calcRepaymentBonus();
calcRepaymentYearly();
calcRepaymentAmount();