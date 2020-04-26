function time(target, name, descriptor) {
    const func = descriptor.value;
    if (typeof func === `function`) {
        descriptor.value = function (...args) {
            console.time();
            const results = func.apply(this, args);
            console.timeEnd();
            return results;
        };
    }
}

export default time;