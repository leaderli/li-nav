/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globals: {
        // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [151001]
            }
        }
    },
    setupFiles: ['./jest.setup.js'],
    preset: 'ts-jest',
    testPathIgnorePatterns: ['/node_modules/', 'dist'],
    modulePathIgnorePatterns: ['/node_modules/', 'dist'],
    testEnvironment: 'jsdom',

    // 文件需要进行转换才能执行测试
    transform: {
        '\\.ts$': 'ts-jest',
        '^.+\\.vue$': 'vue3-jest',
        "\\.(css|jpg|png)$": "jest-transform-stub"

    },
    // 仅执行特定格式的测试文件
    testMatch: [
        '**/__tests__/**/*.spec.ts',
    ],
    moduleFileExtensions: ['ts', 'js', 'json'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', //用于解决alias
        "\\.(css|jpg|png)$": "jest-transform-stub"

    },
    roots: ['<rootDir>/src'] //  测试文件根目录
};

