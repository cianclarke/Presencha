<?php

namespace Presencha\Storage\Adapter;

use Presencha\Storage\AdapterInterface;

class S3 implements AdapterInterface
{
    public function store($data)
    {
        throw new Exception('Not Implemented');
    }
}