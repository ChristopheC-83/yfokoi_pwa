import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import Loader from "../Loader";

export default function NoConnectedRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  if (!isHydrated) return <Loader />;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
