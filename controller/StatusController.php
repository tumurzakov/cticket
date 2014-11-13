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
 * The Status controller
 * 
 */
class GO_Cticket_Controller_Status extends GO_Base_Controller_AbstractModelController{
	
	protected $model = 'GO_Cticket_Model_Status';
	
	protected function beforeStoreStatement(array &$response, array &$params, 
		GO_Base_Data_AbstractStore &$store, GO_Base_Db_FindParams $storeParams) {

		$multiSel = new GO_Base_Component_MultiSelectGrid(
						'no-multiselect-status', 
						"GO_Cticket_Model_Status",$store, $params);		
		$multiSel->setFindParamsForDefaultSelection($storeParams);
		$multiSel->formatCheckedColumn();
		
		return parent::beforeStoreStatement($response, $params, $store, $storeParams);
	}

	protected function beforeStore(&$response, &$params, &$store) {
		$store->setDefaultSortOrder('position','ASC');
		return parent::beforeStore($response, $params, $store);
	}
	
	public function formatStoreRecord($record, $model, $store) {
		if (@$_REQUEST['store'] == 'readableStatusesStore') {
			$count = GO_Cticket_Model_Ticket::model()->find(
				GO_Base_Db_FindParams::newInstance()
					->single()
					->select("COUNT(*) as count")
					->criteria(
						GO_Base_Db_FindCriteria::newInstance()
							->addCondition('status_id', $model->id)
					)
			);

			$record['count'] = $count->count;
		}

		$record['template'] = "";
		if ($record['template_id'] > 0) {
			$template = GO_Addressbook_Model_Template::model()->findByPk($record['template_id']);
			$record['template'] = $template->name;
		}

		return parent::formatStoreRecord($record, $model, $store);
	}
}
