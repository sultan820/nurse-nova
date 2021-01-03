//#import "AppDelegate.h"
//
//#import <React/RCTBridge.h>
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
////#import <RNCPushNotificationIOS.h>
//#import <Firebase.h>
//
//#if DEBUG
//#import <FlipperKit/FlipperClient.h>
//#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
//
//
//static void InitializeFlipper(UIApplication *application) {
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin:[FlipperKitReactPlugin new]];
//  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//}
//#endif
//
//@implementation AppDelegate
//
//// Required to register for notifications
////- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
////{
//// [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
////}
//// Required for the register event.
////- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
////{
//// [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
////}
//// Required for the notification event. You must call the completion handler after handling the remote notification.
////- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
////fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
////{
////  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
////}
//// Required for the registrationError event.
////- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
////{
//// [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
////}
//// IOS 10+ Required for localNotification event
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////         withCompletionHandler:(void (^)(void))completionHandler
////{
////  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
////  completionHandler();
////}
//// IOS 4-10 Required for the localNotification event.
////- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
////{
//// [RNCPushNotificationIOS didReceiveLocalNotification:notification];
////}
////Called when a notification is delivered to a foreground app.
////-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
////{
////  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
////}
//- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
//{
//
//#if DEBUG
//  InitializeFlipper(application);
//#endif
//  if ([FIRApp defaultApp] == nil) {
//    [FIRApp configure];
//  }
////  NSDictionary *appProperties = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];
////   [FIRApp configure];
////  [FIRMessaging messaging].delegate = self;
////  if ([UNUserNotificationCenter class] != nil) {
////    // iOS 10 or later
////    // For iOS 10 display notification (sent via APNS)
////    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
////    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
////        UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
////    [[UNUserNotificationCenter currentNotificationCenter]
////        requestAuthorizationWithOptions:authOptions
////        completionHandler:^(BOOL granted, NSError * _Nullable error) {
////          // ...
////        }];
////  } else {
////    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
////    UIUserNotificationType allNotificationTypes =
////    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
////    UIUserNotificationSettings *settings =
////    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
////    [application registerUserNotificationSettings:settings];
////  }
//
////  [application registerForRemoteNotifications];
////
////  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
////  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
////                                                   moduleName:@"NurseNova"
////                                            initialProperties:appProperties];
////
////  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
////
////  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
////  UIViewController *rootViewController = [UIViewController new];
////  rootViewController.view = rootView;
////  self.window.rootViewController = rootViewController;
////  [self.window makeKeyAndVisible];
////  // Define UNUserNotificationCenter
////  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
////  center.delegate = self;
//  return YES;
//}
//
////- (void)applicationWillResignActive:(UIApplication *)application {
////    // fill screen with our own colour
////    UIView *colourView = [[UIView alloc]initWithFrame:self.window.frame];
////    colourView.backgroundColor = [UIColor whiteColor];
////    colourView.tag = 1234;
////    colourView.alpha = 0;
////    [self.window addSubview:colourView];
////    [self.window bringSubviewToFront:colourView];
////    // fade in the view
////    [UIView animateWithDuration:0.5 animations:^{
////        colourView.alpha = 1;
////    }];
////}
//
////- (void)applicationDidBecomeActive:(UIApplication *)application {
////    // grab a reference to our coloured view
////    UIView *colourView = [self.window viewWithTag:1234];
////    // fade away colour view from main view
////    [UIView animateWithDuration:0.5 animations:^{
////        colourView.alpha = 0;
////    } completion:^(BOOL finished) {
////        // remove when finished fading
////        [colourView removeFromSuperview];
////    }];
////}
//
////- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
////{
////#if DEBUG
////  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
////#else
////  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
////#endif
////}
//
//
////- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
////  <#code#>
////}
//
//@end
//
//
//
//
//
//
//
//
//

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"NurseNova"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
