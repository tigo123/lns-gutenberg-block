<?php
if ( !defined( 'ABSPATH' ) )
    die( 'Invalid request.' );

if ( !defined( 'LNSGB_BASENAME' ) )
    define( 'LNSGB_BASENAME', plugin_basename( LNSGB_FILE ) );

if ( !defined( 'LNSGB_DIR_NAME' ) )
    define( 'LNSGB_DIR_NAME', basename( LNSGB_DIR ) );

if ( !defined( 'LNSGB_PREFIX' ) )
    define( 'LNSGB_PREFIX', 'lnsgb_' );

if ( !defined( 'LNSGB_DB_VERSION' ) )
    define( 'LNSGB_DB_VERSION', '1' );

class LeNamSite_Gutenberg_Block
{
    public function __construct()
    {
        $this->load_translation();
        $this->includes();
    }

    /**
     * Include required file for this plugin
     */
    private function includes()
    {
        include_once LNSGB_DIR . '/blocks/register.php';

    }

    /**
     * Actions when active this plugin
     */
    public static function activate()
    {
        include_once LNSGB_DIR . '/inc/activation/active.php';
    }

    /**
     * Actions when deactive this plugin
     */
    public static function deactivate()
    {

    }

    private function load_translation()
    {
        $locale = apply_filters( 'plugin_locale', determine_locale(), 'lnsgb' );
        $translation_path = LNSGB_DIR . '/languages/lnsgb-' . $locale . '.mo';
        if ( is_readable( $translation_path ) ) {
            unload_textdomain( 'lnsgb' );
            load_textdomain( 'lnsgb', $translation_path );
            load_plugin_textdomain( 'lnsgb', false, LNSGB_DIR . '/languages' );
        }
    }

}
if ( !function_exists( 'wp_get_wp_version' ) ) {
    function wp_get_wp_version()
    {
        static $wp_version;

        if ( !isset( $wp_version ) ) {
            require ABSPATH . WPINC . '/version.php';
        }

        return $wp_version;
    }
}
add_action( 'init', function () {
    new LeNamSite_Gutenberg_Block();
} );
register_activation_hook( LNSGB_FILE, [ 'LeNamSite_Gutenberg_Block', 'activate' ] );
register_deactivation_hook( LNSGB_FILE, [ 'LeNamSite_Gutenberg_Block', 'deactivate' ] );