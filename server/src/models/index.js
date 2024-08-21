import { userModel } from "./user/userModel";
import { userAuthModel } from "./user/userAuthModel";
import { adminAuthModel } from "./admin/adminAuthModel";

export const models = [new userAuthModel(), new adminAuthModel(), new userModel()];