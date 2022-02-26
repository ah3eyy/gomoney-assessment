import bcrypt from 'bcrypt';

class Utils {

    async comparePassword(plain_password: string, hash_password: string) {
        return bcrypt.compareSync(plain_password, hash_password);
    }

}

export default new Utils();