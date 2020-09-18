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
class PostRestController extends REST_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('post_model', 'pm');
    }

	function posts_get() {
        $post = $this->pm->get_post_list();
        if ($post) {
            $this->response($post, 200);
        } else {
            $this->response(array(), 200);
        }
    }
    function post_get() {
        if (!$this->get('post_id')) { //query parameter, example, post?id=1
            // $this->response(NULL, 400);
            $this->response(NULL, 400);
        }
        $post = $this->pm->get_post($this->get('post_id'));
        if ($post) {
            $this->response($post, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
    function userpost_get() {
        if (!$this->get('user_id')) { //query parameter, example, post?id=1
            // $this->response(NULL, 400);
            $this->response(NULL, 400);
        }
        $post = $this->pm->get_userpost($this->get('user_id'));
        if ($post) {
            $this->response($post, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
	
	function add_post_post() {
        $post_id = $this->pm->kode();
        $user_id = $this->post('user_id');
        $post_title = $this->post('post_title');
        $post_content = $this->post('post_content');
        
        $result = $this->pm->add_post($post_id, $user_id, $post_title, $post_content);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
    function update_post_put() {
        $post_id = $this->put('post_id');
        $user_id = $this->put('user_id');
        $post_title = $this->put('post_title');
        $post_content = $this->put('post_content');

        $result = $this->pm->update_post($post_id, $user_id, $post_title, $post_content);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
	
	function delete_post_delete($post_id) { //path parameter, example, /delete/1
        $result = $this->pm->delete_post($post_id);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
}