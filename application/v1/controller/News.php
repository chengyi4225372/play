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
use app\v1\controller\Base;
class News extends Base {

    public function index(){
        $list = Db::name('qqinfo')->where(['status'=>1])->order('id desc')->paginate(15);
        $this->assign('list',$list);
        return $this->fetch();
    }

    public function edit(){
        if($this->request->isGet()){
            $mid = input('get.mid','','int');
            $info = Db::name('qqinfo')->where(['id'=>$mid,'status'=>1])->find();
            $this->assign('info',$info);
            return $this->fetch();
        }
        return false;
    }

    public function del(){
        if($this->request->isGet()){
            $mid = input('get.mid','','int');
            $info = Db::name('qqinfo')->where(['id'=>$mid])->update(['status'=>0]);
            if($info !== false){
                return json(['code'=>200,'msg'=>'删除成功']);
            }else {
                return json(['code'=>400,'msg'=>'删除失败']);
            }
        }
    }
}