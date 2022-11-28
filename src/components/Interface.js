import {Outcome} from "./Outcome";

export const Interface = ({
    status,
    message,
    computerScore,
    playerScore,
    deal,
    hit,
    stand,
    restart,
}) => {
    return (
        <div>
            <Outcome text={message} />
            <div>
                <p className="score">Dealer Score : {computerScore} </p>
                <p className="score">Player Score : {playerScore} </p>
            </div>
            <button
                disabled={status !== "playing"}
                id="deal-button"
                onClick={deal}
            >
                Deal
            </button>
            <button
                disabled={status !== "running"}
                id="hit-button"
                onClick={hit}
            >
                Hit
            </button>
            <button
                disabled={status !== "running"}
                id="stand-button"
                onClick={stand}
            >
                Stand
            </button>
            <button
                disabled={status === "playing"}
                id="restart-button"
                onClick={restart}
            >
                Restart
            </button>
        </div>
    );
};
