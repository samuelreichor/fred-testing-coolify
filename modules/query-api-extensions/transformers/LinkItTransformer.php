<?php

namespace modules\queryapiextensions\transformers;

use presseddigital\linkit\base\ElementLink;
use samuelreichoer\queryapi\helpers\Utils;

class LinkItTransformer
{
    private mixed $linkIt;

    public function __construct(mixed $linkIt)
    {
        $this->linkIt = $linkIt;
    }

    /**
     * Transforms the LinkIt field data.
     *
     * @return array
     */
    public function getTransformedData(): array
    {
        $url = $this->linkIt->getUrl();
        return [
            'metadata' => $this->getMetaData(),
            'label' => $this->linkIt->getText(),
            'url' => $url,
            'path' => Utils::getFullUriFromUrl($url),
            'target' => $this->linkIt->getTargetString(),
        ];
    }

    /**
     * Retrieves metadata from the Hyper field.
     *
     * @return array
     */
    protected function getMetaData(): array
    {
        return [
            'type' => $this->linkIt->getLabel(),
        ];
    }
}
