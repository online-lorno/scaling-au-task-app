"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import { login } from "../redux/slices/auth-slice";

export default function StoreProvider({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // Rehydrate isAuthenticated
    storeRef.current.dispatch(login({ isAuthenticated }));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
