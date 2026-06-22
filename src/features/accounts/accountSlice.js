import { createSlice } from '@reduxjs/toolkit';

/* INITIAL STATES -- ACCOUNT */
const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
	isLoading: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
			state.isLoading = false;
		},
		withdraw(state, action) {
			state.balance -= action.payload;
		},
		requestLoan: {
			prepare(amount, purpose) {
				return {
					payload: { amount, purpose },
				};
			},
			reducer(state, action) {
				if (state.loan > 0) return;

				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.purpose;
				state.balance += action.payload.amount;
			},
		},
		payLoan(state) {
			state.loanPurpose = '';
			state.balance -= state.loan;
			state.loan = 0;
		},
		convertingCurrency(state) {
			state.isLoading = true;
		},
	},
});

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;
export function deposit(amount, currency) {
	if (currency === 'USD') return { type: 'account/deposit', payload: amount };

	return async function (dispatch) {
		dispatch({ type: 'account/convertingCurrency' });
		// API CALL
		const res = await fetch(
			`/api/latest?amount=${amount}&from=${currency}&to=USD`,
		);
		const data = await res.json();
		const converted = data.rates.USD;
		// return action
		dispatch({ type: 'account/deposit', payload: converted });
	};
}
export default accountSlice.reducer;
