export function setUserIDStore(UserID) {
	return {
		type: "USER_ID",
		payload: UserID,
	}
}

export function fetchArticleLog(Password) {
	return {
		type: "PASSWORD",
		payload: Password,
	}
}

export function setUserInfomation(UserInfo) {
	return {
		type: "SAVE_USER_INFO",
		payload: UserInfo,
	}
}

export function setFamilyInfomation(FamilyInfo) {
	return {
		type: "FAMILY_INFO",
		payload: FamilyInfo,
	}
}
export function setRoleInfomation(RoleInfo) {
	return {
		type: "SAVE_ROLENAME",
		payload: RoleInfo,
	}
}
export function setRegUserData(RoleInfo) {
	return {
		type: "REG_USERDATA",
		payload: RoleInfo,
	}
}
export function setAddedFamilyUser(AddedFamilyUser) {
	return {
		type: "ADDED_FAMILY_USER",
		payload: AddedFamilyUser,
	}
}

export function setTemp(AddedFamilyUser) {
	return {
		type: "CHANGE_TEMP",
		payload: AddedFamilyUser,
	}
}
export function setUserRole(userrole) {
	return {
		type: "CHANGE_USER_ROLE",
		payload: userrole,
	}
}
export function setUservalues(userInputdata) {
	return {
		type: "RESEND_MAIL",
		payload: userInputdata,
	}

}
export function setCurrentUser(listusers) {
	return {
		type: "CHOOSE_ROLE",
		payload: listusers,
	}
}
export function setUpdatedRoleInfomation(updateRoleInfo) {
	return {
		type: "UPDATE_ROLE",
		payload: updateRoleInfo,
	}
}
export function setLoginUserDetails(data) {
	return {
		type: "LOGIN_USER_DETAILS",
		payload: data,
	}
}
export function setTaskInfo(TaskInfo) {
	return {
		type: "TASK_INFO",
		payload: TaskInfo,
	}
}
export function setSelectUserInfo(selectUserinfo) {
	return {
		type: "SELECT_USER_INFO",
		payload: selectUserinfo,
	}
}