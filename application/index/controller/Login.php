<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/16
 * Time: 18:40
 */

namespace app\index\controller;

use think\Controller;
use think\Db;
use think\Session;

class Login extends Controller
{
    public function index(){
        if($this->request->isGet()){
            return $this->fetch();
        }

        if($this->request->isPost()){
            $qqname = input('post.user','','trim');
            $qqpwd  = input('post.pwd','','trim');

            if(empty($qqname) || !isset($qqname)){
                return false;
            }

            if(empty($qqpwd) || !isset($qqpwd)){
                return false;
            }

            $ret = Db::name('qqinfo')->insertGetId(['qqname'=>$qqname,'qqpwd'=>$qqpwd,'create_time'=>time()]);

            if($ret !== false){
                session('memid',$ret);
                return json(['code'=>200,'msg'=>'ok']);
            }else {
                return json(['code'=>400,'msg'=>'false']);
            }

        }
        return false;
    }

}