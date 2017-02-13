<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 2/4/17
 * Time: 9:35 PM
 */
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Yaml\Exception\ParseException;

$ymlroot = __DIR__ . '/vendor/davidsolorzano20/core/http/thunder/route/yaml/script.php';

try {
	$routes_yml = Yaml::parse(file_get_contents('workspace/routes/routes.yml'));
	$fp = fopen($ymlroot, 'w');
	$routes_code_yml = [];
	foreach ($routes_yml as $key => $route) {
		if ($routes_yml[$key]['method'] == 'GET') {
			$routes_code_yml[] = "$" . "router->get('" . $routes_yml[$key]['url'] . "', '" . $routes_yml[$key]['controller'] . '<>' . $routes_yml[$key]['function'] . "');\n";
		} else {
			$routes_code_yml[] = "$" . "router->post('" . $routes_yml[$key]['url'] . "', '" . $routes_yml[$key]['controller'] . '<>' . $routes_yml[$key]['function'] . "');\n";
		}
	}
	$decode = '<?php '. implode('',$routes_code_yml);
	fwrite($fp, $decode);
	fclose($fp);
} catch (ParseException $e) {
	printf("Unable to parse the YAML string: %s", $e->getMessage());
}