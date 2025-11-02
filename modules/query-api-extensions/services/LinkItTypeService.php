<?php
namespace modules\queryapiextensions\services;

use samuelreichoer\queryapi\helpers\Utils;
use samuelreichoer\queryapi\services\TypescriptService;
use presseddigital\linkit\fields\LinkitField;

class LinkItTypeService extends TypescriptService
{
    public function setTypeByField(LinkitField $field): string
    {
        $type = 'CraftLinkIt';

        $isRequiredField = Utils::isRequiredField($field);
        if (!$isRequiredField) {
            $type .= ' | null';
        }
        return $type;
    }

    public function setCustomHardTypes(): string
    {
        return <<<TS
            export type CraftLinkItTypes = 'Entry' | 'Asset' | 'Email Address' | 'Phone' | 'Url'

            export type CraftLinkIt = {
                metadata : {
                    type: CraftLinkItTypes
                }
                label: string
                url: string
                path: string
                target: CraftLinkTarget
            }
            TS;
    }
}
