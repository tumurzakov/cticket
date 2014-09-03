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

* **go/base/mail/Imap.php**
 * Saving last response
    
    ```
	public function append_end() {
		$this->result = $this->get_response(false, true);
		return  $this->check_response($this->result, true);
	}
    ```
    
    This is needed for getting imap uid. 
    Standart $imap->get_uidnext() returns random uids.

* **modules/email/controllers/MessageController.php**
 * New event **aftersave** 
    
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

* **modules/files/controllers/FolderController.php**
 * New file source

   ```
   if (GO::modules()->cticket) {
        $contactsFolder = GO_Files_Model_Folder::model()->findByPath('cticket');

        if ($contactsFolder) {
            $node = $this->_folderToNode($contactsFolder, $expandFolderIds, false, $showFiles);
            $node['text'] = GO::t('cticket', 'cticket');
            $response[] = $node;
        }    
    } 
    ```

* **modules/files/BookmarksGrid.js**
 * added baseParameters to JsonStore 

 ```
    config.store = new GO.data.JsonStore({
        url:GO.url("files/bookmark/store"),
        baseParams: {
            extra_folder_id: GO.cticket.last_ticket_folder_id
        },  
        id: 'folder_id',
        fields:["folder_id","name"],
        remoteSort:true
    }); 

 ```

* **modules/files/controllers/BookmarksController.php**
 * showing folder from new extra_folder_id parameter in bookmarks

 ```
    protected function actionStore($params){
        $response = parent::actionStore($params);
        if ($params['extra_folder_id']) {
            $folder = GO_Files_Model_Folder::model()->find(
                GO_Base_Db_FindParams::newInstance()
                    ->single()
                    ->criteria(
                        GO_Base_Db_FindCriteria::newInstance()
                            ->addCondition('id', $params['extra_folder_id'])
                    )
            );
            $response['results'][] = array(
                'folder_id'=>$folder->id,
                'user_id'=>GO::user()->id,
                'name'=>$folder->name
            );
        }
        return $response;
    }
 ```
