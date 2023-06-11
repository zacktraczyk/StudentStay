import AccountNav from "@/components/accountnav";
import React from "react";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <AccountNav /> */}
      {children}
    </>
  );
}

export default AccountLayout;
