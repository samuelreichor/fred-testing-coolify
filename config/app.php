<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app/main.php and [web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 */
use craft\helpers\App;
use modules\hrpreview\HrPreview;
use modules\queryapiextensions\QueryApiExtensions;

return [
    'id' => App::env('CRAFT_APP_ID') ?: 'CraftCMS',
    'modules' => [
        'query-api-extensions' => QueryApiExtensions::class,
        'hr-preview' => HrPreview::class
    ],
    'bootstrap' => [
        'query-api-extensions',
        'hr-preview'
    ],
    'components' => [
        'queue' => [
            'ttr' => 3600,
        ],
    ],
];
