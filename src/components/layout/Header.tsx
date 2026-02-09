import type { ReactElement } from "react";
import Navigation from "../base/Navigation";


export default function Header(): ReactElement {
    return (
        <header className="py-4 shadow">
            <div className="container mx-auto px-2 flex justify-between items-center flex-wrap">
                <p className="font-semibold whitespace-nowrap">Moment 3</p>
                <Navigation />
            </div>
        </header>
    );
}