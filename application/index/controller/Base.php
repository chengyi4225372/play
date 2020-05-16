<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/16
 * Time: 18:38
 */
namespace app\index\controller;

use think\Controller;
use think\Db;
use think\Session;

class Base extends Controller
{

    public function _initialize()
    {
        parent::_initialize(); // TODO: Change the autogenerated stub

        if(empty(session('memid'))){
            return $this->redirect(url('login/login'));
        }
    }

}