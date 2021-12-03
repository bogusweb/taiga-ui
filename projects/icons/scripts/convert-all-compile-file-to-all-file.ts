import {rollup, RollupOptions} from 'rollup';
import typescript from 'rollup-plugin-typescript2';

import {rollupSvgo} from './rollup-svgo';

const banner = `
/**
 * @description:
 * DO NOT CHANGE THIS FILE. AUTOGENERATED
 */
`;

interface Options {
    cacheRoot?: string;
    from: string;
    to: string;
}

export async function convertAllCompileFileToAllFile(config: Options): Promise<void> {
    const {from, to, cacheRoot} = config;

    const inputOptions: RollupOptions = {
        input: from,
        output: {preferConst: true},
        plugins: [
            typescript({cacheRoot: cacheRoot ?? 'node_modules/.cache/.rpt2_cache'}),
            rollupSvgo({
                include: '**/*.svg',
                options: {
                    plugins: [
                        {removeViewBox: false},
                        {collapseGroups: false},
                        {cleanupIDs: false},
                        {removeUnknownsAndDefaults: false},
                    ],
                },
            }),
        ],
    };

    const bundle = await rollup(inputOptions);

    await bundle.write({
        banner,
        file: to,
        format: 'es',
        preferConst: true,
    });
}