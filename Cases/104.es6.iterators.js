let fibonacci = {
    [Symbol.iterator]() {
        let pre = 0,
            cur = 1;
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return {
                    done: false,
                    value: cur
                }
            }
        }
    }
}

for (var n of fibonacci) {
    if (n > 1000) {
        break
    }
    console.log(n);
}

/*

interface IteratorResult {
    done: boolean;
    value: any;
}
interface Iterator {
    next(): IteratorResult;
}
interface Iterable {
    [Symbol.iterator](): Iterator
}

 */