<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class user_model extends CI_Model {
    private $user = 'user';
    
    function get_user_list() {
        $query = $this->db->get($this->user);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }
    function get_user($id) {
        $query = $this->db->get_where($this->user, array("user_id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }

    public function kode(){
        $this->db->select('RIGHT(user.user_id,3) as iduser', FALSE);
		  $this->db->order_by('iduser','DESC');    
		  $this->db->limit(1);    
		  $query = $this->db->get('user');  //cek dulu apakah ada sudah ada kode di tabel.    
		  if($query->num_rows() <> 0){      
			   //cek kode jika telah tersedia    
			   $data = $query->row();      
			   $kode = intval($data->iduser) + 1; 
		  }
		  else{      
			   $kode = 1;  //cek jika kode belum terdapat pada table
		  }
			//   $tgl=date('dmY'); 
			  $batas = str_pad($kode, 3, "0", STR_PAD_LEFT);    
			  $kodetampil = "USER".$batas;  //format kode
			  return $kodetampil;  
		
    }
    
    function add_user($user_id,$user_name, $user_email, $user_password, $user_phone) {
        $data = array(
                    'user_id' => $user_id,
                    'user_name' => $user_name,
                    'user_email' => $user_email,
                    'user_password' => $user_password,
                    'user_phone' => $user_phone);
        $this->db->insert($this->user, $data);
    }
    function update_user($user_id,$user_name, $user_email, $user_password, $user_phone) {
        $data = array(
                    'user_name' => $user_name,
                    'user_email' => $user_email,
                    'user_password' => $user_password,
                    'user_phone' => $user_phone);
        $this->db->where('user_id', $user_id);
        $this->db->update($this->user, $data);
    }
    
    function delete_user($user_id) {
        $this->db->where('user_id', $user_id);
        $this->db->delete($this->user);
    }
}