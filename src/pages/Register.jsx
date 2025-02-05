import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <SignUp />
    </div>
  );
}
