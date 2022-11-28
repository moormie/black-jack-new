export const Card = ({ cardCode }) => {
    const url = "images/";
    return <img src={`${url}${cardCode}.png`} alt="card" height={186}/>;
};
