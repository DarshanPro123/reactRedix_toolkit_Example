import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountSlice";
import { toast } from "react-toastify";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
  } = useSelector((state) => state.account);

  function handleDeposit(e) {
    e.preventDefault();
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency("USD");
    toast.success(`Deposit successful ${depositAmount}`);
  }

  function handleWithdrawal(e) {
    e.preventDefault();
    if (!withdrawalAmount) return;
    if (balance < withdrawalAmount) {
      toast.error("Insufficient funds");
      return;
    }
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
    toast.error(`Withdrawal successful ${withdrawalAmount}`);
  }

  function handleRequestLoan(e) {
    e.preventDefault();
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
    toast.success(`Loan request successful ${loanAmount}`);
  }

  function handlePayLoan() {
    dispatch(payLoan());
    toast(`Loan payment successful ${currentLoan}`);
  }

  return (
    <div>
      <h2>Your account operations :</h2>
      <div className="inputs">
        <form onSubmit={handleDeposit}>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            placeholder="Deposit amount"
            onChange={(e) => setDepositAmount(+e.target.value)}
          />

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </form>

        <form onSubmit={handleWithdrawal}>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            placeholder="Withdrawal amount"
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </form>

        <form onSubmit={handleRequestLoan} className="requestInput">
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Get loan</button>
        </form>

        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan}({currentLoanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;

{
  /* <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select> */
}
