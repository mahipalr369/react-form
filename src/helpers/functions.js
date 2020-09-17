export const transformPhoneInput = value => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return value.replace(phoneRegex, '($1) $2-$3')
}