<?php

/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: File.class.inc.php 7607 2011-06-15 09:17:42Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */

/**
 * The Ticket model
 * 
 * @property int $id
 * @property int $category_id
 * @property int $files_folder_id
 * @property string $content
 * @property string $name
 * @property int $mtime
 * @property int $muser_id
 * @property int $ctime
 * @property int $user_id
 */
class GO_Cticket_Model_Ticket extends GO_Base_Db_ActiveRecord {
	
	private $_decrypted=false;
	
	/**
	 * Returns a static model of itself
	 * 
	 * @param String $className
	 * @return GO_Cticket_Model_Ticket 
	 */
	public static function model($className=__CLASS__)
	{	
		return parent::model($className);
	}
	
	protected function init() {
		
		$this->columns['name']['required']=true;
		$this->columns['category_id']['required']=true;
		
		return parent::init();
	}
	
	public function getLocalizedName(){
		return GO::t('ticket','tickets');
	}
	
	public function aclField(){
		return 'category.acl_id';	
	}
	
	public function tableName(){
		return 'ct_tickets';
	}
	
	public function hasFiles(){
		return true;
	}
	public function hasLinks() {
		return true;
	}
	public function customfieldsModel(){
		return "GO_Cticket_Customfields_Model_Ticket";
	}

	public function relations(){
		return array(	
            'category' => array(
                'type'=>self::BELONGS_TO, 
                'model'=>'GO_Cticket_Model_Category', 
                'field'=>'category_id'),
            'status' => array(
                'type'=>self::BELONGS_TO, 
                'model'=>'GO_Cticket_Model_Status', 
                'field'=>'status_id'),
        );
	}

	public function defaultAttributes() {
		$attr = parent::defaultAttributes();
		
		$attr['category_id']=1;
		
		return $attr;
    }

	protected function getCacheAttributes() {
		return array(
				'name' => $this->name,
				'description'=>"{$this->category->name} // {$this->status->name}"
		);
	}
	
	/**
	 * The files module will use this function.
	 */
	public function buildFilesPath() {
		return 'cticket/' . GO_Base_Fs_Base::stripInvalidChars($this->category->name) . 
            '/' . date('Y', $this->ctime) . 
            '/' . GO_Base_Fs_Base::stripInvalidChars($this->name).' ('.$this->id.')';
	}
}
