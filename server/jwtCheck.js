import jwtCheck from 'express-jwt';

export default () => {
    return jwtCheck({
        secret: process.env.SECRET || 'SecretWord'
    })
}
