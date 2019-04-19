const getUserPath = {
  _getOneUser: { method: 'GET',  url: 'users{/username}'},
  _getUserFollowers: { method: 'GET',  url: 'users{/username}/followers'}
}

export default class Service {

  constructor(resource){
    this._resource = resource('', {}, getUserPath);
  }

  getOneUser(username){
    return this._resource
      ._getOneUser( { username } )
      .then( res => res, err => err );
  }

  getUserFollowers(username){
    return this._resource
      ._getUserFollowers( { username } )
      .then( res => res, err => err );
  }

}
