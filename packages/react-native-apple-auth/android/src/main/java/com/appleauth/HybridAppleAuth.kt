package com.appleauth

import com.margelo.nitro.appleauth.HybridAppleAuthSpec

class HybridAppleAuth: HybridAppleAuthSpec() {
    override val memorySize: Long
        get() = 5
}