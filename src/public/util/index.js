import is from "ramda/src/is";
import not from "ramda/src/not";
import pipe from "ramda/src/pipe";
import unnest from "ramda/src/unnest";
import equals from "ramda/src/equals";
import differenceWith from "ramda/src/differenceWith";

export function debounce(fn, delay) {
    let timerId;
    return function(...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
}

/**
 * 根据match 对比两个数组，求出数组的变化（只检测一层）
 * A新增，E修改，D删除
 * @param lhs 原始值
 * @param rhs 新值
 * @param match 匹配对比函数
 * @returns {*}
 */
export function diffArray(lhs, rhs, match) {
    const isNotArray = pipe(is(Array), not);
    if (isNotArray(lhs) || isNotArray(rhs)) {
        console.error("lhs、rhs muse be Array");
        return;
    }
    const differenceWithMatch = differenceWith(match);
    const deleteArr = differenceWithMatch(lhs, rhs);
    const addArr = differenceWithMatch(rhs, lhs);

    const eLhs = differenceWithMatch(lhs, deleteArr);
    const eRhs = differenceWithMatch(rhs, addArr);
    const editArr = [];
    eLhs.forEach((item) => {
        const obj = eRhs.find((o) => match(o, item));
        if (!equals(obj, item)) {
            editArr.push({
                type: "E",
                lhs: item,
                rhs: obj,
            });
        }
    });

    return unnest([
        deleteArr.map((item) => ({
            type: "D",
            lhs: item,
        })),
        addArr.map((item) => ({
            type: "A",
            rhs: item,
        })),
        editArr,
    ]);
}
