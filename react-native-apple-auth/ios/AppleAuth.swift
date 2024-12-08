import Foundation
import NitroModules
import AuthenticationServices
import React


class AppleAuth : NSObject, HybridAppleAuthSpec  {
    private var authContinuation: CheckedContinuation<AppleAuthCredential?, Error>?
    
    func startSignIn(opts: AppleAuthOptions) {
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
        request.requestedOperation = setAppleAuthOperation(opts.operation)
        request.requestedScopes = setAppleAuthScopes(opts.scopes)
        request.nonce = opts.nonce
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = self
        authorizationController.presentationContextProvider = self
        
        authorizationController.performRequests()
    }
    
    func signIn(options: AppleAuthOptions) throws -> Promise<AppleAuthCredential?> {
        return Promise.async { [weak self] in
            guard let self = self else {
                return nil
            }
            
            return try await withCheckedThrowingContinuation { continuation in
                self.authContinuation = continuation
                self.startSignIn(opts: options)
            }
        }
    }
    
    var hybridContext = margelo.nitro.HybridContext()
    var memorySize: Int { getSizeOf(self) }
}

extension AppleAuth : ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
        case let appleIDCredential as ASAuthorizationAppleIDCredential:
            let credential = AppleAuthCredential(
                user: appleIDCredential.user,
                email: appleIDCredential.email ?? "",
                fullName: [
                    appleIDCredential.fullName?.givenName,
                    appleIDCredential.fullName?.familyName
                ].compactMap { $0 }.joined(separator: " "),
                authorizationCode: appleIDCredential.authorizationCode.flatMap { String(data: $0, encoding: .utf8) } as Any as? String,
                identityToken: appleIDCredential.identityToken.flatMap { String(data: $0, encoding: .utf8) } as Any as? String,
                state: appleIDCredential.state ?? ""
            )
            self.authContinuation?.resume(returning: credential)
            self.authContinuation = nil
        default:
            print("Unhandled credential: \(authorization.credential)")
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        print("Authentication failed with error: \(error.localizedDescription)")
        print("Error domain: \(error._domain)")
        print("Error code: \(error._code)")
        // ALWAYS returns std:exeception
        self.authContinuation?.resume(throwing:error)
        self.authContinuation = nil
    }
}

extension AppleAuth : ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        guard let presentingViewController = RCTPresentedViewController() else {
            for scene in UIApplication.shared.connectedScenes {
                if scene.activationState == .foregroundActive,
                   let windowScene = scene as? UIWindowScene {
                    return UIWindow(windowScene: windowScene)
                }
            }
            fatalError("No window found")
        }
        return presentingViewController.view.window!
    }
}

extension AppleAuth {
    func setAppleAuthScopes(_ scopes: [AppleAuthScopes]) -> [ASAuthorization.Scope] {
        scopes.compactMap { scope in
            switch scope {
            case .fullName: return .fullName
            case .email: return .email
            }
        }
    }
    
    func setAppleAuthOperation(_ requestOption: AppleAuthOperation?) -> ASAuthorization.OpenIDOperation {
        switch requestOption {
        case .login: return .operationLogin
        case .logout: return .operationLogout
        default: return .operationImplicit
        }
    }
}

enum AppleAuthError: Error {
    case userCancelledRequest
}

extension AppleAuthError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .userCancelledRequest: return "User cancelled request"
        }
    }
}
