"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import UserButton from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.push(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
      console.log("redirecting to create workspace");
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      Signed
      <UserButton />
    </div>
  );
}
