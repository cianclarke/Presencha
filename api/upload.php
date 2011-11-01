<?php
//require_once('lib/tcpdf/tcpdf.php');

date_default_timezone_set('Europe/Amsterdam');

/**
 * Manager for uploaded files and conversion from PDF to images
 */
class manager
{
    /**
     * @var int Maximum file size (in MB's)
     */
    public $maxFilesize = 3;

    /**
     * Get the storage directory for the slides
     * @return string directory where slides are stored
     */
    public function getSlidesDir()
    {
        return dirname(__FILE__).'/slides';
    }

    /**
     * Generate a random slides key
     * @return string key
     */
    public function generateKey()
    {
        return md5(microtime().'presencha');
    }

    /**
     * Validate an uploaded file that it is available, has no errors
     * has the mime-type of a pdf and doesn't exceeed the maximum size
     * @param $field
     * @return bool|string
     */
    protected function validateUpload($field)
    {
        if (!isset($field['tmp_name'])) {
            return 'No upload file available';
        }
        
        if ($field['error'] > 0) {
            return 'Error while uploading';
        }
        
        if (!in_array($field['type'], array('application/pdf', 'application/octet-stream'))) {
            return 'Please upload a valid pdf file';
        }
        
        $maxSize = ($this->maxFilesize * 1024 * 1024);
        if ($field['size'] > $maxSize) {
            return 'Max upload size of 3 MB exceeded';
        }
        
        return true;
    }
    /**
     * Upload the pdf
     *
     * @param array $field 
     * @param string $title 
     * @return void
     */
    public function upload($field, $title)
    {
        
        if (($error = $this->validateUpload($field)) !== true) {
            $this->showError($error);
        }
        
        $meta = array();
        $pageCount = $this->getPageCount($fileName);

        $meta['slideCount'] = $pageCount;
        $meta['title'] = $title;

        $meta = $this->convertPdfToImages($fileName, $pageCount, $meta);
        $metaFile = $this->writeMetaFile($meta);


        return json_encode(array(
            'key'       => $meta['key'],
            'secretKey' => 'secret',
            'success' => true
        ));
    }

    /**
     * Write the file containing the presentation's metadata
     * @param $meta
     * @return string
     */
    public function writeMetaFile($meta)
    {
        $fileName = $this->getSlidesDir() .'/'.$meta['key'].'/meta.json';
        file_put_contents($fileName, json_encode($meta));
        return $fileName;
    }

    /**
     * Get the number of pages
     * @param $fileName
     * @return int
     */
    public function getPageCount($fileName)
    {
        $pdftext = file_get_contents($fileName);
        return preg_match_all("/\/Page\W/", $pdftext, $dummy);
    }

    /**
     * Convert the PDF to a single image per page
     * @param $fileName
     * @param $pages
     * @param $meta
     * @return array
     */
    public function convertPdfToImages($fileName, $pages, $meta)
    {
        $key = $this->generateKey();
        $slideshowPath = $this->getSlidesDir() .'/'. $key;

        if (! file_exists($slideshowPath))
        {
            mkdir($slideshowPath);
        }

        $meta['key'] = $key; 
        $meta['slides'] = array(); 

        for ($page=0; $page < $pages; $page++) {
            $imageName = $this->convertImage($fileName, $page, $slideshowPath);
            $meta['slides'][] = array('url' => '/slides/'.$meta['key'].'/'.$imageName);
        }

        return $meta;
    }

    /**
     * Convert the image to the correct format
     * @param $fileName
     * @param $page
     * @param $slideshowPath
     * @return string
     */
    protected function convertImage($fileName, $page, $slideshowPath)
    {
        $im = new Imagick;
        $im->setOption('density', '144');
        $im->setResolution(144, 144);
        $im->readImage($fileName . '['.$page.']');
        $im->scaleImage(638, 0); 
        $im->setImageFormat("png");

        $imageName = $slideshowPath. '/slide'. ($page + 1) . '.png';
        $im->writeImage($imageName);

        return 'slide'. ($page + 1) . '.png';
    }

    /**
     * Exit with an error
     * @param $message
     * @return void
     */
    protected function showError($message)
    {
        header("HTTP/1.0 404 Not Found");
        echo $message;
        exit();
    }
}

/**
 * Bootstrapping
 */
if (isset($_POST) && !empty($_POST)) {
    $manager = new Manager();
    echo $manager->upload($_FILES['slideshow'], $_POST['title']);
} else {
    header('Content-type: text/html');
    ?><!doctype html>
        <html>
            <head>
                <title>Upload a slideshow</title>
            </head>
            <body>
                <form method="post" enctype="multipart/form-data">
                    <input type="text" name="title">
                    <input type="file" name="slideshow">
                    <input type="submit" name="Upload">
                </form>
            </body>
        </html>
    <?php
}


