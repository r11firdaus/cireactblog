<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class login_model extends CI_Model {
    public function user($username, $password)
    {
        $this->db->select('*');
        $this->db->from('user');
        $this->db->where('user_id', $username);
        $this->db->where('user_password', $password);
        $this->db->limit(1);

        $query = $this->db->get();
        if ($query->num_rows() == 1) {
            return $query->result();
        } else {
            return false;
        }
    }    
}