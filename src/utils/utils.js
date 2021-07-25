const crypto = require('crypto')

const salt = 'wuhuAirlines'

export function pwdHash(pwd){
    let saltP = pwd+salt
    let md5 = crypto.createHash('md5')

    return md5.update(saltP).digest('hex')
}

