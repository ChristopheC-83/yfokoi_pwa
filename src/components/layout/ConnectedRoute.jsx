import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import Loader from "../Loader";

export default function ConnectedRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  if (!isHydrated) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
