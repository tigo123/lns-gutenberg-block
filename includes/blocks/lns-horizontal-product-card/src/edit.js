/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * Imports the InspectorControls component, which is used to wrap
 * the block's custom controls that will appear in in the Settings
 * Sidebar when the block is selected.
 *
 * Also imports the React hook that is used to mark the block wrapper
 * element. It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import { Image, Link } from "@10up/block-components";

/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import {
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
} from "@wordpress/components";
import { __experimentalNumberControl as NumberControl } from "@wordpress/components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
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
    const blockProps = useBlockProps({
        className: "lns_horizontal_product_card",
    });
    const setImageData = (newImage) => {
        let url = newImage.url;
        if (
            newImage.sizes.medium &&
            newImage.sizes.medium.url &&
            newImage.sizes.medium.url != ""
        )
            url = newImage.sizes.medium.url;
        setAttributes({
            imageID: newImage.id,
            imageUrl: url,
            imageAlt: newImage.alt,
        });
    };
    const setIconData = (newIcon) => {
        let url = newIcon.url;
        if (
            newIcon.sizes.medium &&
            newIcon.sizes.medium.url &&
            newIcon.sizes.medium.url != ""
        )
            url = newIcon.sizes.medium.url;
        setAttributes({
            iconID: newIcon.id,
            iconUrl: url,
        });
    };
    const handleTextChange = () => setAttributes({ linkText: linkUrl });
    const handleLinkChange = (value) =>
        setAttributes({
            linkUrl: value?.url,
            opensInNewTab: value?.opensInNewTab,
            linkText: value?.url ?? linkText,
        });
    const handleLinkRemove = () =>
        setAttributes({
            linkUrl: null,
            opensInNewTab: null,
            linkText: "Select your product link",
        });

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

    return (
        <>
            <InspectorControls>
                <Panel>
                    <PanelBody
                        title={__("Product Data", "lns-custom-product-cart")}
                    >
                        <TextControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            label="Product Title"
                            value={title}
                            onChange={(value) =>
                                setAttributes({ title: value })
                            }
                            placeholder="Enter your product title..."
                        />
                        <PanelRow>
                            <Link
                                value={linkText}
                                url={linkUrl}
                                opensInNewTab={opensInNewTab}
                                onTextChange={handleTextChange}
                                onLinkChange={handleLinkChange}
                                onLinkRemove={handleLinkRemove}
                                placeholder="Enter your product url..."
                                ariaLabel="Read more about our services"
                                labels={{
                                    title: "Product Link",
                                }}
                            />
                        </PanelRow>
                        <NumberControl
                            __next40pxDefaultSize
                            label="Rating"
                            value={rating}
                            min={0}
                            max={5}
                            step={0.1}
                            onChange={(value) =>
                                setAttributes({ rating: value })
                            }
                        />
                        <TextControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            label="Price"
                            value={price}
                            onChange={(value) =>
                                setAttributes({ price: value })
                            }
                            placeholder="Enter your product price..."
                        />
                        <TextControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            label="Sale Price"
                            value={salePrice}
                            onChange={(value) =>
                                setAttributes({ salePrice: value })
                            }
                            placeholder="Enter your product sale price..."
                        />
                        <TextControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            label="Button Text"
                            value={buttonText}
                            onChange={(value) =>
                                setAttributes({ buttonText: value })
                            }
                            placeholder="Enter your product button text..."
                        />
                        <TextareaControl
                            label="Product Description"
                            help="Enter some text"
                            value={description}
                            onChange={(value) =>
                                setAttributes({ description: value })
                            }
                        />
                        <Image
                            id={imageID}
                            size="medium"
                            onSelect={setImageData}
                            allowedTypes={["image"]}
                            labels={{
                                title: "Select Product Image",
                            }}
                        />
                        <Image
                            id={iconID}
                            size="thumbnail"
                            onSelect={setIconData}
                            allowedTypes={["image"]}
                            labels={{
                                title: "Select Icon",
                            }}
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <div {...blockProps}>
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
            </div>
        </>
    );
}
