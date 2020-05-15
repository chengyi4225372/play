<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/5/14 0014
 * Time: 14:50
 */
namespace  app\v1\controller;

use think\Controller;
use think\Db;
use app\v1\controller\Base;

class Member extends Base {

    protected $table ='users';

    public function index(){
        $data = Db::name($this->table)->where('status',1)->order('id desc')->paginate(15);
        $this->assign('data',$data);
        return $this->fetch();
    }

    public function add(){
       if($this->request->isPost()){
           $data['users'] = input('post.users','','trim');
           $data['pwd']   = md5(input('post.pwd','','trim'));
           $data['create_time']   = time();

           $res = Db::name($this->table)->insertGetId($data);

           if($res !== false){
               return json(['code'=>200,'msg'=>'添加成功']);
           }else{
               return json(['code'=>400,'msg'=>'添加失败']);
           }
       }
        return $this->fetch();
    }

    public function edit(){
        if($this->request->isGet()){
             $mid = input('get.mid');
            if(empty($mid) || !isset($mid)){
                return false;
            }
            $infos = Db::name($this->table)->where('id',$mid)->find();
            $this->assign('infos',$infos);
            return $this->fetch();
        }
         return  false;
    }


    public function del(){
        if($this->request->isGet()){
            $mid = input('get.mid');
            if(empty($mid) || !isset($mid)){
                return false;
            }
            $infos = Db::name($this->table)->where('id',$mid)->update(['status'=>0]);

            if($infos !== false){
                return json(['code'=>200,'msg'=>'删除成功']);
            }else{
                return json(['code'=>400,'msg'=>'删除失败']);
            }

        }
        return  false;
    }
}