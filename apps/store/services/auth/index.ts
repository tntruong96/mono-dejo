import { caxios } from "../axios";
import { ILoginData, IRegisterData } from "./authen.interface";


const Auth = {
    register: {
        fetch: async (registerData: IRegisterData) => {
            return caxios.post("api/auth/register", {...registerData});
        }
    },
    login: {
        fetch: async (loginData: ILoginData) => {
            return caxios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/log-in`, {...loginData});
        }
    },
    logout: {
        fetch: async () => {
            return caxios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/log-out`);
        }
    },
    profile: {
        fetch: async () => {
            return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/profile`);
        }
    }
}

export default Auth;