<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/15
 * Time: 13:24
 */

namespace  app\v1\controller;

use think\Controller;
use think\Db;
use think\Request;

class Banner extends Controller {

    public function index(){

        return $this->fetch();
    }


    public function add(){

        return $this->fetch();
    }


    public function edit(){

        return $this->fetch();
    }

    public function del(){

        return $this->fetch();
    }

}