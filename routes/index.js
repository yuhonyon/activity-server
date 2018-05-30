import users from './users'
import component from './component'
import project from './project'
export default app=>{
  app.use(users.routes(), users.allowedMethods());
  app.use(component.routes(), component.allowedMethods());
  app.use(project.routes(), project.allowedMethods());
}
