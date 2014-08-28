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
 * 
 * The Status model
 * 
 * @property String $name The name of the category
 * @property int $user_id
 */
class GO_Cticket_Model_Status extends GO_Base_Db_ActiveRecord {

	/**
	 * Returns a static model of itself
	 * 
	 * @param String $className
	 * @return GO_Cticket_Model_Status 
	 */
	public static function model($className=__CLASS__)
	{	
		return parent::model($className);
	}
	
	public function tableName() {
		return 'ct_statuses';
	}
	
	public function relations() {
		return array(
            'tickets' => array(
                'type' => self::HAS_MANY, 
                'model' => 'GO_Cticket_Model_Ticket', 
                'field' => 'status_id', 
                'delete' => true),
            'category' => array(
                'type'=>self::BELONGS_TO, 
                'model'=>'GO_Cticket_Model_Category', 
                'field'=>'category_id'),
        );
	}

	protected function init() {
		return parent::init();
	}
}
