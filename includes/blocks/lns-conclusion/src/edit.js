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
import {
    InspectorControls,
    useBlockProps,
    RichText,
    InnerBlocks,
} from "@wordpress/block-editor";

/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import { PanelBody, SelectControl } from "@wordpress/components";

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
    const { title_tag, title, allowedBlocks } = attributes;
    const blockProps = useBlockProps({ className: "lns_conclusion" });
    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Settings", "lns-conclusion")}>
                    <SelectControl
                        label="Title tag"
                        value={title_tag}
                        options={[
                            { label: "H2", value: "h2" },
                            { label: "H3", value: "h3" },
                            { label: "H4", value: "h4" },
                            { label: "H5", value: "h5" },
                            { label: "H6", value: "h6" },
                            { label: "P", value: "p" },
                            { label: "Div", value: "div" },
                        ]}
                        onChange={(newTitleTag) =>
                            setAttributes({ title_tag: newTitleTag })
                        }
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="lns_wrapper">
                    <RichText
                        tagName={title_tag}
                        className="lns_title"
                        value={title}
                        onChange={(title) => setAttributes({ title })}
                        placeholder={__("Enter your title...")}
                    />
                    <div className="lns_content">
                        <InnerBlocks allowedBlocks={allowedBlocks} />
                    </div>
                </div>
            </div>
        </>
    );
}
