import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { UserProfile } from "./UserProfile.view";
import { AuthenActionImp } from "../../../redux/user";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language,
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProp = {
    updateProfile: AuthenActionImp.updateProfile
}

let UserProfileScreen = connect(mapStateToProps, mapDispatchToProp)(UserProfile)
export default UserProfileScreen