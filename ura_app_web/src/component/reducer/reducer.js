const initialState = {
    UserInfo: "",
    FamilyInfo: "",
    UserID: "",
    Password: "",
    Role: "",
    RegUserData: "",
    AddedFamilyUser: [],
    Temp: "",
    UserRole: "",
    TaskInfo: "",
};

export const Reducer_UserData = (state = initialState, action) => {
    switch (action.type) {
        case "USER_INFO":
            state = {
                ...state,
                articleList: action.payload
            }
            break;
        case "FAMILY_INFO":
            state = {
                ...state,
                FamilyInfo: action.payload
            }
        case "USER_ID":
            state = {
                ...state,
                UserID: action.payload,
            }
            break;
        case "SAVE_USER_INFO":
            state = {
                ...state,
                UserInfo: action.payload,
            }
            break;

        case "PASSWORD":
            state = {
                ...state,
                Password: action.payload
            }
            break;
        case "SAVE_ROLENAME":
            state = {
                ...state,
                Role: action.payload
            }
            break;
        case "REG_USERDATA":
            state = {
                ...state,
                RegUserData: action.payload
            }
            break;
        case "ADDED_FAMILY_USER":
            state = {
                ...state,
                AddedFamilyUser: action.payload
            }
            break;
        case "CHANGE_TEMP":
            state = {
                ...state,
                Temp: action.payload
            }
            break;
        case "CHANGE_USER_ROLE":
            state = {
                ...state,
                UserRole: action.payload
            }
            break;

        case "RESEND_MAIL":
            state = {
                ...state,
                userInputdata: action.payload
            }
            break;
        case "CHOOSE_ROLE":
            state = {
                ...state,
                listusers: action.payload
            }
            break;
        case "UPDATE_ROLE":
            state = {
                ...state,
                updateRoleInfo: action.payload
            }
            break;
        case "LOGIN_USER_DETAILS":
            state = {
                ...state,
                data: action.payload
            }
            break;
        case "TASK_INFO":
            state = {
                ...state,
                TaskInfo: action.payload
            }
            break;
        case "SELECT_USER_INFO":
            state = {
                ...state,
                selectUserinfo: action.payload
            }
            break;
    }
    return state;
}
