import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.drivewell.app',
  appName: 'DriveWell',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // TODO: Add GPS/Location services
    Geolocation: {
      permissions: {
        location: "always"
      }
    },
    // TODO: Add push notifications
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
}

export default config