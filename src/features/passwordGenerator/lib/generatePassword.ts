import {DIGITS, LOWER, SYMBOLS, UPPER} from "@/features/passwordGenerator/lib/charsets.ts";
import type {PasswordOptions} from "@/features/passwordGenerator";
import {shuffle} from "@/features/passwordGenerator/lib/shuffle.ts";

function randomIndex(max: number) {
    return Math.floor(Math.random() * max)
}

function buildPools(opts: PasswordOptions) {
    const pools: string[] = [];

    const add = (s: string) => {
        if (s.length) pools.push(s)
    }

    if (opts.digits) add(DIGITS);
    if (opts.symbols) add(SYMBOLS);
    if (opts.lower) add(LOWER);
    if (opts.upper) add(UPPER);
    if (opts.customCharset) add(opts.customCharset);
    if (opts.randomReg) {
        add(LOWER);
        add(UPPER);
    }

    const combined = pools.join('');
    if (!combined.length) throw new Error("Выберите хотя бы один набор");

    return {pools, combined};
}

function generatePassword(opts: PasswordOptions) {
    const length = opts.length;
    const {pools, combined} = buildPools(opts);

    const out: string[] = [];

    for (const p of pools) {
        out.push(p[randomIndex(p.length)])
    }

    while (out.length < length) {
        out.push(combined[randomIndex(combined.length)]);
    }

    shuffle(out);

    return out.join('');
}

export {generatePassword};