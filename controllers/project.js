import ProjectModel from './../models/project';
import UserModel from './../models/user';
import xss from 'xss';
import defaultProject from './../defaultData/project'
import BaseController from '../base/baseController'
import parseDate from "../util/parseDate"
import fs from 'fs'
import path from 'path'
import extend from '../util/extend'



class Project extends BaseController {
  constructor() {
    super()
    this.addProject = this.addProject.bind(this);
  }
  async addProject(ctx, next) {
    const projectId = await this.getId('project_id');
    const newProjectInfo={
      ...ctx.request.body
    }
    const project = new ProjectModel({
      ...defaultProject,
      ...newProjectInfo,
      id: projectId,
      creator: ctx.user._id
    });
    const newproject = await ProjectModel.addProject(project);
    ctx.body = {
      message: "添加成功"
    };
  }

  async deleteProject(ctx, next) {
    const project = await ProjectModel.findOne({id: ctx.params.projectId});
    if (!project) {
      ctx.status = 400;
      ctx.body = {
        message: "项目不存在"
      };
    }
    await ProjectModel.deleteProject(project);
    ctx.body = {
      message: "删除成功"
    };

  }

  async updateProject(ctx, next) {

    const project = await ProjectModel.findOne({id: ctx.params.projectId});
    if (!project) {
      ctx.status = 400;
      ctx.body = {
        message: "项目不存在"
      };
    }

    if(ctx.request.body.__v<project.__v){
      ctx.status = 400;
      ctx.body = {
        message: "保存失败,该项目已被更新",
      };
      return;
    }
    const newProjectInfo={
      ...ctx.request.body
    }
    delete newProjectInfo.__v;

    await ProjectModel.updateProject(project, newProjectInfo);
    ctx.body = {
      message: "修改成功"
    };
  }



  async getProjectList(ctx, next) {

    let projects = await ProjectModel.find({}).populate("creator")


    if (!projects) {
      ctx.status = 400;
      ctx.body = {
        message: "项目不存在"
      };
    } else {
      ctx.body = projects
    }
  }



  async getProject(ctx, next) {

    const project = await ProjectModel.findOne({id: ctx.params.projectId}).populate({
      path: 'creator',
      select: "name type id -_id",
    })

    if (!project) {
      ctx.status = 400;
      ctx.body = {
        message: "项目不存在"
      };
    }

    ctx.body = project;
  }

}

export default new Project()
