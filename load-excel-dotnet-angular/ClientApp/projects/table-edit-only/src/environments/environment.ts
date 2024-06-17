// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_service: 'http://localhost:8000/api/v1/',
  messages: {
    upload_success: "The file has been uploaded",
    processed_success: "The file has been processed",
    server_error: "Error to connect with the server",
    multiple_files_error: "At the moment multiple files can not be processed",
    files_error: "No file has been loaded to process"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
