import Link from "next/link";
import { useEffect } from "react";

const Game = () => {
    useEffect(() => {
        const gamediv = document.getElementById("gameBlock");
        const parallax1 = document.getElementById("rocket");
        window.addEventListener("scroll", function () {
            const { top: t, left: l } = gamediv.getBoundingClientRect();
            parallax1.style.marginBottom = t * -1.2 + 60 + "px";
            parallax1.style.marginLeft = t * -1.2 + 60 + "px";
        });
    }, []);

    return (
        <div>
            <div
                id="gameBlock"
                style={{
                    position: "relative",
                }}
            >
                <img src="mountain.png" id="mountain" alt="jj" />
                <img src="rocket.png" id="rocket" alt="jj" />
                <h1 className="sth1" style={{ zIndex: "99" }}>
                    <Link href="/space" >
                        <a style={{ textDecoration: 'none' }}>  ENTER THE <span className="Head"> SPACE </span>
                        </a>
                    </Link></h1>
            </div>
        </div>
    )
}

export default Game
