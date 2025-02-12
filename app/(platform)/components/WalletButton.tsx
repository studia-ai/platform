import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function WalletButton() {
  const { setShowAuthFlow: handleConnect, handleLogOut, primaryWallet, sdkHasLoaded: isConnected } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && primaryWallet) {
      toast.success("Wallet connected successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [isConnected, primaryWallet]);

  const handleWalletAction = async () => {
    try {
      setIsLoading(true);
      if (isLoggedIn) {
        await handleLogOut();
        toast.success("Wallet disconnected successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        await handleConnect(true);
      }
    } catch (error) {
      toast.error("Failed to manage wallet connection", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Loading...";
    if (isLoggedIn) {
      const shortAddress = primaryWallet?.address
        ? `${primaryWallet.address.slice(0, 6)}...${primaryWallet.address.slice(-4)}`
        : "Wallet Connected";
      return shortAddress;
    }
    return "Connect Wallet";
  };

  return (
    <Button
      onClick={handleWalletAction}
      variant="outline"
      className="flex items-center gap-2"
      disabled={isLoading}
    >
      <Wallet className="h-4 w-4" />
      {getButtonText()}
    </Button>
  );
} 