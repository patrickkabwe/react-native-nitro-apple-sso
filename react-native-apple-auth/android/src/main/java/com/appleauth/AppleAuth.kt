
package com.appleauth

import com.margelo.nitro.appleauth.AppleAuthCredential
import com.margelo.nitro.appleauth.AppleAuthOptions
import com.margelo.nitro.appleauth.HybridAppleAuthSpec

import com.margelo.nitro.core.Promise

class AppleAuth: HybridAppleAuthSpec() {
    override val memorySize: Long
        get() = 5

    override fun signIn(options: AppleAuthOptions): Promise<AppleAuthCredential?> {
        return Promise.async {
            return@async AppleAuthCredential(
                fullName = "Patrick",
                identityToken = "",
                user = "",
                state = "",
                email = "",
                authorizationCode = ""
            )
        }
    }
}