import { Alert } from "@mui/material";
import { ReactNode, createContext, useState, useContext } from "react";

type AlertType = {
  type: "success" | "error" | "info";
  message: string;
};

type AlertContextType = {
  showAlert: ({ message, type }: AlertType) => void;
  alert: AlertType | null;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

type AlertProviderProps = {
  children: ReactNode;
};

function AlertContextProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertType | null>(null)

  const showAlert = ({ message, type = 'info' }: AlertType) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert, alert }}>
      {alert && (
        <Alert severity={alert.type} >
          {alert.message}
        </Alert>
      )}
      {children}
    </AlertContext.Provider >
  );
}

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};


export default AlertContextProvider;
