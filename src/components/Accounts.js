import React from "react";
import Account from "./Account";
import { accounts } from "../assets/data/account";

const Accounts = () => {
  return (
    <div>
      {accounts.map((account, index) => (
        <Account
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </div>
  );
};

export default Accounts;
