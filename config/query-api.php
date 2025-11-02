<?php

/**
 * Craft Query API config.php
 *
 * This file exists only as a template for the Craft Query API settings.
 * It does nothing on its own.
 *
 * Don't edit this file, instead copy it to 'craft/config' as 'craft-query-api.php'
 * and make your changes there to override default settings.
 *
 * Once copied to 'craft/config', this file will be multi environment aware as
 * well, so you can have different settings groups for each environment, just as
 * you do for 'general.php'
 */

return [
    '*' => [
        'cacheDuration' => 86400, // cache for one day
    ],
    'dev' => [
        'cacheDuration' => 0,
        'typeGenerationMode' => 'auto',
        'typeGenerationOutputPath' => '@root/frontend/shared/types/base.ts',
    ]
];
