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
 * The Cticket module maintenance class
 * 
 */
class GO_Cticket_CticketModule extends GO_Base_Module{
	
	public function autoInstall() {
		return true;
	}
	
	public function author() {
		return 'Temir Umurzakov';
	}
	
	public function authorEmail() {
		return 'temir@umurzakov.com';
	}
}
