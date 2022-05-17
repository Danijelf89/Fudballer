// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const GET_FOOTBALLER_URL = 'https://localhost:44307/footballer/Getfootballers';
const DELETE_FOOTBALLER_URL = 'https://localhost:44307/footballer/DeleteFootballer/';
const UPDATE_FOOTBALLER_URL = 'https://localhost:44307/footballer/UpdateFootballer';
const ADD_FOOTBALLER_URL = 'https://localhost:44307/footballer/AddNewFootballer'

const GET_CLUBS_URL = 'https://localhost:44307/clubs/GetClubs';
const DELETE_CLUB_URL = 'https://localhost:44307/clubs/DeleteClub/';
const ADD_CLUB_URL = 'https://localhost:44307/clubs/AddNewClub';
const UPDATE_CLUB_URL ='https://localhost:44307/clubs/UpdateClub';

export const environment = {
  production: false,

  getFootballerUrl : GET_FOOTBALLER_URL,
  deleteFootballerURL : DELETE_FOOTBALLER_URL,
  addFootballerUrl : ADD_FOOTBALLER_URL,
  updateFootballerUrl : UPDATE_FOOTBALLER_URL,

  getClubsUrl : GET_CLUBS_URL,
  deleteClubUrl : DELETE_CLUB_URL,
  addClubUrl : ADD_CLUB_URL,
  updateClubUrl : UPDATE_CLUB_URL
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
