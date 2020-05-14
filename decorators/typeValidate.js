const validate = (type) => (target, name) => {
    if (typeof target[name] !== type)
        throw new Error(`attribute ${name} must be ${type}.`);
};

export default validate;
