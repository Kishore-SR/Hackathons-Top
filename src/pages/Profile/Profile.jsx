import { UserButton, useUser } from "@clerk/clerk-react";
import "./Profile.css"

export default function Profile() {
  const { user } = useUser();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user?.fullName}!</h1>
      <UserButton />
    </div>
  );
}
