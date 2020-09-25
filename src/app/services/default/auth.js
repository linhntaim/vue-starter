/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {crypto, serverClock} from '../../utils'
import {APP_DEFAULT_SERVICE} from '../../config'
import DefaultService from '../default-service'

export class AuthService extends DefaultService {
    constructor() {
        super('auth')
    }

    login(email, password, doneCallback = null, errorCallback = null, alwaysCallback = null, extraParams = {}) {
        return this.post(
            'login',
            this.appendParams({
                grant_type: 'password',
                client_id: APP_DEFAULT_SERVICE.clientId,
                client_secret: APP_DEFAULT_SERVICE.clientSecret,
                username: email,
                password: password,
                scope: '*',
            }, extraParams),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    loginWithImpersonate(email, impersonateToken, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.e()
        return this.login(
            crypto.encrypt(email, serverClock.blockKey()),
            crypto.encryptJson({source: 'impersonate'}, serverClock.blockKey()),
            doneCallback,
            errorCallback,
            alwaysCallback,
            {
                impersonate_token: impersonateToken,
            },
        )
    }

    logout(doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            'logout',
            {},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    refreshToken(refreshToken, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            'login',
            {
                'grant_type': 'refresh_token',
                'client_id': APP_DEFAULT_SERVICE.clientId,
                'client_secret': APP_DEFAULT_SERVICE.clientSecret,
                'refresh_token': refreshToken,
                'scope': '*',
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const authService = () => new AuthService()
