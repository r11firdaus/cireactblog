<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class post_model extends CI_Model {
    private $post = 'post';
    
    function get_post_list() {
        $query = $this->db->get($this->post);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }
    function get_post($id) {
        $query = $this->db->get_where($this->post, array("post_id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }
    function get_userpost($id) {
        $query = $this->db->get_where($this->post, array("user_id" => $id));
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function kode(){
        $this->db->select('RIGHT(post.post_id,3) as idpost', FALSE);
		  $this->db->order_by('idpost','DESC');    
		  $this->db->limit(1);    
		  $query = $this->db->get('post');  //cek dulu apakah ada sudah ada kode di tabel.    
		  if($query->num_rows() <> 0){      
			   //cek kode jika telah tersedia    
			   $data = $query->row();      
			   $kode = intval($data->idpost) + 1; 
		  }
		  else{      
			   $kode = 1;  //cek jika kode belum terdapat pada table
		  }
			//   $tgl=date('dmY'); 
			  $batas = str_pad($kode, 3, "0", STR_PAD_LEFT);    
			  $kodetampil = "POST".$batas;  //format kode
			  return $kodetampil;  
		
    }
    
    function add_post($post_id,$user_id, $post_title, $post_content) {
        $data = array(
                    'post_id' => $post_id,
                    'user_id' => $user_id,
                    'post_title' => $post_title,
                    'post_content' => $post_content);
        $this->db->insert($this->post, $data);
    }
    function update_post($post_id,$user_id, $post_title, $post_content) {
        $data = array(
            'post_id' => $post_id,
            'user_id' => $user_id,
            'post_title' => $post_title,
            'post_content' => $post_content);
        $this->db->where('post_id', $post_id);
        $this->db->update($this->post, $data);
    }
    
    function delete_post($post_id) {
        $this->db->where('post_id', $post_id);
        $this->db->delete($this->post);
    }
}