<?php
namespace app\index\controller;

use think\Controller;
use think\Db;

class Index extends Controller
{


    public function login(){
        if($this->request->isGet()){
            return $this->fetch();
        }

        if($this->request->isPost()){
            return $this->fetch();
        }
    }

    //首页
    public function index()
    {
        return $this->fetch();
    }

}
