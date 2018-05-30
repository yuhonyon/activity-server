import koaRouter from 'koa-router';
import Component from '../controllers/component';
import Check from '../middlewares/check'
import validate from "../middlewares/validate"


const router=koaRouter()
router.prefix('/component');


router.get('/:componentId',Component.getComponent);
router.get('/',Component.getComponentList);
router.put('/:componentId',validate("UPCOMP"),Check.token,Component.updateComponent);
router.delete('/:componentId',validate("DELCOMP"),Check.token,Component.deleteComponent);
router.post('/',validate("ADDCOMP"),Check.token,Component.addComponent);


export default router
