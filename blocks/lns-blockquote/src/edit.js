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
import { useBlockProps, RichText } from "@wordpress/block-editor";

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
    const { quote, name } = attributes;
    const blockProps = useBlockProps({ className: "lns_blockquote" });
    return (
        <>
            <div {...blockProps}>
                <RichText
                    tagName="blockquote"
                    className="lns_quote"
                    value={attributes.quote}
                    allowedFormats={[
                        "core/bold",
                        "core/italic",
                        "core/link",
                        "core/underline",
                    ]}
                    onChange={(quote) => setAttributes({ quote })}
                    placeholder={__("Enter your quote...")} // Display this text before any content has been added by the user
                />
                <RichText
                    tagName="p"
                    className="lns_name"
                    value={attributes.name}
                    onChange={(name) => setAttributes({ name })}
                    placeholder={__("Enter your name...")}
                />
            </div>
        </>
    );
}
