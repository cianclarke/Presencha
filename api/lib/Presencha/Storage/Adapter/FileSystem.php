<?php

namespace Presencha\Storage\Adapter;

use \Presencha\Storage\AdapterInterface;

class FileSystem implements AdapterInterface
{
    public function store($data)
    {
        throw new Exception('Not Implemented');
    }
        
}