<?php
namespace LNSGB\Blocks;

if ( !defined( 'ABSPATH' ) )
    die( 'Invalid request.' );

final class Register
{
    // constructor
    public function __construct()
    {
        register_block_type( __DIR__ . '/lns-blockquote/build' );
    }

}
new Register();