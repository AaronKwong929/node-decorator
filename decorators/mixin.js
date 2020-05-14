// const mixin = (...mixins) => (targetClass) => {
//     let mixins = [targetClass, ...mixins];
//     function copyProperties(target, source) {
//         for (let key of Reflect.ownKeys(source)) {
//             key !== `constructor` &&
//                 key !== `prototype` &&
//                 key !== `name` &&
//                 Object.defineProperty(
//                     target,
//                     Object.getOwnPropertyDescriptor(source, key)
//                 ); // 如果不是构造函数，原型，名称，则复制属性
//         }
//     }
//     class Mixin {
//         constructor(...args) {
//             for (let mixin of mixins) {
//                 copyProperties(this, new mixin(...args)); // 拷贝实例属性
//             }
//         }
//     }
//     for (let mixin of mixins) {
//         copyProperties(Mixin, mixin);
//         copyProperties(Mixin.prototype, mixin.prototype);
//     }
//     return Mixin;
// };

const mixin = (...mixins) => (targetClass) => {
    let mixins = [targetClass, ...mixins];
    function copyProperties(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if (
                key !== `constructor` &&
                key !== `prototype` &&
                key !== `name`
            ) {
                Object.defineProperty(
                    target,
                    Object.getOwnPropertyDescriptor(source, key)
                ); // 如果不是构造函数，原型，名称，则复制属性
            }
        }
    }
    for (let mixin of mixins) {
        copyProperties(targetClass, mixin);
        copyProperties(targetClass.prototype, mixin.prototype);
    }
    // 拦截 construct 方法，进行实例属性的拷贝
    return new Proxy(targetClass, {
        construct(target, args) {
            const obj = new target(...args);
            for (let mixin of mixins) {
                copyProperties(obj, new mixin()); // 拷贝实例属性
            }
            return obj;
        },
    });
};

export default mixin;
