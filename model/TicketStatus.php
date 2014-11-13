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
 * @property int $files_folder_id
 * @property string $content
 * @property string $name
 * @property int $mtime
 * @property int $muser_id
 * @property int $ctime
 * @property int $user_id
 */
class GO_Cticket_Model_TicketStatus extends GO_Base_Db_ActiveRecord {
	
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
		
		$this->columns['status_id']['required']=true;
		$this->columns['ticket_id']['required']=true;
		
		return parent::init();
	}
	
	public function tableName(){
		return 'ct_ticket_statuses';
	}
	
	public function relations(){
		return array(	
            'ticket' => array(
                'type'=>self::BELONGS_TO, 
                'model'=>'GO_Cticket_Model_Ticket', 
                'field'=>'ticket_id'),
            'status' => array(
                'type'=>self::BELONGS_TO, 
                'model'=>'GO_Cticket_Model_Status', 
                'field'=>'status_id'),
            'user' => array(
                'type'=>self::BELONGS_TO, 
                'model'=>'GO_Base_Model_User', 
                'field'=>'user_id'),
        );
	}
}
