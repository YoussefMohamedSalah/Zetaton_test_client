import { useNavigate } from "react-router-dom";

const useApp = () => {
  const navigate = useNavigate();
  return {
    push: (payload: string) => navigate(payload),
  };
};

export default useApp;
