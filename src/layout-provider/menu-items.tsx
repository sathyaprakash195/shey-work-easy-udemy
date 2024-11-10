import { useAuth } from "@clerk/nextjs";
import { Button, Drawer, message } from "antd";
import { HelpCircle, LayoutDashboard, List, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface MenuItemsProps {
  showMenuItems: boolean;
  setShowMenuItems: (showMenuItems: boolean) => void;
}

function MenuItems({ showMenuItems, setShowMenuItems }: MenuItemsProps) {
  const iconSize = 14;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState<boolean>(false);

  const { signOut } = useAuth();

  const onSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      message.success("Signed out successfully");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      label: "Projects",
      icon: <LayoutDashboard size={14} />,
      path: "/account/projects",
    },
    {
      label: "Profile",
      icon: <User size={14} />,
      path: "/account/profile",
    },
    {
      label: "All Tasks",
      icon: <List size={14} />,
      path: "/account/tasks",
    },
    {
      label: "Help & Support",
      icon: <HelpCircle size={14} />,
      path: "/account/help",
    },
  ];

  return (
    <Drawer open={showMenuItems} onClose={() => setShowMenuItems(false)}>
      <div className="flex gap-10 flex-col mt-10">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`flex gap-5 items-center cursor-pointer ${
              pathname === item.path
                ? "border-gray-500 p-2 border bg-gray-200 rounded-sm"
                : "p-2"
            }`}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </div>
        ))}

        <Button
          icon={<LogOut size={iconSize} />}
          loading={loading}
          onClick={onSignOut}
        >
          Sign Out
        </Button>
      </div>
    </Drawer>
  );
}

export default MenuItems;
