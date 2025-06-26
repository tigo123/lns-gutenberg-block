/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";

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
    const { title_tag, title } = attributes;

    if (!title_tag && title) return null;

    var titleHtml = "";
    if (title)
        titleHtml = (
            <RichText.Content
                tagName={title_tag}
                className="lns_title"
                value={title}
            />
        );

    return (
        <div {...useBlockProps.save({ className: "lns_conclusion" })}>
            <div className="lns_wrapper">
                {titleHtml}
                <div className="lns_content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}
