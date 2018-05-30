export default  function(type){
  return async function(ctx, next){
    //组件
    if(type==='ADDCOMP'){
      ctx.checkBody('name').notEmpty("组件名称不能为空");
    }else if(type==='DELCOMP'){
      ctx.checkParams('componentId').notEmpty("componentId不能为空");
    }else if(type==='UPCOMP'){
      ctx.checkParams('componentId').notEmpty("componentId不能为空");
    }
  //项目
    else if(type==='ADDPRO'){
      ctx.checkBody('name').notEmpty("项目名称不能为空");
    }else if(type==='DELPRO'){
      ctx.checkParams('projectId').notEmpty("projectId不能为空");
    }else if(type==='UPPRO'){
      ctx.checkParams('projectId').notEmpty("projectId不能为空");
    }

    //用户
    else if(type==='ADDUSER'){
      ctx.checkBody('name').notEmpty("昵称不能为空");
      ctx.checkBody('password').notEmpty("密码不能为空");
      ctx.checkBody('phone').notEmpty("手机号不能为空").isMobilePhone("无效的手机号", ['zh-CN']);
    }else if(type==='SIGNUP'){
      ctx.checkBody('name').notEmpty("昵称不能为空");
      ctx.checkBody('password').notEmpty("密码不能为空");
      ctx.checkBody('phone').notEmpty("手机号不能为空").isMobilePhone("无效的手机号", ['zh-CN']);
    }else if(type==='SIGNIN'){
      ctx.checkBody('password').notEmpty("密码不能为空");
      ctx.checkBody('phone').notEmpty("手机号不能为空").isMobilePhone("无效的手机号", ['zh-CN']);
    }



    if (ctx.errors) {
      ctx.status = 400;
      ctx.body = {
        message: ctx.errors[0][Object.keys(ctx.errors[0])[0]]
      };
      return;
    }

    await next()

  }
}
