class ValidateCredentials {
    // Validação de campos vazios
    validateFields(requiredFields = [], body = {}) {
        for (let field of requiredFields) {
            if (!body[field]) {
                return { valid: false, msg: `${field} is required` };
            }
        }

        return { valid: true };
    }

    // Validação de e-mail
    validateEmail(email = '') {
        const regex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(email)) {
            return { valid: false, msg: `Invalid email` };
        }

        return { valid: true };
    }

    // Validação de senha forte
    validatePassword(password = '') {

        //Tamanho da senha
        if (password.length < 8) {
            return { valid: false, msg: `Password is too short` };
        }

        //Verifica se senha contem maiusculo
        if (!/[A-Z]/.test(password)) {
            return { valid: false, msg: `Password must have at least one uppercase letter` };
        }

        //Verifica se senha contem caractere especial
        if (!/[^a-zA-Z0-9]/.test(password)) {
            return { valid: false, msg: 'Password must have at least one special character' };
        }

        //Verifica se senha contem numero
        if (!/[0-9]/.test(password)) {
            return { valid: false, msg: `Password must have at least one number` };
        }

        return { valid: true };
    }
}

export default ValidateCredentials;
