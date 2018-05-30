import koaRouter from 'koa-router';
import Project from '../controllers/project';
import Check from '../middlewares/check'
import validate from "../middlewares/validate"
const router=koaRouter()
router.prefix('/project');



router.get('/',Project.getProjectList);

router.get('/:projectId',Project.getProject);

router.post('/',validate("addPRO"),Check.token,Project.addProject);
router.put('/:projectId',validate("UPPRO"),Check.token,Project.updateProject);
router.delete('/:projectId',validate("DELPRO"),Check.token,Project.deleteProject);

export default router
