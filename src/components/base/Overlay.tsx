import type { ReactElement } from "react";

export default function Overlay({ component }: { component: ReactElement }) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/75 flex justify-center z-50">
            {component}
        </div>
    );
}