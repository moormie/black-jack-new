import { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";

import { Hand } from "../components/Hand";
import { Interface } from "../components/Interface";

import {
    fullDeck,
    initialDeck,
    PLAYING,
    RUNNING,
    DEALER,
    OVER,
} from "../constants/constants";

export const Table = () => {
    const [deck, setDeck] = useState();
    const [computerHand, setComputerHand] = useState(initialDeck);
    const [playerHand, setPlayerHand] = useState(initialDeck);
    const [message, setMessage] = useState("Press 'Deal' to start the game");
    const [status, setStatus] = useState(PLAYING);

    useEffect(() => {
        setDeck(shuffle(fullDeck));
    }, []);

    const countScore = (hand) => {
        let count = 0;
        for (let i in hand) {
            let number = hand[i];
            if (number.length === 2) {
                count += parseInt(number[1]);
            } else {
                count += 10;
            }
        }
        return count;
    };

    const onClickDeal = () => {
        if (status === PLAYING) {
            const hitDeck = [...deck];
            const computerHand = ["00", hitDeck.shift()];
            const playerHand = [hitDeck.shift(), hitDeck.shift()];

            setDeck(hitDeck);
            setComputerHand(computerHand);
            setPlayerHand(playerHand);
            setMessage("Players's turn");
            setStatus(RUNNING);
        }
    };

    const onClickHit = () => {
        if (status === RUNNING) {
            const hitDeck = [...deck];
            const updatedComputerHand = [...computerHand];
            const updatedPlayerHand = [...playerHand];
            updatedPlayerHand.push(hitDeck.shift());
            const playersScore = countScore(updatedPlayerHand);
            if (playersScore === 21) {
                let dealersCount = countScore(updatedComputerHand);
                updatedComputerHand.shift();

                while (dealersCount < 17) {
                    updatedComputerHand.push(hitDeck.shift());
                    dealersCount = countScore(updatedComputerHand);
                }
                setStatus(DEALER);
            }
            setDeck(hitDeck);
            setComputerHand(updatedComputerHand);
            setPlayerHand(updatedPlayerHand);
        } else {
            setMessage("Game Over");
        }
    };

    const onClickStand = () => {
        if (status === RUNNING || status === DEALER) {
            const hitDeck = [...deck];
            const updatedComputerHand = [...computerHand];
            const updatedPlayerHand = [...playerHand];

            let dealersCount = countScore(updatedComputerHand);
            updatedComputerHand.shift();

            while (dealersCount < 17) {
                updatedComputerHand.push(hitDeck.shift());
                dealersCount = countScore(updatedComputerHand);
            }
            setDeck(hitDeck);
            setComputerHand(updatedComputerHand);
            setPlayerHand(updatedPlayerHand);
            setMessage("Dealer's turn");
            setStatus(DEALER);
        }
    };

    const restart = () => {
        const deck = [...fullDeck];
        setDeck(shuffle(deck));
        setComputerHand(initialDeck);
        setPlayerHand(initialDeck);
        setMessage("Press 'Deal' to start the game");
        setStatus(PLAYING);
    };

    useEffect(() => {
        const playersScore = countScore(playerHand);
        const dealersCount = countScore(computerHand);
        if (status === RUNNING) {
            if (playersScore === 21) {
                setMessage("Dealers turn");
                setStatus(DEALER);
            } else if (playersScore > 21) {
                setMessage("Player lost");
                setStatus(OVER);
            }
        } else if (status === DEALER) {
            if (
                dealersCount > 21 ||
                playersScore === 21 ||
                playersScore > dealersCount
            ) {
                setMessage("Players win");
            } else if (playersScore === dealersCount) {
                setMessage("EVEN");
                setStatus(OVER);
            } else if (playersScore < dealersCount) {
                setMessage("Dealers win");
            }
            setStatus(OVER);
        }
    }, [playerHand, computerHand, status]);

    return (
        <div>
            <h1 className="title">BLACK JACK</h1>
            <Hand cards={computerHand} />
            <Interface
                message={message}
                deal={onClickDeal}
                hit={onClickHit}
                stand={onClickStand}
                restart={restart}
                status={status}
                computerScore={countScore(computerHand)}
                playerScore={countScore(playerHand)}
            />
            <Hand cards={playerHand} />
        </div>
    );
};
