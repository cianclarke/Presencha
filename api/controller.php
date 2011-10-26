<?php
// A little config
$slideshowFolder = dirname(__FILE__) . '/slides';

/** a damn wrong and filthy implementation of a controller, just for hacking purposes */
header('Content-type: application/json');

switch ($_GET['mode']) {
    // show the details of a slide
    case 'slide':
        $slide = array(
            'url' => 'http://someurl.com/image.png'
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
                array('url' => 'http://someurl.com/image.png')
            )
        );
        echo json_encode($slideshow);
        break;
    // upload a new slideshow
    case 'upload':
        var_dump($_FILES);
        if (isset($_FILES['slideshow']) && !empty($_FILES['slideshow'])) {
            $response = array(
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
                        <form method="POST" enctype="application/x-www-form-urlencoded">
                            <input type="file" name="slideshow">
                            <input type="submit" name="Upload">
                        </form>
                    </body>
                </html>
            <?
        }
        break;
}