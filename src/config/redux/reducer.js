const initialState = {
	popup: false,
	isLogin: false,
	isLoading: false,
	user: {},
	notes: [],
};

const reducer = (state = initialState, action) => {
	if (action.type === "popup") {
		return {
			...state,
			popup: action.value,
		};
	}
	if (action.type === "isLogin") {
		return {
			...state,
			isLogin: action.value,
		};
	}
	if (action.type === "C_User") {
		return {
			...state,
			user: action.value,
		};
	}
	if (action.type === "isLoading") {
		return {
			...state,
			isLoading: action.value,
		};
	}
	if (action.type === "_Notes") {
		return {
			...state,
			notes: action.value,
		};
	}
	return state;
};

export default reducer;
