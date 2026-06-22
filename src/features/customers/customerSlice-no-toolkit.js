/* INITIAL STATES -- CUSTOMER */
const initialState = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

/* REDUCERS -- CUSTOMER */
export default function customerReducer(state = initialState, action) {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...state,
				fullName: action.payload.fullName,
				nationalId: action.payload.nationalId,
				createdAt: action.payload.createdAt,
			};

		case 'customer/updateCustomer':
			return {
				...state,
				fullName: action.payload.fullName,
			};
		default:
			return state;
	}
}

/* ACTION CREATORS -- CUSTOMER */
export function createCustomer(fullName, nationalId) {
	return {
		type: 'customer/createCustomer',
		payload: { fullName, nationalId, createdAt: new Date().toISOString() },
	};
}

export function updateCustomer(fullName) {
	return {
		type: 'customer/updateCustomer',
		payload: { fullName },
	};
}
