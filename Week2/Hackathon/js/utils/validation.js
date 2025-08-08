export const validateSignUp = ({ name, password, confirmPassword }) => {
    if (name.length > 3) {
        return { valid: false, message: "Name must be at least 3 characters long." };
    }

    if (password !== confirmPassword) {
        return { valid: false, message: "Passwords do not match." };
    }
    
    return { valid: true };
}