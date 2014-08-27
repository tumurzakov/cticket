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
 * The Ticket controller
 * 
 */
class GO_Cticket_Controller_Ticket extends GO_Base_Controller_AbstractModelController{
	
	protected $model = 'GO_Cticket_Model_Ticket';
	
	protected function beforeStoreStatement(array &$response, array &$params, 
        GO_Base_Data_AbstractStore &$store, GO_Base_Db_FindParams $storeParams) {
		
		$multiSelCat = new GO_Base_Component_MultiSelectGrid(
						'ct-multiselect-categories', 
						"GO_Cticket_Model_Category",$store, $params, true);		
		
		$multiSelCat->addSelectedToFindCriteria($storeParams, 'category_id');
		$multiSelCat->setButtonParams($response);
		$multiSelCat->setStoreTitle();

		$multiSelStat = new GO_Base_Component_MultiSelectGrid(
						'ct-multiselect-statuses', 
						"GO_Cticket_Model_Category",$store, $params, true);		
		
		$multiSelStat->addSelectedToFindCriteria($storeParams, 'status_id');
		$multiSelStat->setButtonParams($response);
		$multiSelStat->setStoreTitle();
		
		return parent::beforeStoreStatement($response, $params, $store, $storeParams);
	}

	protected function formatColumns(GO_Base_Data_ColumnModel $columnModel) {
		$columnModel->formatColumn('user_name','$model->user->name',array(),'user_id');
		return parent::formatColumns($columnModel);
	}

	protected function remoteComboFields(){
		return array(
            'category_id'=>'$model->category->name',
            'status_id'=>'$model->status->name'
        );
	}
	
	protected function afterSubmit(&$response, &$model, &$params, $modifiedAttributes) {		
		 if(GO::modules()->files){
			 $f = new GO_Files_Controller_Folder();
			 $f->processAttachments($response, $model, $params);
		 }		
		return parent::afterSubmit($response, $model, $params, $modifiedAttributes);
	}

	public function formatStoreRecord($record, $model, $store) {
		$record['category'] = $model->category->name;
		$record['status'] = $model->status->name;

		return parent::formatStoreRecord($record, $model, $store);
    }
}
