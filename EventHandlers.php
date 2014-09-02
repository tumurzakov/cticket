<?php

class GO_Cticket_EventHandlers {
	public static function afterSave(
        GO_Email_Controller_Message $controller, 
        array &$response, 
        GO_Base_Mail_Message $message, 
        GO_Base_Mail_Imap $imap,
        GO_Email_Model_Account $account, 
        GO_Email_Model_Alias $alias, $params) {

        $status = GO_Cticket_Model_TicketStatus::model()->find(
            GO_Base_Db_FindParams::newInstance()
                ->single()
				->criteria(
                    GO_Base_Db_FindCriteria::newInstance()
                        ->addCondition('email_uid', $params['draft_uid'])
                        ->addCondition('email_mailbox', $account->drafts)
                        ->addCondition('email_account_id', $account->id)
                )
        );

        if ($status) {
            $status->email_uid = @$imap->result[1][5];
            $status->save();
        }
    }

	public static function beforeSend(
        GO_Email_Controller_Message $controller, 
        array &$response, 
        GO_Base_Mail_SmimeMessage $message, 
        GO_Base_Mail_Mailer $mailer, 
        GO_Email_Model_Account $account, 
        GO_Email_Model_Alias $alias, $params) {

        $status = GO_Cticket_Model_TicketStatus::model()->find(
            GO_Base_Db_FindParams::newInstance()
                ->single()
				->criteria(
                    GO_Base_Db_FindCriteria::newInstance()
                        ->addCondition('email_uid', $params['draft_uid'])
                        ->addCondition('email_mailbox', $account->drafts)
                        ->addCondition('email_account_id', $account->id)
                )
        );

        if ($status) {
            $status->email_uid = '';
            $status->email_sent = 1;
            $status->save();
        }
    }
}
