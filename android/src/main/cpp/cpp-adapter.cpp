#include <jni.h>
#include "AppleAuthOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::appleauth::initialize(vm);
}
