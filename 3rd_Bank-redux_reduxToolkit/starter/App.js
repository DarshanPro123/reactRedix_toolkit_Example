import CreateCustomer from "../src/CreateCustomer";
import Customer from "../src/Customer";
import AccountOperations from "../src/AccountOperations";
import BalanceDisplay from "../src/BalanceDisplay";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
