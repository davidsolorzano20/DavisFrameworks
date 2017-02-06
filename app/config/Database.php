<?php
/**
 * Created by PhpStorm.
 * User: luis
 * Date: 08-24-16
 * Time: 07:30 AM
 */

namespace DavisConfig\config;

use Illuminate\Database\Capsule\Manager;

class Database {

	public static function DriverConnection() {
		$connectionBase = new Manager();
		$connectionBase->addConnection([
			'driver' => 'mysql',
			'host' => 'localhost',
			'database' => 'davis',
			'username' => 'root',
			'password' => 'root',
			'charset' => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix' => '',
		]);
		$connectionBase->setAsGlobal();
		$connectionBase->bootEloquent();
	}

}