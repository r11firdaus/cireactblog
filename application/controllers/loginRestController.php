<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	exit;
}
//required for REST API
require(APPPATH . '/libraries/REST_Controller.php');
require APPPATH . 'libraries/Format.php';
use Restserver\Libraries\REST_Controller;
class loginRestController extends REST_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('login_model', 'lm');
    }

    function login_post() {
        $username = $this->post('user_id');
        $password = $this->post('user_password');

        $result = $this->lm->user($username,$password);
        if ($result) {
            $hasil['user'] = $result;
            $this->response($hasil, 200);
        } else {
            $this->response('gagal bos', 500);
        }
    }	
}