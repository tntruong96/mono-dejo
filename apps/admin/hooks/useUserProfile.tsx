// import { UserProfile } from "@admin/interfaces/authenticate";
import { selectProfile } from "@admin/redux/store/common/commonSlice";
import { UserProfile } from "@shared-types/src";
import { useSelector } from "react-redux"
// import { selectProfile } from "../../redux/store/common/commonSlice"



export const useUserProfile = () => {
    const userProfile: UserProfile = useSelector(selectProfile);

    return userProfile;
}