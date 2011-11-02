<?php

namespace Presencha\Storage;

class Factory 
{
	public static function createStorageAdapter($config)
	{
		return new $config->storageAdapter();
	}
}
