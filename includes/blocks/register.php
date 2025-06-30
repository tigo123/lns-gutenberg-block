<?php
namespace LNSGB\Blocks;

if ( !defined( 'ABSPATH' ) )
    die( 'Invalid request.' );

final class Register
{
    private $blocks = [];
    // constructor
    public function __construct()
    {
        $this->blocks = [ 
            'lns-blockquote',
            'lns-conclusion',
            'lns-horizontal-product-card'
        ];
        $this->register_blocks();
        add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
    }

    public function enqueue_block_editor_assets()
    {
        wp_register_script(
            'lns-gutenberg-block',
            LNSGB_URL . '/public/js/frontend.js',
            array(),
            LNSGB_PLUGIN_VER
        );
        wp_localize_script(
            'lns-gutenberg-block',
            'lnsgb_vars',
            array(
                'default_thumbnail' => LNSGB_URL . '/public/images/default-thumbnail-lenamsite.jpg',
                'inactive_star' => LNSGB_URL . '/public/images/inactive.svg',
                'active_star' => LNSGB_URL . '/public/images/selected.svg',
            )
        );
        wp_enqueue_script( 'lns-gutenberg-block' );
    }

    private function register_blocks()
    {
        foreach ( $this->blocks as $key => $block )
            register_block_type( __DIR__ . "/$block/build" );
    }

}
new Register();