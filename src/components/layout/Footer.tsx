import type { ReactElement } from "react";

// Footer-komponenten som visar en enkel copyright-text längst ner på sidan.
export default function Footer(): ReactElement {
    return (
        <footer className="text-center py-4 border-gray-300 border-t">
            <p>&copy; 2026 Isaac</p>
        </footer>
    );
}