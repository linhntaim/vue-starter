/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {crypto, serverClock} from '../../../utils'
import {AdminService} from '../admin'
import {APP_DEFAULT_SERVICE} from '../../../config'

export class AuthService extends AdminService {
    constructor() {
        super('auth')
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

    logout(doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            'logout',
            {},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
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

    loginSocially(provider, providerId, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.e()
        return this.login(
            crypto.encryptJson({provider: provider, provider_id: providerId}, serverClock.blockKey()),
            crypto.encryptJson({source: 'social'}, serverClock.blockKey()),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    loginOther(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.e()
        return this.login(
            crypto.encryptJson(params, serverClock.blockKey()),
            crypto.encryptJson({source: 'other'}, serverClock.blockKey()),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    register(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            'register',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    registerSocially(provider, providerId, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.register(
            this.appendParams(params, {
                _social: 1,
                provider: provider,
                provider_id: providerId,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}