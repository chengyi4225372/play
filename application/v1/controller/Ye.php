<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/15
 * Time: 13:22
 * 企业文话
 */
namespace  app\v1\controller;

use think\Controller;
use think\Db;
use think\Request;

class Ye extends Controller {

    public function index(){

        return $this->fetch();
    }
}