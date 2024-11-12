import PageTitle from "@/components/ui/page-title";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

async function UserAccountProojectsPage() {
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Projects" />
        <Button type="primary">
          <Link href="/account/projects/create">Create Project</Link>
        </Button>
      </div>
    </div>
  );
}

export default UserAccountProojectsPage;
