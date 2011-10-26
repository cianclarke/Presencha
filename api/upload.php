<?php
//require_once('lib/tcpdf/tcpdf.php');

date_default_timezone_set('Europe/Amsterdam');

class manager
{

    public function getSlidesDir()
    {
        return dirname(__FILE__).'/slides';
    }

    public function generateKey()
    {
        return md5(microtime().'presencha');
    }

    public function upload($fileName, $title)
    {
        $meta = array();
        $pageCount = $this->getPageCount($fileName);

        $meta['slideCount'] = $pageCount;
        $meta['tite'] = $title;

        $meta = $this->convertPdfToImages($fileName, $pageCount, $meta);
        $metaFile = $this->writeMetaFile($meta);


        return json_encode(array(
            'key'       => $meta['key'],
            'secretKey' => 'secret',
            'success' => true
        ));
    }

    public function writeMetaFile($meta)
    {
        $fileName = $this->getSlidesDir() .'/'.$meta['key'].'/meta.json';
        file_put_contents($fileName, json_encode($meta));
        return $fileName;
    }

    // Not 100% correct but it works most of the time
    public function getPageCount($fileName)
    {
        $pdftext = file_get_contents($fileName);
        return preg_match_all("/\/Page\W/", $pdftext, $dummy);
    }

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
            $meta['slides'][] = array('url' => $imageName);
        }

        return $meta;
    }

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

        return $imageName;
    }
}


// MAIN
        
if (isset($_POST) && !empty($_POST)) {
    $manager = new Manager();
    echo $manager->upload('temp/Presencha.pdf', $_POST['title']);
} else {
    header('Content-type: text/html');
    ?><!doctype html>
        <html>
            <head>
                <title>Upload a slideshow</title>
            </head>
            <body>
                <form method="post" enctype="application/x-www-form-urlencoded">
                    <input type="text" name="title">
                    <input type="file" name="slideshow">
                    <input type="submit" name="Upload">
                </form>
            </body>
        </html>
    <?php
}


