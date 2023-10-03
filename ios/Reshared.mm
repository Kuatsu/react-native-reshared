#import <React/RCTBridgeModule.h>
#import <Photos/Photos.h>

@interface RCT_EXTERN_MODULE(Reshared, NSObject)

RCT_EXTERN_METHOD(getFileNames:(NSString)url resolver:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(clearFileNames)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
