<?php

namespace modules\queryapiextensions\controllers;

use craft\web\Controller;

class PingController extends Controller
{
    protected array|bool|int $allowAnonymous = true;

    public function actionIndex()
    {
        return $this->asJson(['ping' => 'Pong!']);
    }
}
