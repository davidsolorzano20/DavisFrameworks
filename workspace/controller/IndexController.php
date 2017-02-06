<?php
/**
 * Created by PhpStorm.
 * User: luis
 * Date: 08-21-16
 * Time: 02:38 PM
 */

namespace DavisWork\controller;

use Davis\core\model\DavisTable;
use Davis\core\views\Views;
use Davis\core\controller\DavisController;
use DavisWork\model\UserModel;

class IndexController extends DavisController {

	public function Index() {
		Views::renderTwig('home.davisframeworks');
	}

	public function Blog($name, $da) {
		echo $name. $da;

	}

	public function Update() {
		//DavisTable::table('users')->where('name', 'david')->update(['name'=>'David Paredes']);
		//DavisTable::table('users')->insert(['name'=>'David Paredes']);
		$update = UserModel::find('1');
		$update->name = 'Cambiado';
		$update->save();

	}

	public function Query() {
		$data = DavisTable::table('users')->get();
		$resp = new UserModel();
		$data = $resp->get();
		$resp->name = 'david';
		$resp->age = '21';
		$resp->save();
	}

}
