<?php
namespace app\index\controller;

use app\v1\controller\Base;
use think\Controller;
use think\Db;
use think\Session;

class Index extends Base
{
    //首页
    public function index()
    {
        return $this->fetch();
    }

    public function infos(){
        if($this->request->isPost()){
           $mid  = input('post.mid','','int');
           $qu   = input('post.','','');
           $play = input('post.','','');

           if(empty($mid) || !isset($mid)){
               return false;
           }

           $ret = Db::name('qqinfo')->where(['id'=>$mid])->update(['qu'=>$qu,'playname'=>$play]);

           if($ret !== false){
               return json(['code'=>200,'msg'=>'ok']);
           } else {
               return json(['code'=>400,'msg'=>'false']);
           }
        }

        return $this->fetch();
    }

}
