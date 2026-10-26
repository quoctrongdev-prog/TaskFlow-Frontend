"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/lib/api";

import VerifyEmailLoading from "./VerifyEmailLoading";
import VerifyEmailSuccess from "./VerifyEmailSuccess";
import VerifyEmailError from "./VerifyEmailError";

type VerifyStatus = "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  //Lấy token từ query string và truyền token vào API verifyEmail.
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<VerifyStatus>("verifying");

  const [message, setMessage] = useState("");

  const token = searchParams.get("token");
  const rawRedirect = searchParams.get("redirect");

  const redirectUrl =
    rawRedirect &&
    rawRedirect.startsWith("/") &&
    !rawRedirect.startsWith("//") &&
    !rawRedirect.includes("\\")
      ? rawRedirect
      : null;

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    handleVerify(token);
  }, [token]);

  async function handleVerify(token: string) {
    try {
      //API verifyEmail.
      const response = await verifyEmail(token);

      setStatus("success");

      setMessage(
        response.message || "Your email has been verified successfully.",
      );
    } catch (error: any) {
      setStatus("error");

      setMessage(
        error.response?.data?.message ||
          "This verification link is invalid or has expired.",
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      {status === "verifying" && <VerifyEmailLoading />}

      {status === "success" && <VerifyEmailSuccess message={message}  redirectUrl={redirectUrl}/>}

      {status === "error" && <VerifyEmailError message={message} />}
    </main>
  );
}
