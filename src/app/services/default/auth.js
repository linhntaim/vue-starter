import {crypto, serverClock} from '../../utils'
import {APP_DEFAULT_SERVICE} from '../../config'
import DefaultService from '../default_service'

class AuthService extends DefaultService {
    login(email, password, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            'auth/login',
            {
                grant_type: 'password',
                client_id: APP_DEFAULT_SERVICE.client_id,
                client_secret: APP_DEFAULT_SERVICE.client_secret,
                username: email,
                password: password,
                scope: '*',
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    loginWithToken(email, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.e()
        this.login(
            crypto.encrypt(email, serverClock.blockKey()),
            crypto.encryptJson({source: 'token'}, serverClock.blockKey()),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    logout(doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            'auth/logout',
            {},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    refreshToken(refreshToken, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            'oauth/token',
            {
                'grant_type': 'refresh_token',
                'client_id': APP_DEFAULT_SERVICE.client_id,
                'client_secret': APP_DEFAULT_SERVICE.client_secret,
                'refresh_token': refreshToken,
                'scope': '*',
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    forgotPassword(email, appResetPasswordPath, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            'auth/password',
            {
                _forgot: 1,
                email: email,
                app_reset_password_path: appResetPasswordPath,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    getResetPassword(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params._reset = 1
        this.get(
            'auth/password',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    resetPassword(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params._reset = 1
        this.post(
            'auth/password',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const authService = () => new AuthService()
