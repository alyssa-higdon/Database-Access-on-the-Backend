const mongoose = require("mongoose");
const userModel = require("./user");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  } else if (name && job) {
    result = await findUserByNameJob(name, job);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
};

async function findUserByNameJob(name, job){
  name_result = await userModel.find({name : name});
  result = name_result.filter( (user) => user['job'] === job);
  return result;
};

async function deleteUserId(id){
  const result = await userModel.findByIdAndDelete(id);
  return result;
  // const user_index = await userModel.findIndex( (user) => user['id'] === id);
  // if (user_index > -1 && user_index != undefined && user_index.length !== 0){

  // }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.deleteUserId = deleteUserId;