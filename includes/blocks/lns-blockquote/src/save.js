/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

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

    if (!quote) return null;

    var name_html = "";
    if (name)
        name_html = (
            <RichText.Content tagName="p" className="lns_name" value={name} />
        );
    return (
        <div {...useBlockProps.save({ className: "lns_blockquote" })}>
            <RichText.Content
                tagName="blockquote"
                className="lns_quote"
                value={quote}
            />
            {name_html}
        </div>
    );
}
