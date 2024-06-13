import { useSelector } from "react-redux";
const useAuth = () => {
  const loginData = useSelector((state: any) => state.login);
  const { userid, token, user, email, isVerified, isAdmin } = loginData;
  return {
    userid,
    token,
    user,
    email,
    isVerified,
    isAdmin,
  };
};

export default useAuth;
