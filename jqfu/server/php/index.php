<?php
/*
 * jQuery File Upload Plugin PHP Example 5.14
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
/*
error_reporting(E_ALL | E_STRICT);
require('UploadHandler.php');
$upload_handler = new UploadHandler();
*/
require('UploadHandler.php');


class CustomUploadHandler extends UploadHandler {

    protected function get_user_id() {
    	
    	$userid = (isset($_POST['UserId'])) ? $_POST['UserId'] : "guest";
			$entryid = (isset($_POST['EntryId'])) ? $_POST['EntryId'] : "tmp";
			$mode = (isset($_POST['Mode'])) ? $_POST['Mode'] : "tmp";

    	$urlfinal = $userid;
    	if ($mode == "logo"){
    		$urlfinal .= "/logo";
    	}elseif ($mode == "company"){
    		$urlfinal .= "/company";
    	}elseif ($mode == "gallery"){
    		$urlfinal .= "/gallery";
    	}else{
    		$urlfinal = "/tmp";
    	}
    	$urlfinal .= "/".$entryid;
      return $urlfinal;
    }
}

$upload_handler = new CustomUploadHandler(array(
	'upload_dir' => '/home/t/turamov/glavstroy/public_html/uploads/',
  'upload_url' => 'http://glavstroy365.ru/uploads/',
  'user_dirs' => true,
  'image_versions' => array(
                // Uncomment the following version to restrict the size of
                // uploaded images:
                '' => array(
                    'max_width' => 800,
                    'max_height' => 600,
                    'jpeg_quality' => 80
                ),
                // Uncomment the following to create medium sized images:
                'medium' => array(
                    'max_width' => 400,
                    'max_height' => 300,
                    'jpeg_quality' => 60
                ),
                'thumbnail' => array(
                    'max_width' => 150,
                    'max_height' => 150,
                )
            )
));

?>