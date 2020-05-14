const debounce = (time) => {
    let timer;
    return (target, name, descriptor) => {
        const func = descriptor.value;
        if (typeof func === `function`) {
            descriptor.value = function (...args) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(this, args);
                }, wait);
            };
        }
    };
};

export default debounce;
