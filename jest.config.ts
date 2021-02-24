import { resolve } from 'path'
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  timers: 'fake',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  testRegex: '(/__tests__/.*|(\\.|/)(spec)).tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^@src/(.*)$': resolve(__dirname, './src/$1'),
    '^@config/(.*)$': resolve(__dirname, './src/config/$1')
  }
}
export default config
