"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

import {
  getUserProfile,
  updateUser,
  changePassword,
  uploadAvatar,
} from "@/lib/api";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMessages from "@/components/profile/ProfileMessages";
import AvatarCard from "@/components/profile/AvatarCard";
import InfoCard from "@/components/profile/InfoCard";
import ChangePasswordCard from "@/components/profile/ChangePasswordCard";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, updateAuthUser, loading: authLoading } = useAuth();
  const [name, setName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingName, setSavingName] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function clearMessages() {
    setSuccessMessage("");
    setErrorMessage("");
  }

  // Load profile khi mở trang
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      setName(user.name ?? "John Doe");
      setLoading(false);
      return;
    }

    setErrorMessage("Không thể tải thông tin tài khoản.");
    setLoading(false);
  }, [authLoading, user]);

  // Cập nhật tên
  async function handleUpdateName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage("Tên không được để trống.");
      return;
    }

    try {
      setSavingName(true);

      const response = await updateUser({
        name: trimmedName,
      });

      updateAuthUser(response.user);

      setName(trimmedName);
      setSuccessMessage("Cập nhật tên thành công.");
    } catch {
      setErrorMessage("Cập nhật tên thất bại. Vui lòng thử lại.");
    } finally {
      setSavingName(false);
    }
  }

  // Upload avatar
  async function handleUploadAvatar(file: File) {
    clearMessages();

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Vui lòng chọn một file hình ảnh.");
      return;
    }

    //5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Ảnh không được vượt quá 5 MB.");
      return;
    }

    try {
      setUploadingAvatar(true);

      const response = await uploadAvatar(file);

      updateAuthUser({
        avatar_url: response.url,
      });

      setSuccessMessage("Cập nhật ảnh đại diện thành công.");
    } catch {
      setErrorMessage("Upload ảnh thất bại. Vui lòng thử lại.");
    } finally {
      setUploadingAvatar(false);
    }
  }

  // Đổi mật khẩu
  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin mật khẩu.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage("Mật khẩu mới phải khác mật khẩu hiện tại.");
      return;
    }

    // try {
    //   setChangingPassword(true);

    //   const response = await changePassword({
    //     password: currentPassword,
    //     newPassword,
    //   });

    //   setCurrentPassword("");
    //   setNewPassword("");
    //   setConfirmPassword("");

    //   setSuccessMessage(response.message);
    // } catch {
    //   setErrorMessage("Đổi mật khẩu thất bại. Hãy kiểm tra mật khẩu hiện tại.");
    // } finally {
    //   setChangingPassword(false);
    // }

    try {
      setChangingPassword(true);

      // console.log("1. Bắt đầu gọi API");

      const response = await changePassword({
        password: currentPassword,
        newPassword,
      });

      // console.log("2. API response:", response);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // console.log("3. Chuẩn bị set success message:", response.message);

      // console.log("API response:", response);
      // console.log("Message:", response.message);

      setSuccessMessage(response.message);
      setErrorMessage("");
    } catch (error) {
      // console.error("4. Change password error:", error);

      setErrorMessage("Đổi mật khẩu thất bại. Hãy kiểm tra mật khẩu hiện tại.");
      setSuccessMessage("");
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3">
        <LoaderCircle className="h-6 w-6 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500">
          Đang tải thông tin tài khoản...
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <ProfileHeader />

      <ProfileMessages
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <AvatarCard
        avatarUrl={user?.avatar_url}
        uploading={uploadingAvatar}
        onUpload={handleUploadAvatar}
      />

      <InfoCard
        name={name}
        email={user?.email ?? ""}
        saving={savingName}
        onNameChange={setName}
        onSubmit={handleUpdateName}
      />

      <ChangePasswordCard
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        changing={changingPassword}
        onCurrentPasswordChange={setCurrentPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSubmit={handleChangePassword}
      />
    </main>
  );
}
