/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
    const {
        title,
        linkText,
        opensInNewTab,
        linkUrl,
        rating,
        description,
        price,
        salePrice,
        buttonText,
        imageID,
        imageUrl,
        imageAlt,
        iconID,
        iconUrl,
    } = attributes;

    let myHref = "#";
    if (linkUrl) myHref = linkUrl;

    let myTarget = "_self";
    if (opensInNewTab) myTarget = "_blank";

    const ImageHTML = () => {
        if (!imageUrl) return "";
        return (
            <img
                src={imageUrl}
                alt={imageAlt}
                className="lns_thumbnail"
                width={300}
                height={300}
            />
        );
    };

    const IconHTML = () => {
        if (!iconUrl) return "";
        return (
            <img
                src={iconUrl}
                alt="icon"
                className="lns_icon"
                width={50}
                height={50}
            />
        );
    };

    const PriceHTML = () => {
        if (!price) return "";
        let salePriceHTML = <span className="lns_sale_price">{price}</span>;
        let regularPriceHTML = "";
        if (salePrice) {
            salePriceHTML = <span className="lns_sale_price">{salePrice}</span>;
            regularPriceHTML = (
                <span className="lns_regular_price">{price}</span>
            );
        }
        return (
            <div className="lns_price">
                {regularPriceHTML}
                {salePriceHTML}
            </div>
        );
    };

    const RatingActiveWidth = () => {
        if (!rating) return "0%";
        const activeStars = Math.floor(rating / 1);
        const remainder = rating % 1;
        const starWidth = 20 / 120;
        const spaceWidth = 4 / 120;
        const activeWidth =
            activeStars * (starWidth + spaceWidth) + remainder * starWidth;
        return activeWidth * 100 + "%";
    };

    const InactiveStarHTML = () => {
        if (!rating) return "";
        return (
            <div className="lns_inactive_star">
                <img src={lnsgb_vars.inactive_star} alt="inactive star" />
                <img src={lnsgb_vars.inactive_star} alt="inactive star" />
                <img src={lnsgb_vars.inactive_star} alt="inactive star" />
                <img src={lnsgb_vars.inactive_star} alt="inactive star" />
                <img src={lnsgb_vars.inactive_star} alt="inactive star" />
            </div>
        );
    };

    const ActiveStarHTML = () => {
        if (!rating) return "";
        return (
            <div
                className="lns_active_star"
                style={{ width: RatingActiveWidth() }}
            >
                <img src={lnsgb_vars.active_star} alt="active star" />
                <img src={lnsgb_vars.active_star} alt="active star" />
                <img src={lnsgb_vars.active_star} alt="active star" />
                <img src={lnsgb_vars.active_star} alt="active star" />
                <img src={lnsgb_vars.active_star} alt="active star" />
            </div>
        );
    };

    const RatingTextHTML = () => {
        if (!rating) return "";
        return <span className="lns_rating_text"> • {rating}/5</span>;
    };

    return (
        <a
            {...useBlockProps.save({
                className: "lns_horizontal_product_card",
            })}
            href={myHref}
            target={myTarget}
            rel="nofollow"
        >
            <div className="lns_wrapper">
                <ImageHTML />
                <div className="lns_content">
                    <div className="lns_row lns_row_1">
                        <p className="lns_title">{title}</p>
                        <IconHTML />
                    </div>
                    <div className="lns_row lns_row_2">
                        <div className="lns_rating">
                            <InactiveStarHTML />
                            <ActiveStarHTML />
                        </div>
                        <RatingTextHTML />
                    </div>
                    <div className="lns_description">{description}</div>
                    <div className="lns_row lns_row_3">
                        <PriceHTML />
                        <p className="lns_button">{buttonText}</p>
                    </div>
                </div>
            </div>
        </a>
    );
}
