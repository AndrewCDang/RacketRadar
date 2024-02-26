import { useEffect, useContext } from "react";
import { RacketContext } from "../App";

function RacketData() {
    const [state, dispatch] = useContext(RacketContext);

    useEffect(() => {
        const fetchData = async (retries, delay) => {
            try {
                // change to /api/rackets on public, and  /rackets on local

                const response = await fetch("/api/rackets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                dispatch({ type: "racketList", payload: data });
            } catch (error) {
                console.error("Error:", error);
                if (retries > 0) {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    return fetchData(retries - 1, delay * 2);
                }
            }
        };

        fetchData(5, 1000);
    }, []);

    return null;
}

export default RacketData;
