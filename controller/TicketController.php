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

	protected function beforeSubmit(&$response, &$model, &$params) {
        if (!isset($params['send_email'])) {
            $params['send_email'] = 0;
        }

		return parent::beforeSubmit($response, $model, $params);
    }
	
	protected function afterSubmit(&$response, &$model, &$params, $modifiedAttributes) {		
		if(GO::modules()->files){
		    $f = new GO_Files_Controller_Folder();
		    $f->processAttachments($response, $model, $params);
		}		

        if (isset($modifiedAttributes['status_id']) && $params['send_email'] > 0) {
            $draftUid = "";
            $status = GO_Cticket_Model_Status::model()->findByPk($params['status_id']);
            if ($status->template_id > 0) {
                $template = GO_Addressbook_Model_Template::model()->findByPk($status->template_id);
                if ($template) {
                    $draftUid = $this->sendEmail($template, $model);
                }
            }

            $this->saveStatusChange($model, $draftUid);
        }

		return parent::afterSubmit($response, $model, $params, $modifiedAttributes);
	}

	public function formatStoreRecord($record, $model, $store) {
		$record['category'] = $model->category->name;
		$record['status'] = $model->status->name;

		return parent::formatStoreRecord($record, $model, $store);
    }

	protected function beforeDisplay(&$response, &$model, &$params) {
        $response['data']['category'] = $model->category->name;
        $response['data']['status'] = $model->status->name;
        $response['data']['statuses'] = array();
        $stmt = $model->statuses;
        while($status = $stmt->fetch()) {
            $response['data']['statuses'][] = array(
                'status'=>$status->status->name,
                'email_uid'=>$status->email_uid,
                'email_mailbox'=>$status->email_mailbox,
                'account_id'=>$status->email_account_id,
                'created'=>strftime("%F %T", $status->ctime),
                'sent'=>$status->email_sent
            );
        }
		return parent::beforeDisplay($response, $model, $params);
    }

    private function sendEmail($template, $model) {
        $user_id = $_SESSION['GO_SESSION']['user_id'];
		$account = GO_Email_Model_Account::model()->find(
            GO_Base_Db_FindParams::newInstance()
                ->single()
				->criteria(
                    GO_Base_Db_FindCriteria::newInstance()
                        ->addCondition('user_id', $user_id)
                )
        );

		$alias = GO_Email_Model_Alias::model()->find(
            GO_Base_Db_FindParams::newInstance()
                ->single()
				->criteria(
                    GO_Base_Db_FindCriteria::newInstance()
                        ->addCondition('account_id', $account->id)
                )
        );

		$mailer = GO_Base_Mail_Mailer::newGoInstance(GO_Email_Transport::newGoInstance($account));

		$message = GO_Base_Mail_Message::newInstance($template->name)
						->loadMimeMessage($template->content);

        $message->setFrom($alias->email, $alias->name);

        $recipients = array();
        $stmt = GO_Addressbook_Model_Company::model()->findLinks($model);
        while($company = $stmt->fetch()) {
            if ($company->email) {
                $recipients[$company->email] = $company->name;
            }
        }

        $message->setTo($recipients);

		$imap = $account->openImapConnection($account->drafts);

		if(!$imap->append_message($account->drafts, $message, "\Seen")){
			//$imap->last_error();
		}

        return array(
            'uid'=>@$imap->result[1][5],
            'mailbox'=>$account->drafts,
            'account_id'=>$account->id
        );
    }

    private function saveStatusChange($model, $email = array()) {
        $ticketStatus = new GO_Cticket_Model_TicketStatus();
        $ticketStatus->setAttributes(array(
            "ticket_id" => $model->id,
            "status_id" => $model->status_id,
            "email_sent" => 0,
            "email_uid" => @$email['uid'],
            "email_mailbox" =>@$email['mailbox'],
            "email_account_id" =>@$email['account_id'],
        ));
        $ticketStatus->save();
    }
}
