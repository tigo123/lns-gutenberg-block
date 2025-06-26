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
            'lns-conclusion'
        ];
        $this->register_blocks();
    }

    private function register_blocks()
    {
        foreach ( $this->blocks as $key => $block )
            register_block_type( __DIR__ . "/$block/build" );
    }

}
new Register();