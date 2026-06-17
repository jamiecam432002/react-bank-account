/* INITIAL STATES -- ACCOUNT */
const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

/* REDUCERS -- ACCOUNT */
export default function accountReducer(state = initialState, action) {
	switch (action.type) {
		case 'account/deposit':
			return { ...state, balance: state.balance + action.payload };

		case 'account/withdraw':
			return { ...state, balance: state.balance - action.payload };

		case 'account/requestLoan':
			if (state.loan > 0) return state;
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};

		case 'account/payLoan':
			return {
				...state,
				balance: state.balance - state.loan,
				loan: 0,
				loanPurpose: '',
			};

		default:
			return state;
	}
}

/* ACTION CREATORS -- ACCOUNT */
export function deposit(amount, currency) {
	if (currency === 'USD') return { type: 'account/deposit', payload: amount };

	return async function (dispatch, getState) {
		// API CALL
		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
		);
		const data = await res.json();
		console.log(data);
		// return action
	};
}
export function withdraw(amount) {
	return { type: 'account/withdraw', payload: amount };
}
export function requestLoan(amount, purpose) {
	return { type: 'account/requestLoan', payload: { amount, purpose } };
}
export function payLoan() {
	return { type: 'account/payLoan' };
}
