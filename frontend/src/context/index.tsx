import { createContext } from "react";

interface UserContextType {
  fetchUserDetails: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
