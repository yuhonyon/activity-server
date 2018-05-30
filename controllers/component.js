import ComponentModel from './../models/component';
import ProjectModel from './../models/project';
import defaultComponent from './../defaultData/component'
import BaseController from '../base/baseController'
import xss  from 'xss';


class Component extends BaseController{
  constructor(){
    super();
    this.addComponent=this.addComponent.bind(this);
  }

  async getComponent(ctx, next) {
    const component = await ComponentModel.findOne({id: ctx.params.componentId});
    if (!component) {
      ctx.status = 400;
      ctx.body = {
        message: "组件不存在"
      };
    }
    ctx.body = {
      id:component.id,
      name:component.name,
      data: component.data,
    };

  }


  async getComponentList(ctx, next) {
    const components = await ComponentModel.find({});
    if (!components) {
      ctx.status = 400;
      ctx.body = {
        message: "组件不存在"
      };
    }
    ctx.body = components.map(component=>({
      id:component.id,
      name:component.name,
      data: component.data,
    }));

  }

  async addComponent(ctx, next){

    const componentId=await this.getId('component_id');

    const componentInfo={
      ...defaultComponent,
      ...ctx.request.body,
      id:componentId,
    }

    const component = new ComponentModel(componentInfo);
    await ComponentModel.addComponent(component,module);

    ctx.body={message:"添加成功"}
  }






  async updateComponent(ctx, next) {



    const component =await ComponentModel
    .findOne({
      id: ctx.params.componentId
    })


    if(!component){
      ctx.status = 400;
      ctx.body = {
        message: "组件不存在",
      };
      return;
    }


    const componentInfo={
      ...ctx.request.body
    }


    await ComponentModel.updateComponent(component,componentInfo)


    ctx.body = {
      message: "更新成功",
    };

  }

  async deleteComponent(ctx, next) {


    let componentId = xss(ctx.params.componentId.trim());
    const component=await ComponentModel
    .findOne({id:componentId})
    .populate("module")
    .populate("project");

    if(!component){
      ctx.status = 400;
      ctx.body = {message:"接口不存在"};
      return;
    }
    const module =component.module;
    const project =component.project;



    if(ctx.user.type!==4&&!project.admin.equals(ctx.user._id)&&!project.developers.find(id=>id.equals(ctx.user._id))){
      ctx.status = 403;
      ctx.body = {message:"没有删除接口权限"};
      return;
    }


    await ComponentModel.deleteComponent(component);

    ctx.record.component = component;
    ctx.record.module = module;
    ctx.record.project = project;
    ctx.body = {message:"删除成功"};
  }

}

export default new Component()
