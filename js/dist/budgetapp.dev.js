"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);

    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  } // submit budget method


  _createClass(UI, [{
    key: "submitBudgetForm",
    value: function submitBudgetForm() {
      var value = this.budgetInput.value;

      if (value === "" || value < 0) {
        this.budgetFeedback.classList.add("showItem");
        this.budgetFeedback.innerHTML = "<p>value cannot be emtpy or negative</p>";
        var self = this;
        setTimeout(function () {
          self.budgetFeedback.classList.remove("showItem");
        }, 3000);
      } else {
        this.budgetAmount.textContent = value;
        this.budgetInput.value = "";
        this.showBalance();
      }
    } //check balance

  }, {
    key: "showBalance",
    value: function showBalance() {
      var expense = this.totalExpense();
      var total = parseInt(this.budgetAmount.textContent) - expense;
      this.balanceAmount.textContent = total;

      if (total < 0) {
        this.balance.classList.remove("showGreen", "showWhite");
        this.balance.classList.add("showRed");
      } else if (total > 0) {
        this.balance.classList.remove("showRed", "showWhite");
        this.balance.classList.add("showGreen");
      } else if (total === 0) {
        this.balance.classList.remove("showRed", "showGreen");
        this.balance.classList.add("showWhite");
      }
    } //submit expense

  }, {
    key: "submitExpenseForm",
    value: function submitExpenseForm() {
      var expenseValue = this.expenseInput.value;
      var amountValue = this.amountInput.value;

      if (expenseValue === "" || amountValue === "" || amountValue < 0) {
        this.expenseFeedback.classList.add("showItem");
        this.expenseFeedback.innerHTML = "<p>values cannot be empty or negative</p>";
        var self = this;
        setTimeout(function () {
          self.expenseFeedback.classList.remove("showItem");
        }, 3000);
      } else {
        var amount = parseInt(amountValue);
        this.expenseInput.value = "";
        this.amountInput.value = "";
        var expense = {
          id: this.itemID,
          title: expenseValue,
          amount: amount
        };
        this.itemID++;
        this.itemList.push(expense);
        this.addExpense(expense);
        this.showBalance();
      }
    } // add expense

  }, {
    key: "addExpense",
    value: function addExpense(expense) {
      var div = document.createElement("div");
      div.classList.add("expense");
      div.innerHTML = "<div class=\"expense-item d-flex justify-content-between align-items-baseline\">\n            <h6 class=\"expense-title mb-0 text-uppercase list-item\">- ".concat(expense.title, "</h6>\n            <h5 class=\"expense-amount mb-0 list-item\">").concat(expense.amount, "</h5>  \n        </div>");
      this.expenseList.appendChild(div);
    } //Total Expense

  }, {
    key: "totalExpense",
    value: function totalExpense() {
      var total = 0;

      if (this.itemList.length > 0) {
        total = this.itemList.reduce(function (acc, curr) {
          acc += curr.amount;
          return acc;
        }, 0);
      }

      this.expenseAmount.textContent = total;
      return total;
    }
  }]);

  return UI;
}();

function eventListeners() {
  var budgetForm = document.getElementById("budget-form");
  var expenseForm = document.getElementById("expense-form");
  var expenseList = document.getElementById("expense-list"); //new instance of UI class

  var ui = new UI(); //budget form submit;

  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
  }); //xpense form submit;

  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitExpenseForm();
  }); //expense click;

  expenseList.addEventListener("click", function () {});
}

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});