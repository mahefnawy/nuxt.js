import { exec } from 'child_process'
import { resolve } from 'path'
import { promisify } from 'util'

const execify = promisify(exec)
const rootDir = __dirname
const nuxtBin = resolve(__dirname, '..', '..', '..', 'bin', 'nuxt')

describe('cli', () => {
  test('nuxt build', async () => {
    const { stdout } = await execify(`node ${nuxtBin} build ${rootDir}`)

    expect(stdout.includes('Compiled successfully')).toBe(true)
  })

  test('nuxt build -> error config', async () => {
    await expect(execify(`node ${nuxtBin} build ${rootDir} -c config.js`)).rejects.toMatchObject({
      stdout: expect.stringContaining('Could not load config file: config.js')
    })
  })

  test('nuxt generate', async () => {
    const { stdout } = await execify(`node ${nuxtBin} generate ${rootDir}`)

    expect(stdout.includes('Generated successfully')).toBe(true)
  })
})
