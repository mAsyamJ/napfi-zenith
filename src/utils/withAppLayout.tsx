import React from "react";

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // Simple layout wrapper — replace with your real layout import if available
  return <>{children}</>;
};

export const withAppLayout = (Component: React.ComponentType) => {
  return function WrappedComponent(props: any) {
    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  };
};