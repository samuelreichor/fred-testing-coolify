<?php

namespace modules\queryapiextensions;

use Craft;
use craft\base\Event;
use craft\services\ProjectConfig;
use modules\queryapiextensions\services\LinkItTypeService;
use modules\queryapiextensions\transformers\LinkItTransformer;
use samuelreichoer\queryapi\events\RegisterFieldTransformersEvent;
use samuelreichoer\queryapi\events\RegisterTypeDefinitionEvent;
use samuelreichoer\queryapi\models\RegisterTypeDefinition;
use samuelreichoer\queryapi\QueryApi;
use samuelreichoer\queryapi\services\TypescriptService;
use samuelreichoer\queryapi\transformers\BaseTransformer;
use yii\base\Module as BaseModule;
use yii\log\FileTarget;

/**
 * QueryApiExtensions module
 *
 * @method static QueryApiExtensions getInstance()
 */
class QueryApiExtensions extends BaseModule
{
    public function init(): void
    {
        Craft::setAlias('@modules/queryapiextensions', __DIR__);
        parent::init();
        $this->initLogger();
        $this->attachEventHandlers();
    }

    protected function initLogger() : void
    {
        $logFileTarget = new FileTarget([
            'logFile' => '@storage/logs/queryApiExtension.log',
            'maxLogFiles' => 10,
            'categories' => ['queryApiExtension'],
            'logVars' => [],
        ]);
        Craft::getLogger()->dispatcher->targets[] = $logFileTarget;
    }

    private function attachEventHandlers(): void
    {
        Event::on(
            BaseTransformer::class,
            BaseTransformer::EVENT_REGISTER_FIELD_TRANSFORMERS,
            function (RegisterFieldTransformersEvent $event) {
                $event->transformers[] = [
                    'fieldClass' => 'presseddigital\linkit\fields\LinkitField',
                    'transformer' => LinkItTransformer::class,
                ];
            }
        );

        Event::on(
            TypescriptService::class,
            TypescriptService::EVENT_REGISTER_TYPE_DEFINITIONS,
            function (RegisterTypeDefinitionEvent $event) {
                $event->typeDefinitions[] = new RegisterTypeDefinition([
                    'fieldTypeClass' => 'presseddigital\linkit\fields\LinkitField',
                    'dynamicDefinitionClass' => LinkItTypeService::class,
                    'dynamicHardType' => LinkItTypeService::class,
                ]);
            }
        );
    }
}
