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
    const { quote, name } = attributes;

    // If there is no fallbackCurrentYear, which could happen if the block
    // is loaded from a template/pattern, return null. In this case, block
    // rendering will be handled by the render.php file.
    if (!quote) {
        return null;
    }
    var name_html = "";
    if (name) name_html = <p className="lns_name">{name}</p>;
    return (
        <div {...useBlockProps.save({ className: "lns_blockquote" })}>
            <blockquote className="lns_quote">{quote}</blockquote>
            {name_html}
        </div>
    );
}
