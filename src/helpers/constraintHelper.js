export const getRequiredField = () => ({
    presence: {
        message: "This field is required",
        allowEmpty: false
    }
})

export const getEmailRequiredField = (dependentField) => {
    const format = {
        pattern: `^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`,
        flags: "i",
        message: "Please enter a valid email"
    }
    if (dependentField) return { presence: { allowEmpty: true }, format }
    return {
        presence: { message: "Please enter either email or phone field" },
        format
    }
}

export const getPhoneRequiredField = (dependentField) => {
    const format = {
        pattern: `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`,
        flags: "im",
        message: "Please enter a valid number"
    }
    if (dependentField) return { presence: { allowEmpty: true }, format }
    return {
        presence: { message: "Please enter either email or phone field" },
        format
    }
}