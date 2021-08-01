import React from "react";

export default function Pay() {
    return (
        <>
        <form action="http://localhost:8000/payment" method="post">
                <input type="text" name="amount" />
                <input type="text" name="origin" value={document.location.origin} hidden />
            <input type="submit" />
        </form>
        </>
    )
}