/* eslint-disable @typescript-eslint/no-var-requires */
const path = require(`path`);
const WebpackBar = require('webpackbar');
const CracoLessPlugin = require('craco-less-fix');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            ...getThemeVariables({
                                dark: true,
                                compact: false,
                            }),
                            '@primary-color': '#006e7a',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        plugins: [new WebpackBar({ profile: true, fancy: true })],
        configure: (webpackConfig) => {
            return {
                ...webpackConfig,
                ignoreWarnings: [/Failed to parse source map/],
            };
        },
        
    },
};