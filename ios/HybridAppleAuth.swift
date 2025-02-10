//
//  HybridAppleAuth.swift
//  Pods
//
//  Created by Patrick Kabwe on 09/02/2025.
//

import Foundation
import NitroModules
import AuthenticationServices


class HybridAppleAuth: HybridAppleAuthSpec  {
    private let appleAuthService: AppleAuthServiceProtocol? = AppleAuthService()
    
    func signIn(options: AppleAuthOptions) throws -> Promise<AppleAuthCredential?> {
        return Promise.async { [weak self] in
            guard let self = self else {
                throw AppleAuthError.unknown
            }
            
            do {
                return try await appleAuthService?.signIn(options: options)
            } catch {
                guard let authError = error as? ASAuthorizationError else {
                    throw error
                }
                throw authError
            }
        }
    }
}
