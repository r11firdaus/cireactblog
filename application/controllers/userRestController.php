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
class userRestController extends REST_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('user_model', 'um');
    }

	function users_get() {
        $user = $this->um->get_user_list();
        if ($user) {
            $this->response($user, 200);
        } else {
            $this->response(array(), 200);
        }
    }
    function user_get() {
        if (!$this->get('user_id')) { //query parameter, example, user?id=1
            // $this->response(NULL, 400);
            $this->response(NULL, 400);
        }
        $user = $this->um->get_user($this->get('user_id'));
        if ($user) {
            $this->response($user, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
	
	function add_user_post() {
        $user_id = $this->um->kode();
        $user_name = $this->post('user_name');
        $user_email = $this->post('user_email');
        $user_password = $this->post('user_password');
        $user_phone = $this->post('user_phone');
        
        $result = $this->um->add_user($user_id, $user_name, $user_email, $user_password, $user_phone);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
    function update_user_put() {
        $user_id = $this->put('user_id');
        $user_name = $this->put('user_name');
        $user_email = $this->put('user_email');
        $user_password = $this->put('user_password');
        $user_phone = $this->put('user_phone');

        $result = $this->um->update_user($user_id, $user_name, $user_email, $user_password, $user_phone);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
	
	function delete_user_delete($user_id) { //path parameter, example, /delete/1
        $result = $this->um->delete_user($user_id);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
}