package com.appleauth

import com.margelo.nitro.appleauth.AppleAuthCredential
import com.margelo.nitro.appleauth.AppleAuthOptions
import com.margelo.nitro.appleauth.HybridAppleAuthSpec
import com.margelo.nitro.core.Promise

class HybridAppleAuth : HybridAppleAuthSpec() {
    override fun signIn(options: AppleAuthOptions): Promise<AppleAuthCredential?> {
        return Promise.async {
            null
        }
    }
}
