<?php
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
        if (isset($_POST) && !empty($_POST)) {
            $response = array(
                'key' => 'abcdefg01234567890',
                'secretKey' => 'LKJGHOIWNVLKJDFUIYKTNVLJKSFIYGSLJJLKJDF'
            );
            echo json_encode($response);
        } else {
            $slideshow = array();
            // loop through directories in ./slides
        //    $path = 'slides';
        //    $results = scandir($path);
        //
        //    foreach ($results as $result) {
        //        if ($result === '.' or $result === '..') continue;
        //
        //        if (is_dir($path . '/' . $result)) {
        //            //code to use if directory
        //        }
        //    }
            echo json_encode($slideshow);
        }
        break;
}