Group-Office Community Tickets Module (cticket)
===============================================

Based on Notes module code by just adding status field and removing unnecessary code like password protection

Project state
-------------

Still in development

Installation
------------

Clone this repository to modules folder of your Group-Office installation

    git clone https://github.com/tumurzakov/cticket.git

And install it in modules

Changes in other modules
------------------------

* *go/base/mail/Imap.php*
 * Saving last response: 
    ```
	public function append_end() {
		$this->result = $this->get_response(false, true);
		return  $this->check_response($this->result, true);
	}
    ```
    This is needed for getting imap uid. 
    Standart $imap->get_uidnext() returns random uids;
* *modules/email/controllers/MessageController.php*
 * New event *aftersave* 
    ```
    if(!$imap->append_message($account->drafts, $message, "\Seen")){
        $response['success'] = false;
        $response['feedback']=$imap->last_error();
    }

    $this->fireEvent('aftersave', array(
            &$this,
            &$response,
            &$message,
            &$imap,
            $account,
            $alias,
            $params
    ));
    ```
    This event needed for updating imap uid in TicketStatus
