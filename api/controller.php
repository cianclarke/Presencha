<?php
// A little config
$slideshowFolder = dirname(__FILE__) . '/slides';

/** a damn wrong and filthy implementation of a controller, just for hacking purposes */
header('Content-type: application/json');
//PETER Added to work around problem testing in Safari.. need to figure out if this is necessary in general or just for development
// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');
// Specify which request methods are allowed
header('Access-Control-Allow-Methods: GET, POST'); //, PUT, DELETE, OPTIONS
// Additional headers which may be sent along with the CORS request
// The X-Requested-With header allows jQuery requests to go through
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Content-Length');

switch ($_GET['mode']) {
    
    // show the details of a slide
    case 'slide':
        $slide = array(
            'url' => 'http://lorempixel.com/480/320'
        );
        echo json_encode($slide);
        break;

    // show the details of a slideshow
    case 'detail':
        // dummy data
        $slideshow = array(
            'key' => 'abcdefg01234567890',
            'title' => 'The Title',
            'slideCount' => 123,
            'slides' => array(
                array('url' => 'http://lorempixel.com/480/320'),
				array('url' => 'http://lorempixel.com/480/320'),
				array('url' => 'http://lorempixel.com/480/320')
            )
        );
        echo json_encode($slideshow);
        break;

    // upload a new slideshow
    case 'upload':
        if (isset($_FILES['slideshow']) && !empty($_FILES['slideshow'])) {
            $response = array(
				'success' => true,
                'key' => 'abcdefg01234567890',
                'secretKey' => 'LKJGHOIWNVLKJDFUIYKTNVLJKSFIYGSLJJLKJDF'
            );
            echo json_encode($response);
        } else {
            header('Content-type: text/html');
            ?><!doctype html>
                <html>
                    <head>
                        <title>Upload a slideshow</title>
                    </head>
                    <body>
                        <form method="POST" action="" enctype="multipart/form-data">
                            <input type="file" name="slideshow">
                            <input type="submit" name="Upload">
                        </form>
                    </body>
                </html>
            <?php
        }
        break;
}
