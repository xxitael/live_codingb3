import { useState } from "react";

export default function NotFound() {
    const [message] = useState("404 - Page Not Found");
    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}