<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Website_model extends CI_Model {
    private $website = 'website';
    
    function get_website_list() {
        $query = $this->db->get($this->website);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }
    function get_website($id) {
        $query = $this->db->get_where($this->website, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }

    public function kode(){
        $this->db->select('RIGHT(website.id,3) as idweb', FALSE);
		  $this->db->order_by('idweb','DESC');    
		  $this->db->limit(1);    
		  $query = $this->db->get('website');  //cek dulu apakah ada sudah ada kode di tabel.    
		  if($query->num_rows() <> 0){      
			   //cek kode jika telah tersedia    
			   $data = $query->row();      
			   $kode = intval($data->idweb) + 1; 
		  }
		  else{      
			   $kode = 1;  //cek jika kode belum terdapat pada table
		  }
			//   $tgl=date('dmY'); 
			  $batas = str_pad($kode, 3, "0", STR_PAD_LEFT);    
			  $kodetampil = "WEB".$batas;  //format kode
			  return $kodetampil;  
		
    }
    
    function add_website($website_id,$website_title, $website_url) {
        $data = array('id' => $website_id,'title' => $website_title, 'url' => $website_url);
        $this->db->insert($this->website, $data);
    }
    function update_website($website_id, $website_title, $website_url) {
        $data = array('title' => $website_title, 'url' => $website_url);
        $this->db->where('id', $website_id);
        $this->db->update($this->website, $data);
    }
    
    function delete_website($website_id) {
        $this->db->where('id', $website_id);
        $this->db->delete($this->website);
    }
}