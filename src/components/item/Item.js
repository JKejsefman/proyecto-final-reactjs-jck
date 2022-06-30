import InfoButton from "../item/InfoButton";

const Item = (props) => {

    return (
        <div id="storeItem" className="dropShadow">
            <h2>{props.name}</h2>
            <img alt="" src={props.img} />
            <h3>Precio: ${props.price}</h3>
            <div>
                <InfoButton slug={props.slug} />
            </div>
        </div>
    )
}

export default Item