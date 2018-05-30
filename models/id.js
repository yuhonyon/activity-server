import mongoose from 'mongoose'

const idSchema = new mongoose.Schema({
	component_id: Number,
	project_id: Number,
	user_id: Number
});

const Id = mongoose.model('Id', idSchema);

Id.findOne((err, data) => {
	if (!data) {
		const newId = new Id({
      component_id: 0,
    	project_id: 0,
    	user_id: 0
		});
		newId.save();
	}
})
export default Id
