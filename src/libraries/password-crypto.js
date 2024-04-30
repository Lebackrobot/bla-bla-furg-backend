import { hash, compare, genSalt} from 'bcrypt'

const SALT_ROUNDS = 10

const encryptPassword = async (password) => {
    const genSaltGenerated = await genSalt(SALT_ROUNDS)
    return await hash(password, genSaltGenerated)
}

const verifyPassword = async (password, encrypted) => {
    return await compare(password, encrypted)
}

export { encryptPassword, verifyPassword }
