<?php
/**
 * The root path for this project
 */
define('ROOT_PATH', realpath(__DIR__ . '/..'));

/**
 * The path where all configuration files reside
 */
define('CONFIG_PATH', ROOT_PATH . '/config/');

/**
 * The path where all PHP libraries reside, both vendor and project libs
 */
define('LIB_PATH', ROOT_PATH . '/lib/');

/*
 * Autoloading 
 */
set_include_path(LIB_PATH . PATH_SEPARATOR . LIB_PATH  . 'vendor/'. PATH_SEPARATOR . get_include_path());
require_once LIB_PATH . 'vendor/Zend/Loader/Autoloader.php';
$autoloader = Zend_Loader_Autoloader::getInstance();
$autoloader->setFallbackAutoloader(true);

/*
 * Config 
 */
require_once CONFIG_PATH . 'debug-config.php';

$config = new Zend_Config(require CONFIG_PATH . 'generic-config.php');

defined('APPLICATION_ENV') || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));
echo getenv('APPLICATION_ENV');
echo APPLICATION_ENV; die();
// require_once CONFIG_PATH . 'generic-config.php';
// require_once LIB_PATH . 'vendor/amazon-sdk-1.4.4/sdk.class.php';
// require_once CONFIG_PATH . 'amazon-config.php';

$storageFactory = new \Presencha\Storage\Factory($config);
$storageAdapter = $storageFactory->createStorageAdapter($config);

try {
	$data = array();
	$storageAdapter->store($data);	
} catch(Exception $e) {
	echo $e->getMessage();
	exit();
}

