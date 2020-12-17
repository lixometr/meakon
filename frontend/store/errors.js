export const state = () => ({
    errors: {
        21: "Email or password are incorrect",
        23: 'Such User exists',
        15: 'Invalid data',
        22: 'User not found',
        31: 'Invalid password',
        32: 'Passwords not equals',
        33: 'Passwords are similar'
    }
})
export const getters = {
    error(state) {
        return code => {
            return state.errors[code]
        }
    }
}