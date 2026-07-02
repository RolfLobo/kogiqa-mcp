export = Yallist;
export = Yallist;
declare function Yallist(list: any, ...args: any[]): this;
declare namespace Yallist {
    export { Node };
    export { Yallist as create };
}
declare class Yallist {
    constructor(list: any, ...args: any[]);
    tail: any;
    head: any;
    length: number;
    removeNode(node: any): any;
    unshiftNode(node: any): void;
    pushNode(node: any): void;
    push(...args: any[]): number;
    unshift(...args: any[]): number;
    pop(): any;
    shift(): any;
    forEach(fn: any, thisp: any): void;
    forEachReverse(fn: any, thisp: any): void;
    get(n: any): any;
    getReverse(n: any): any;
    map(fn: any, thisp: any): Yallist;
    mapReverse(fn: any, thisp: any): Yallist;
    reduce(fn: any, initial: any, ...args: any[]): any;
    reduceReverse(fn: any, initial: any, ...args: any[]): any;
    toArray(): any[];
    toArrayReverse(): any[];
    slice(from: any, to: any): Yallist;
    sliceReverse(from: any, to: any): Yallist;
    splice(start: any, deleteCount: any, ...args: any[]): any[];
    reverse(): this;
}
