import { Outlet } from "react-router-dom";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import LeftSidebar from "./components/LeftSidebar";
import ChatBar from "./components/ChatBar.tsx";

const LayoutPage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidth);
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] bg-neutral-950 flex flex-col pt-2">
      <ResizablePanelGroup direction="horizontal">
        {/* Side Bar */}
        <ResizablePanel
          defaultSize={20}
          minSize={width <= 618 ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-neutral-950 cursor-pointer" />

        {/* Main Content */}
        <ResizablePanel defaultSize={65}>
          <Outlet />
        </ResizablePanel>

        {/* Chat Bar */}
        <ResizableHandle className="w-2 bg-neutral-950 cursor-pointer" />

        <ResizablePanel defaultSize={20}>
          <ChatBar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LayoutPage;
