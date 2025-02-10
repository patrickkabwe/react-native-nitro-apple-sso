import { type HybridObject } from 'react-native-nitro-modules';
import type { AppleAuthCredential, AppleAuthOptions } from '../types';


export interface AppleAuth
    extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
    signIn(options: AppleAuthOptions): Promise<AppleAuthCredential | null>
}