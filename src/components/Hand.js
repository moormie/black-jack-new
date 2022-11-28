import React from "react";
import { Card } from "./Card";

export const Hand = ({ cards }) => {
    return (
        <div className="hand">
            {cards.map((card, index) => (
                <Card key={index} cardCode={card} />
            ))}
        </div>
    );
};
