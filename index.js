import time from './decorators/time';

class Test {
    @time
    test() {
        console.log(`time test`);
    }
}

const test = new Test();

test.test();