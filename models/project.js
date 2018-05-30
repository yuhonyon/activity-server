import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "actCode": String,
  "actTitle": String,
  "shareLink": String,
  "shareTitle": String,
  "shareContent": String,
  "shareDesc": String,
  "sharePic": String,
  components: [{
    name:String,
    data:{},
  }],
  version: String,
}, {timestamps: true});

ProjectSchema.index({id: 1});

const Project = mongoose.model("Project", ProjectSchema);

Project.addProject = async (project) => {
  project = await project.save();
  return project;
};

Project.updateProject=async (project,newProjectInfo)=>{
  project.set(newProjectInfo);
  await project.save()
}

Project.deleteProject=async (project)=>{
  await project.remove()
}

export default Project;
