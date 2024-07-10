export const registrationValidationParameters = {
    firstName: {
        minLength: 4,
    },
    lastName: {
        minLength: 4,
    },
    username: {
        minLength: 3,
    },
    email: {
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    phone: {
        regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    },
    password: {
        minLength: 6,
    },
}