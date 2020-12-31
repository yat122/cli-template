export const on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent("on" + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const off = (function() {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent("on" + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const once = function(el, event, fn) {
    var listener = function() {
        if (fn) {
            fn.apply(this, arguments);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};

/* istanbul ignore next */
export const getStyle = function(element, styleName) {
    if (!element || !styleName) return null;
    try {
        var computed = document.defaultView.getComputedStyle(element, "");
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
};

export const isScroll = (el, vertical) => {
    const determinedDirection = vertical !== null || vertical !== undefined;
    const overflow = determinedDirection
        ? vertical
            ? getStyle(el, "overflow-y")
            : getStyle(el, "overflow-x")
        : getStyle(el, "overflow");

    return overflow.match(/(scroll|auto)/);
};

export const getScrollContainer = (el, vertical) => {
    let parent = el;
    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            return window;
        }
        if (isScroll(parent, vertical)) {
            return parent;
        }
        parent = parent.parentNode;
    }

    return parent;
};

export const isInContainer = (el, container) => {
    if (!el || !container) return false;

    const elRect = el.getBoundingClientRect();
    let containerRect;

    if ([window, document, document.documentElement, null, undefined].includes(container)) {
        containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0,
        };
    } else {
        containerRect = container.getBoundingClientRect();
    }

    return (
        elRect.top < containerRect.bottom &&
        elRect.bottom > containerRect.top &&
        elRect.right > containerRect.left &&
        elRect.left < containerRect.right
    );
};
