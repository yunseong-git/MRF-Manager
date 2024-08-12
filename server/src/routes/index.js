import { authRouter } from "./common/authRouter";
import { adminAuthRouter } from "./admin/adminAuthRouter";

export const routers = [new authRouter(), new adminAuthRouter()];
