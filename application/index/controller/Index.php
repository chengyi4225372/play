<?php
namespace app\index\controller;

use app\index\controller\Base;
use think\Controller;
use think\Db;
use think\Session;

class Index extends Base
{
    //首页
    public function index()
    {
        if($this->request->isGet()){

            return $this->fetch();
        }
        return false;
    }

    public function info(){
        return $this->fetch();
    }

    public function addqu(){
        if($this->request->isPost()){
            $mid  = input('post.mid');
            $qu   = input('post.qu','','trim');
            $play = input('post.name','','trim');
            if(empty($mid) || !isset($mid)){
                return false;
            }

            $ret = Db::name('qqinfo')->where(['id'=>$mid])->update(['qu'=>$qu,'playname'=>$play]);

            if($ret !== false){
                $res = session('memid',null);
                if($res !== false){
                    return json(['code'=>200,'msg'=>'ok']);
                }
            } else {
                return json(['code'=>400,'msg'=>'false']);
            }
        }
        return false;
    }

}
