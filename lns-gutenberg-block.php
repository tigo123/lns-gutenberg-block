<?php
/**
 * LNS Gutenberg Block
 *
 * Plugin Name: LNS Gutenberg Block
 * Plugin URI:  https://lenamsite.com/
 * Description: Gutenberg Blocks used for your website. Developed by LeNamSite
 * Version:     1.0
 * Author:      LeNamSite
 * Author URI:  https://lenamsite.com/
 * Text Domain: lnsgb
 * Domain Path: /languages
 * Requires PHP: 7.4.2
 */

if ( !defined( 'ABSPATH' ) )
    die( 'Invalid request.' );

if ( !defined( 'LNSGB_FILE' ) )
    define( 'LNSGB_FILE', __FILE__ );

if ( !defined( 'LNSGB_DIR' ) )
    define( 'LNSGB_DIR', untrailingslashit( plugin_dir_path( LNSGB_FILE ) ) );

if ( !defined( 'LNSGB_URL' ) )
    define( 'LNSGB_URL', untrailingslashit( plugins_url( '/', LNSGB_FILE ) ) );

if ( !defined( 'LNSGB_WP_VER' ) )
    define( 'LNSGB_WP_VER', '6.0' );

if ( !defined( 'LNSGB_PLUGIN_VER' ) )
    define( 'LNSGB_PLUGIN_VER', '1.0' );

// Fix translation
if ( !function_exists( 'get_plugin_data' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
}
$plugin_data = get_plugin_data( __FILE__, true, false );

include_once LNSGB_DIR . '/inc/init.php';
?>