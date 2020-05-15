<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/13 0013
 * Time: 18:11
 * 新闻控制器
 */
namespace  app\v1\controller;

use think\Controller;
use think\Db;
use think\Request;

class News extends Controller {

    public function index(){

        return $this->fetch();
    }

    public function welcome(){

        return $this->fetch();
    }

}