import { Outlet } from "react-router-dom";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";
import { useState, useEffect } from "react";

const LayoutPage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidth);
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] bg-neutral-950 flex flex-col">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={20}
          minSize={width <= 618 ? 0 : 10}
          maxSize={30}
          className="flex justify-center items-center"
        >
          <h1>Side-bar</h1>
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-neutral-900 cursor-pointer" />

        <ResizablePanel defaultSize={60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-neutral-900 cursor-pointer" />

        <ResizablePanel
          defaultSize={25}
          className="flex justify-center items-center"
        >
          <h1>chat-bar</h1>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LayoutPage;
