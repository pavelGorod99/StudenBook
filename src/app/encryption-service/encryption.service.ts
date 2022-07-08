import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  $_bcrypt: any
  $_salt: any
  constructor() {
    this.$_bcrypt = require('bcryptjs')
    this.$_salt = this.$_bcrypt.genSaltSync(10)
  }

  folderPathHashing = ($_FOLDER_NAME: string) => {
    var bcrypt = require('bcryptjs')
    var salt = this.$_bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync($_FOLDER_NAME, salt)

    console.log("new hash: " + hash);
    

    if (hash.includes("/")) {

      hash = this.folderPathHashing($_FOLDER_NAME)
      console.log("new hash without slash: " + hash);
    }

    return hash
  }

  handleStringHashing ($_VALUE: string) {
    return this.$_bcrypt.hashSync($_VALUE + "\/", this.$_salt);
  }
}
