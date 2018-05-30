import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  id:Number,
  name: String,
  data: {}
},{timestamps:true});

ComponentSchema.index({id: 1});

const Component = mongoose.model("Component", ComponentSchema);

Component.addComponent = async(component) => {
  const newComponent = await component.save();
  return newComponent;
};


Component.deleteComponent = async(component) => {
    component.remove()
};

Component.updateComponent= async(component,newComponentInfo) => {
    component.set(newComponentInfo);
    console.log(newComponentInfo,99999)
    await component.save();
};



export default Component;
