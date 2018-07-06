<?php
spl_autoload_register('myAutoloader');
function myAutoloader($classname) {
  require_once __DIR__."/../classes/$classname.class.php";
}
require_once __DIR__.'/../vendor/autoload.php';

$twig = new Twig_Environment(
                             new Twig_Loader_Filesystem(__DIR__.'/templates'),
                             ['debug' => true,'cache' => __DIR__.'/twig-cache']
                             );



/* DEV MODE
 *
 *
 *
 */
 $DEV_MODE = ( $_SERVER['REMOTE_ADDR'] === '24.99.149.88') ? true : false;

 
 
/* $fromRouter sends information to model and logic files
 * $model specifies /molders folder for SQL data
 * $logic specifies any model-type files for anything other than SQL data
 * $toScript specifies any variables to be returned from the model/logic files to be inserted in <script></script> tags at the bottom of the HTML body
 *  $incFiles specifies a list of JS/CSS files to be returned
 */
 $fromRouter = [];
 $model = [];
 $logic = [];
 $toScript =[];
 $incJS = [];

 
 
 
 /* Set defaults here
  *
  *
  *
  */
 $request = (isset($_GET['path']) && strlen($_GET['path'])) ? $_GET['path'] : 'regions';


 /* Define routes
  *
  *
  *
  */

  
//Routes - Main Sites
if ($request === 'regions') {
  $title = 'Global Stock Market Correlations';
  /*$fromRouter = ['category' => 'reg','corr_type' => 'rho','freq' => 'd', 'trail' => 30];
  $model[] = 'get_specs_categories';
  $model[] = 'get_tags_series';
  $model[] = 'get_tags_correl';
  $model[] = 'get_tags_gfi';*/
  //$logic[] ='heatmap';
  //$toScript = ['tagsSeries','tagsCorrel','heatMapData','tagsGFI','specsCategories','corr_type','freq','trail'];
  array_push($incJS,'regions','heatmap','mapGenerator'/*,'tsGenerator'*/);
}

elseif ($request == 'stocksectorcorrelation') {
  $title = 'Stock Sector Industry Correlation Lookup';
  $model = 'correlations/getstocks.script.php';
}

elseif ($request == 'stock') {
  $title = 'Stock-to-Stock Correlation Lookup';
}



//Routes - Update Sites

elseif ($request == 'updatehistseries') {
  $title = 'Historical Series Updater';
  $model[] = 'get_tags_series';
  $model[] = 'get_specs_categories';
  $toScript = ['tagsSeries','specsCategories'];
}

//Currently does not use categories correctly!
elseif ($request == 'updatetagscorrel') {
  $title = 'Correlation Tags Updater';
  $model[] = 'get_tags_series';
  $model[] = 'get_tags_correl';
  $model[] = 'get_specs_categories';
  $toScript = ['tagsSeries','tagsCorrel','specsCategories'];
}

elseif ($request == 'updatehistcorrel') {
  $title = 'Correlation History Updater';
  $model[] = 'get_tags_correl';
  $toScript = ['tagsCorrel'];
}







/* Override the $fromAjax variables with $_POST variables if they're set
 *
 *
 *
 *
 */
 foreach ($fromRouter as $k => $fR) {
  if ( isset($_POST[$k]) && !is_null($_POST[$k]) ) {
   $fromRouter[$k] = $_POST[$k];
  }
 }
 
 
 
 /* Execute models and logics scripts
  *
  *
  *
  */
 if (count($model) > 0) {
   $sql = new MyPDO();
   foreach ($model as $m) {
     require_once(__DIR__."/../models/$m.model.php");
     }
 }
 
 if (count($logic) > 0) {
   foreach ($logic as $l) {
     require_once(__DIR__."/../models/$l.logic.php");
   }
 }

 /* Prepares variables to send to HTML template
  *
  *
  *
  */

 if (count($toScript) > 0) {
   $scriptStr = '';
   foreach ($toScript as $varName) {
     $scriptStr .= "$varName = ".json_encode(${$varName}).';'; 
   }
   $script = new StaticFile('js',$scriptStr);
   $toHTML['bodyScript'] = $script->minify();
 }
 else $toHTML['bodyScript'] = '';
 
 $toHTML['title'] = ( isset($title) ) ? $title : 'No Title';
 
 
 if ($DEV_MODE === true) {
  $minifier = new MatthiasMullie\Minify\JS(__DIR__."/../js/main.js");
  foreach ($incJS as $js) {
   $minifier->add(__DIR__."/../js/$js.js");
  }
  $minifier->minify(__DIR__."/static/$request.js");
 }
 
 if (count($incJS) > 0) $toHTML['pageJS'] = '<script src="static/'.$request.'.js"></script>';
 else $toHTML['pageJS'] = '';



 /* Renders page
  *
  *
  *
  */
 
 echo $twig->render($request.'.html', $toHTML);
                    exit();
 try { echo $twig->render($request.'.html', $toHTML); }
 catch (Exception $e) { echo 'Page not found'; }