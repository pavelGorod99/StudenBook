import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import { Md5 } from "md5-typescript";
import * as fs from 'fs'
import { EncryptionService } from 'src/app/encryption-service/encryption.service';

declare var countryCode: any;
declare var getPhoneNumberCountryCode: any;

@Component({
  selector: 'app-registration-page1',
  templateUrl: './registration-page1.component.html',
  styleUrls: ['./registration-page1.component.css']
})

export class RegistrationPage1Component implements OnInit {

  $regUniverCountryLocation_ERR = ''
  $regUcvLocation_ERR = ''

  $regScLocation_ERR = ''
  $regScvLocation_ERR = ''

  // GENERAL

  $regName_ERR = ''
  $regSurname_ERR = ''
  $regEmail_ERR = ''
  $regPass_ERR = ''
  $_REG_REPEAT_PASS_ERR = ''
  $_REG_DAY_BERR = ''
  $_REG_MON_BERR = ''
  $_REG_YER_BERR = ''
  $regUserExistsErr = ''

  $_REG_HL_COUNTRY_ERR = ''
  $_REG_HL_CITYVILL_ERR = ''

  $_REG_I_AGREE_ERR = ''

  $regName = ''
  $regSurname = ''
  $regEmail = ''
  $regPass = ''
  $_REG_REPEAT_PASS = ''

  $regDbDay = 'day'
  $regDbMonth = 'mon'
  $regDbYear = 'year'
  $regBirthDate = ''

  $regGender = ''
  $regHomeCountry = 'country'
  $regHomeCity = 'city or village'
  $regRole = ''

  // LABELS

  $dateBirthLabel = 'Date of birth'
  $genderLabel = "Gender"
  $homeLocationLabel = "Home location"
  $roleLabel = "Your role"

  // STUDENT STRUC

  $regUniverCountryLocation = 'country'
  $regUcvLocation = 'city or village'

  $regUName = 'university'
  $regUFaculty = 'faculty'
  $regUTypeOfStudy = -1
  $regUSpecialization = 'specialization'
  $regUDomanian = 'domanian'
  $regUYearOfStudy = 'year'

  // LABELS

  $univLocationLabel = "University location"
  $univNameLabel = "University name"
  $faclNameLabel = "Faculty name"
  $typeOfStudyLabel = "Type of study"
  $specNameLabel = "Specialization name"
  $domNameLabel = "Domanian name"
  $ysLabel = "Year of studying"

  // SCHOOLCHILD STRUC

  $regScLocation = 'country'
  $regScvLocation = 'city or village'

  $regSchoolName = 'school'
  $regSchoolClassIn = 'class_in'

  $schoolLocationLabel = "School location"
  $schoolNameLabel = "School name"
  $classAreYouInLabel = "Class are you in"

  // TEACHER

  $schoolWorkLocationLabel = "School location"
  $universityWorkLocationLabel = "University location"

  $_REG_SW = 'school'
  $_REG_UW = 'university'
  $regSuw = ''

  $_REG_T_SCHOOL_W_LABEL = "School location"
  $_REG_T_SC_LOC_ERR = ""
  $_REG_T_SCV_LOC_ERR = ""

  $regScwLoc = 'country'
  $regScvwLoc = 'city or village'

  $regUcwLoc = 'country'
  $regUcvwLoc = 'city or village'

  $ucvwIsDisabled = true

  $sclvwIsDisabled = true
  $snwIsDisabled = true
  $unwIsDisabled = true

  $_TRS_is_DISABLED = true

  $regSwName = 'schoolNameWork'
  $regUwName = 'univNameWork'

  $regRoleInSchool = ''


  $days = new Array(31).fill(1).map((x, i) => i + 1)

  // $months = new Array(12).fill(1).map((x, i) => i + 1)
  $months = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ]

  $years = new Array((new Date()).getFullYear() - 1899).fill(0).map((x, i) => i + 1900)

  $ys = new Array()
  // $ys_AUX = 0

  $classes = new Array()

  $countryList = new Array()
  $cityList = new Array()

  $citySuList = new Array()
  $_CITY_CU_LIST = new Array()
  $_CITY_TU_LIST = new Array()
  $_CITY_TS_LIST = new Array()

  $universityList = new Array()
  $_FACULTY_LIST = new Array()
  $specializationList = new Array()

  $schoolList = new Array()

  $submit = true

  $hideUniversityStruc = true
  $hideSchoolStruc = true
  $hideTeacherStruc = true

  $hideSpecStruc = true
  $hideDomnStruc = true

  $hideYsStruc = true

  $hideSwStruc = true
  $hideUwStruc = true

  $BdIsDisabled = true
  $BmIsDisabled = true
  $ByIsDisabled = true

  $genderIsDisabled = true
  $HlcIsDisabled = true
  $HlcvIsDisabled = true
  $roleIsDisabled = true

  // $_HIDE_B_PROGRAM = false
  // $_HIDE_M_PROGRAM = false
  $hideDoctorateProgram = false

  $ulcvIsDisabled = true
  $unIsDisabled = true
  $ufIsDisabled = true
  $utsIsDisabled = true
  $usyIsDisabled = true

  $slcvIsDisabled = true
  $snIsDisabled = true
  $sciIsDisabled = true

  $regAgree = false

  $_AUX_HC = ''

  $_AUX_UC = ''

  $_AUX_UCV = ''

  $_AUX_U = ''

  $_AUX_F = ''

  $_AUX_SC = ''
  $citySchList = new Array()
  
  $_AUX_SCHCV = ''

  $_AUX_SCH = ''

  $_AUX_SCHTC = ''
  $citySchTList = new Array()

  $_AUX_TCH_SCH_CV = ''

  $_REG_ITSR_ERR = ''

  $_AUX_UNIVTC = ''
  $cityUnivTList = new Array()

  $_AUX_UNIV_T_CV = ''
  $regRoleInUniversity = ''
  $_TRU_is_DISABLED = true

  $regIturErr = ''

  $regTeachPwLabel = 'Place of work'

  $teachRsLabel = 'Role in school'
  $teachRuLabel = 'Role in university'
 
  public isTheNextStep: boolean = false;
  constructor(private registrationService:RegistrationService, private route: Router, private hashService: EncryptionService) {}

  ngOnInit(): void {
    this.fillCountryList()

    this.registrationService.test()
      .subscribe(data => {
        console.error(data);
      })

    this.registrationService.helloPut()
      .subscribe(data => {
        console.log(data);
      })

    this.registrationService.helloPost()
      .subscribe(data => {
        console.log(data);
      })
  }

  @Output() step1CompleteEvent = new EventEmitter<boolean>()
  step1Complete() {
    this.step1CompleteEvent.emit(true)
  }

  $submitLabelErr = false

  setColorStyleForWarningElement(ID: string) {
    let $_ELEMENT = <HTMLElement>document.getElementById(ID)
    $_ELEMENT.style.color = 'red'
  }

  setErrorLabel($idElem:string, $text:string) {
    $($idElem).html($text); 
    $($idElem).addClass('errorColor')
  }

  setNormalLabel($idElem:string, $text:string) {
    $($idElem).html($text); 
    $($idElem).removeClass('errorColor')
  }

  submit() {

    console.log("===========SUBMIT==========");
    
    this.$submit = this.$submitLabelErr = true;

    if (this.$regName == '') { 
      this.setErrorLabel('#inputNameLabel', '* Name')
      this.$submit = false 
    } else {
      this.checkNameForLength()
    }
      
    console.log("Name: " + this.$regName);

    if (this.$regSurname == '') { 
      this.setErrorLabel('#inputSurnameLabel', '* Surname')
      this.$submit = false 
    } else {
      this.checkSurnameForLength()
    }
    console.log("Surname: " + this.$regSurname);
    
    if (this.$regEmail == '') { 
      this.setErrorLabel('#inputEmailLabel', '* Email address')
      this.$submit = false 
    } else {
      this.setNormalLabel('#inputEmailLabel', 'Email address')
    }
    console.log("Email: " + this.$regEmail);

    if (this.$regPass == '') { 
      this.setErrorLabel('#inputPassLabel', '* Password') 
      this.$submit = false 
    } else {
      this.setNormalLabel('#inputPassLabel', 'Password') 
    }
    console.log("Password: " + this.$regPass);
    
    if (this.$regPhoneNumber == '') { 
      this.setErrorLabel('#inputPhoneNumber', '* Phone number') 
      this.$submit = false 
    } else {
      this.setNormalLabel('#inputPhoneNumber', 'Phone number')
    }
    console.log("Phone number: " + this.$regPhoneNumber);

    if (this.$regDbDay == 'day' || this.$regDbMonth == 'mon' || this.$regDbYear == 'year') { 
      this.setErrorLabel('#birthDateLabel', '* Birth date') 
      this.$submit = false 
    } else {
      this.setNormalLabel('#birthDateLabel', 'Birth date')
    }
    console.log("Birth day: " + this.$regDbDay + "/" + this.$regDbMonth + "/" + this.$regDbYear);
    
    if (this.$regGender == '') {
      this.setErrorLabel('#genderLabel', '* Gender')
      this.$submit = false 
    } else {
      this.setNormalLabel('#genderLabel', 'Gender')
    }
    console.log("Gender: " + this.$regGender);
    
    if (this.$regHomeCountry == 'country' || this.$regHomeCity == 'city or village') { 
      this.setErrorLabel('#homeLocationLabel', '* Home location')
      this.$submit = false 
    } else {
      this.setNormalLabel('#homeLocationLabel', 'Home location')
    }
    console.log("Home Country: " + this.$regHomeCountry)
    console.log("Home city: " + this.$regHomeCity);

    if (this.$regRole == '') { 
      this.setErrorLabel('#roleLabel', '* Your role')
      this.$submit = false
    } else {
      
      this.setNormalLabel('#roleLabel', 'Your role')

      if (this.$regRole == 'student') {
        console.log("Role as student");
        
        if (this.$regUniverCountryLocation == 'country' || this.$regUcvLocation == 'city or village') { 
          this.setErrorLabel('#universityLocationLabel', '* University location')
          this.$submit = false 
        } else {
          this.setNormalLabel('#universityLocationLabel', 'University location')
        }
        console.log("University country: " + this.$regUniverCountryLocation);
        console.log("University city: " + this.$regUcvLocation);
        
        if (this.$regUName == 'university') { 
          this.setErrorLabel('#universityNameLabel', '* University name')
          this.$submit = false 
        } else {
          this.setNormalLabel('#universityNameLabel', 'University name')
        }
        console.log("University name: " + this.$regUName);
        
        if (this.$regUFaculty == 'faculty') {
          this.setErrorLabel('#facultyNameLabel', '* Faculty name')
          this.$submit = false 
        } else {
          this.setNormalLabel('#facultyNameLabel', 'Faculty name')
        }
        console.log("University faculty: " + this.$regUFaculty);

        if (this.$regUTypeOfStudy == -1) { 
          this.setErrorLabel('#typeOfStudyLabel', '* Type of study')
          this.$submit = false
        } else {
          this.setNormalLabel('#typeOfStudyLabel', 'Type of study')
        }
        console.log("University programm: " + this.$regUTypeOfStudy);

        if (this.$regUTypeOfStudy == 1 || this.$regUTypeOfStudy == 2) {
          
          if (this.$regUSpecialization == '') { 
            this.setErrorLabel('#specializationNameLabel', '* Specialization name')
            this.$submit = false 
          } else {
            this.setNormalLabel('#specializationNameLabel', 'Specialization name')
          }

          console.log("University specialization: " + this.$regUSpecialization);
        } else if (this.$regUTypeOfStudy == 3) {

          if (this.$regUDomanian == '') {
            this.setErrorLabel('#domanianNameLabel', '* Domenian name')
            this.$submit = false 
          } else {
            this.setNormalLabel('#domanianNameLabel', 'Domenian name')
          }
          console.log("University domanian: " + this.$regUDomanian);
        }
          
        if (this.$regUYearOfStudy == '') {
          this.setErrorLabel('#yeLabel', '* Year of studying')
          this.$submit = false 
        } else {
          this.setNormalLabel('#yeLabel', 'Year of studying')
        }
        console.log("Year of study: " + this.$regUYearOfStudy);

      } else if (this.$regRole == 'schoolchild') {

        if (this.$regScLocation == '' || this.$regScvLocation == '') { ; 
          this.setErrorLabel('#schoolLocationLabel', '* School location')
          this.$submit = false 
        } else {
          this.setNormalLabel('#schoolLocationLabel', 'School location')
        }
        console.log("School country: " + this.$regScLocation);

        console.log("School city: " + this.$regScvLocation);
        
        if (this.$regSchoolName == '') { 
          this.setErrorLabel('#schoolLabelName', '* School name')
          this.$submit = false 
        } else {
          this.setNormalLabel('#schoolLabelName', 'School name')
        }
        console.log("School name: " + this.$regSchoolName);

        if (this.$regSchoolClassIn == '') { 
          this.setErrorLabel('#classAreYouInLabel', '* Class are you in')
          this.$submit = false 
        } else {
          this.setNormalLabel('#classAreYouInLabel', 'Class are you in')
        }
        console.log("what grade are you in? " + this.$regSchoolClassIn);

      } else {

        if (this.$regSuw == '') {
          this.setErrorLabel('#teachPlaceRorkLabel', '* Place of work')
          this.$submit = false 
        }
        else {
          console.log("Place of work: " + this.$regSuw);

          this.setNormalLabel('#teachPlaceRorkLabel', 'Place of work')

          if (this.$regSuw == 'school_w') {

            if (this.$regScwLoc == '' || this.$regScvwLoc == '') { 
              this.setErrorLabel('#schoolWorkLocationLabel', '* School location')
              this.$submit = false 
            } else {
              this.setNormalLabel('#schoolWorkLocationLabel', 'School location')
            }
            console.log("School country: " + this.$regScwLoc);

            console.log("School city: " + this.$regScvwLoc);

            if (this.$regSwName == '') {
              this.setErrorLabel('#schoolNameLabel', '* School name')
              this.$submit = false 
            } else {
              this.setNormalLabel('#schoolNameLabel', 'School name')
            }
            console.log("School name: " + this.$regSwName);

            if (this.$regRoleInSchool == '') {
              this.setErrorLabel('#teachRsLabel', '* Role in school')        
              this.$submit = false 
            } else {
              this.setNormalLabel('#teachRsLabel', 'Role in school')
            }
            console.log("Position at school: " + this.$regRoleInSchool);
          } else {

            if (this.$regUcwLoc == '' || this.$regUcvwLoc == '') {
              this.setErrorLabel('#universityWorkLocationLabel', '* University location') 
              this.$submit = false 
            } else {
              this.setNormalLabel('#universityWorkLocationLabel', 'University location')
            }
            console.log("University country: " + this.$regUcwLoc);

            console.log("University city: " + this.$regUcvwLoc);

            if (this.$regUwName == '') { 
              this.setErrorLabel('#universityWorkNameLabel', '* University name') 
              this.$submit = false 
            } else {
              this.setNormalLabel('#universityWorkNameLabel', 'University name')
            }
            console.log("University name: " + this.$regUwName);

            if (this.$regRoleInUniversity == '') { 
              this.setErrorLabel('#teachRuLabel', '* Role in university') 
              this.$submit = false 
            } else {
              this.setNormalLabel('#teachRuLabel', 'Role in university') 
            }
            console.log("Position at university: " + this.$regRoleInUniversity);
          }
        }
      }
    }

    if (!this.$regAgree) { 
      
      this.setErrorLabel('#termsCond', '* I agree with Terms and Conditions')
      this.$submit = false 
    } else {
      this.setNormalLabel('#termsCond', 'I agree with Terms and Conditions')
    }
    console.log("I agree: " + this.$regAgree);

    let $query = ''

    // let $_path_temp = 'temp'
    // let $_path_user = 'user'
    // let $_user_avatar_folder = 'avatar'
    let $_user_folder = this.$regName + '$' + this.$regSurname + '$' + this.$regEmail + '$' + this.$regPass

    var bcrypt = require('bcryptjs')
    var salt = bcrypt.genSaltSync(10)
    
    console.log("temp path hashing");
    
    // var $_hashed_path_temp = this.hashService.folderPathHashing($_path_temp)
    // bcrypt.hashSync($_path_temp + "\/", salt)
    // Md5.init($_path_temp) 
    //bcrypt.hashSync($_path_temp + "\/", salt)
    console.log("user path hashing");
    // var $_hashed_path_user = this.hashService.folderPathHashing($_path_user)
    // bcrypt.hashSync($_path_user + "\/", salt)
    // Md5.init($_path_user) 
    //bcrypt.hashSync($_path_user + "\/", salt)
    console.log("user avatar path hashing");
    // var $_hashed_user_avatar_folder = this.hashService.folderPathHashing($_user_avatar_folder)
    // bcrypt.hashSync($_user_avatar_folder + "\/", salt)
    // Md5.init($_user_avatar_folder)

    var $hashedUserFolder = this.hashService.folderPathHashing($_user_folder)
    // bcrypt.hashSync($_user_folder + "\/", salt)
    // Md5.init($_user_folder) 
    //bcrypt.hashSync($_user_folder + "\/", salt)

    // console.log("$_hashed_path_temp: " + $_hashed_path_temp);

    // console.log("$_hashed_path_user: " + $_hashed_path_user);
    
    console.log("$_hasher_user_folder: " + $hashedUserFolder);

    console.log("AFTER HASHING");

    // console.log(new getPhoneNumberCountryCode());
    new getPhoneNumberCountryCode()

    console.log("countryCode " + countryCode);

    

    
    

    // var fs = require('fs');

    // let $_SERVER_PATH_API = "/StudentBook/api/"

    // if (fs.existsSync($_SERVER_PATH_API)) {
    //   console.log("folder exists");
      
    // } else console.log("folder doesnt exist");
    // this.step1CompleteEvent.emit(true)
    // this.$submit = false
    if (this.$submit) {
      var spinner = document.getElementById('loadingDataSpinner')
      if (spinner) {
        spinner.style.setProperty('display', 'flex', 'important')
      }
      console.log("AFTER SUBMIT");

      this.$regBirthDate = this.$regDbYear + "-" + this.$regDbMonth + "-" + this.$regDbDay;
      console.log("date: " + this.$regBirthDate);

      // $query = "SELECT COUNT(ID) FROM user WHERE Email='" + this.$regEmail + "' AND Active=1;";
      this.registrationService.checkIfUserExists(this.$regEmail)
        .subscribe((data: any) => {
          console.log(data);
          if (data[0]["COUNT(ID)"] == 1) {
            if (spinner) {
              spinner.style.setProperty('display', 'none', 'important')
            }
            this.setErrorLabel('#_ia' , '* User with this email already exists! Please use another email')
          } else {

            this.setNormalLabel('#_ia' , '')
            // var bcrypt = require('bcryptjs')
            // var salt = bcrypt.genSaltSync(10)
            this.$regPass = bcrypt.hashSync(this.$regPass, salt)
            console.log("pass: " + this.$regPass);
            // let $_PASSWORD = hash

            // let dateOfRegistration = new Date()

            this.$regPhoneNumber = countryCode + '' + this.$regPhoneNumber

            // $query = "INSERT INTO `user`(`Name`, `Surname`, `Email`, `phone_number`, `Password`, `Date_birth`, `Gender`, `Entered_date`, `Country`, `City`, `Avatar_Path`, `Active`, `Status`) VALUES " + 
            //                                 "('" + this.$regName + "','" + 
            //                                        this.$regSurname + "','" + 
            //                                        this.$regEmail + "','" +
            //                                        this.$regPhoneNumber + "','" +
            //                                        this.$regPass + "','" + 
            //                                        this.$regBirthDate + "','" + 
            //                                        this.$regGender + "','" + 
            //                                        dateOfRegistration.getFullYear() + "-" + 
            //                                        (dateOfRegistration.getUTCMonth() + 1) + "-" + 
            //                                        dateOfRegistration.getDate() + "'," + 
            //                                        this.$regHomeCountry + "," + 
            //                                        this.$regHomeCity + ",'" + $hashedUserFolder + "',0,0)"
            // console.log("insert user: " + $query);
            let userDetails = {
              name: this.$regName,
              surname: this.$regSurname,
              email: this.$regEmail,
              phoneNumber: this.$regPhoneNumber,
              pass: this.$regPass,
              birthDate: this.$regBirthDate,
              gender: this.$regGender,
              country: this.$regHomeCountry,
              city: this.$regHomeCity,
              photoAvatar: $hashedUserFolder
            }
                                      
            // insertData($query)
            this.registrationService.createObject(userDetails, 'create_user')
              .subscribe((data) => {

                console.log(data);
                

                // var $_RELATIVE_PATH = $_hashed_path_temp + '/' + $_hashed_path_user

                // localStorage.setItem('hashed_user_folder', String($hashedUserFolder))

                // console.log("USER FOLDER: " + JSON.stringify(user_folder));
                // localStorage.setItem('user_folder', String(user_folder))
                localStorage.setItem('user_mail', this.$regEmail)
                localStorage.setItem('user_name', this.$regName)
                localStorage.setItem('hashed_user_folder', $hashedUserFolder)

                // $query = "SELECT ID FROM user WHERE Email='" + this.$regEmail + "'";
                
                if (this.$regRole == 'student') {

                  this.registrationService.getUserIDByEmail(this.$regEmail)
                    .subscribe((data: any) => {
                      console.log("user id: " + JSON.stringify(data));
                      
                      // $query = "INSERT INTO `student`(`Id_User`, `Id_Country`, `Id_City`, `Id_University`, `Id_Faculty`, `Id_TypeOfStudy`, `Id_Specialization`, `Year_of_studying`) VALUES " +
                      //                               "(" + data.ID + "," + this.$regUniverCountryLocation + "," + this.$regUcvLocation + "," + this.$regUName + "," + this.$regUFaculty + "," + this.$regUTypeOfStudy + "," + this.$regUSpecialization + "," + this.$regUYearOfStudy + ")"
                      // console.log($query);
                      let studentDetails = {
                        userId: data[0].ID,
                        countryId: this.$regUniverCountryLocation,
                        cityId: this.$regUcvLocation,
                        universityId: this.$regUName,
                        facultyId: this.$regUFaculty,
                        typeOfStudyId: this.$regUTypeOfStudy,
                        specializationId: this.$regUSpecialization,
                        yearOfStudy: this.$regUYearOfStudy
                      }

                      this.registrationService.createObject(studentDetails, 'create_student')
                        .subscribe(() => {
                          this.step1CompleteEvent.emit(true)
                        })
                    })
                } else if (this.$regRole == 'schoolchild') {

                  this.registrationService.getUserID($query)
                    .subscribe((data: any) => {
                
                      // $query = "INSERT INTO `schoolchild`(`Id_User`, `Id_Country`, `Id_cityVillage`, `Id_School`, `School_year`) VALUES " + 
                      //                                   "(" + data["ID"] + ",'" + this.$regScLocation +"','" + this.$regScvLocation + "','" + this.$regSchoolName + "'," + this.$regSchoolClassIn + ")"
                      // console.log("choolchild query: " + $query)
                      let schoolKidDetails = {
                        userId: data[0].ID,
                        countryId: this.$regScLocation,
                        cityId: this.$regScvLocation,
                        schoolId: this.$regSchoolName,
                        schoolYear: this.$regSchoolClassIn
                      }

                      this.registrationService.createObject(schoolKidDetails, 'create_school_kid')
                        .subscribe(() => {
                          this.step1CompleteEvent.emit(true)
                        })
                    })
                } else {

                  this.registrationService.getUserID($query)
                    .subscribe((data: any) => {

                      if (this.$regSuw == 'school_w') {
                        // $query = "INSERT INTO `school_teacher`(`Id_User`, `Id_Country`, `Id_City`, `Id_School`, `Role_in_school`) VALUES " + 
                        //                                       "(" + data["ID"] + "," + this.$regScwLoc + "," + this.$regScvwLoc + "," + this.$regSwName + ",'" + this.$regRoleInSchool + "')"
                        // console.log("school teacher: " + $query);

                        let schoolTeacherDetails = {
                          userId: data[0].ID,
                          countryId: this.$regScwLoc,
                          cityId: this.$regScvwLoc,
                          schoolId: this.$regSwName,
                          roleInSchool: this.$regRoleInSchool
                        }

                        this.registrationService.createObject(schoolTeacherDetails, 'create_school_teacher')
                          .subscribe(() => {
                            this.step1CompleteEvent.emit(true)
                          })
                      } else {
                        // $query = "INSERT INTO `university_teacher`(`Id_user`, `Id_Country`, `Id_City`, `Id_University`, `Role_in_school`) VALUES " + 
                        //                                           "(" + data["ID"] + "," + this.$regUcwLoc + "," + this.$regUcvwLoc + "," + this.$regUwName + ",'" + this.$regRoleInUniversity + "')"
                        // console.log("university teacher: " + $query);
                        let universityTeacherDetails = {
                          userId: data[0].ID,
                          countryId: this.$regUcwLoc,
                          cityId: this.$regUcvwLoc,
                          universityId: this.$regUwName,
                          roleInUniversity: this.$regRoleInUniversity
                        }

                        this.registrationService.createObject(universityTeacherDetails, 'create_university_teacher')
                          .subscribe(() => {

                            // let $_path_a = 'temp'
                            // let $_path_b = 'user'
                            // let $_project_user = this.$regName + '$' + this.$regSurname + '$' + this.$regEmail + '$' + this.$regPass

                            // var bcrypt = require('bcryptjs')
                            // var salt = bcrypt.genSaltSync(10)
                            // var hash = bcrypt.hashSync($_path_a, salt)

                            // var fs = require('fs');

                            // if (!fs.exists(hash)) {
                            //   fs.mkdir(hash)
                            // }
                            // console.log("pass: " + hash);
                            // let $_PASSWORD = hash

                            

                            this.step1CompleteEvent.emit(true)
                          })
                      }
                    })
                }

                // this.registrationService.createUserFolder($hashedUserFolder)
                // .subscribe((user_folder) => {

                  
                // }, (err) => {
                //   console.log("Error: " + JSON.stringify(err));
                // })
            })
          }
        })
    } 
  }

  // GENERAL

  fillCityList($parameters: any[], $path: string, $cityList: any[]) {
    this.registrationService.getListData($parameters, $path)
      .subscribe((data: any) => {
        console.log("data: " + JSON.stringify(data))
        let i = 0
        if (data) {
          for (i = 0; i < data.length; i++) {
            $cityList[i] = data[i]
          }
        }
      }, (err) => {
        console.log(err)
      })
  }

  fillUniversityList($parameters: any[], $path: string, $cityList: any[]) {
    this.registrationService.getListData($parameters, $path)
    .subscribe((data: any) => {
      console.log("data: " + JSON.stringify(data))
      let i = 0
      if (data) {
        for (i = 0; i < data.length; i++) {
          $cityList[i] = data[i]
        }
      }
    }, (err) => {
      console.log(err)
    })
  }

  fillDataList($parameters: any[], $path: string, $list: any[]) {
    this.registrationService.getListData($parameters, $path)
      .subscribe((data: any) => {
        console.log("data: " + JSON.stringify(data))
        let i = 0
        if (data) {
          for (i = 0; i < data.length; i++) {
            $list[i] = data[i]
          }
        }
      }, (err) => {
        console.log(err)
      })
  }

  fillList($query: string, $_LIST_ARRAY: any[]) {
    this.registrationService.getList($query)
      .subscribe((data: any) => {
        console.log("data: " + JSON.stringify(data))
        let i = 0
        if (data)
          for (i = 0; i < data.length; i++)
            $_LIST_ARRAY[i] = data[i]
      }, (err) => {
        console.log(err)
      })
  }

  onInputName(event: any) {

    var nameInput = <HTMLInputElement> document.getElementById('_inputName')

    if (event.target.value != ' ') {

      this.$regName_ERR = ''
      nameInput.maxLength = 100

      if (this.$regName.length < 3) {
        this.$submit = false
      } else this.$submit = true

    } else {
      this.$regName_ERR = 'Name field does not have to start with a space!'
      nameInput.maxLength = 1
    }
  }

  checkNameForLength() {

    if (this.$regName.length < 2) {
      // this.$regName_ERR = 'Name field should have at least 2 characters'
      this.setErrorLabel('#inputNameLabel', '* At least 2 characters')
      this.$submit = false
    } else {
      this.setNormalLabel('#inputNameLabel', 'Name')
      this.$submit = true
    }
  }

  onInputSurname(event: any) {

    var surnameInput = <HTMLInputElement> document.getElementById('_inputSurname')

    if (event.target.value != ' ') {

      this.$regSurname_ERR = ''
      surnameInput.maxLength = 100

      this.checkNameForLength()

    } else {
      this.$regSurname_ERR = 'Surname field does not have to start with a space!'
      surnameInput.maxLength = 1
    }
  }


  checkSurnameForLength() {

    if (this.$regSurname.length < 2) {

      // this.$regSurname_ERR = 'Surname field should have at least 2 characters'
      this.setErrorLabel('#inputSurnameLabel', '* At least 2 characters')
      this.$submit = false
    } else {
      this.setNormalLabel('#inputSurnameLabel', 'Surname')
      this.$submit = true
    }
  }

  onInputEmail(event: any) {
    this.checkSurnameForLength()
  }

  thePassAreIdentically(event: any) {
    if (event.target.value == this.$regPass) this.$BdIsDisabled = false
  }

  $regPhoneNumber = ''

  checkIfBasicInputsAreFilled() {
    if (this.$regName != '' && 
        this.$regSurname != '' && 
        this.$regEmail != '' && 
        this.$regPass != '' &&
        this.$regPhoneNumber != '') {
        this.$BdIsDisabled = false
    }
  }

  checkDayRadio() {
    if (this.$regDbDay != 'day') this.$BmIsDisabled = false    
  }

  checkMonthRadio() {
    if (this.$regDbMonth != 'mon') this.$ByIsDisabled = false
  }

  checkYearRadio() {
    if (this.$regDbYear != 'year') this.$genderIsDisabled = false
  }

  regGender() {
    this.$HlcIsDisabled = false
  }

  fillCountryList() {
    this.registrationService.getCountryList()
      .subscribe((data: any) => {
        
        console.log("data: " + data[0]["Name_Country"]);
        
        this.$countryList = data

        this.$countryList.forEach(element => {
            console.log(element);
        })
        
      }, (err) => {
        console.log(err);
      })
  }

  choseHomeCountry() {
    this.$cityList.length = 0
    if (this.$regHomeCountry != 'country') {
      
      if (this.$_AUX_HC != this.$regHomeCountry)
        this.$regHomeCity = 'city or village'

      this.$HlcvIsDisabled = false
      console.log("home country: " + this.$regHomeCountry);
      // let $query = "SELECT * FROM city WHERE Id_Country=" + this.$regHomeCountry;
      // this.fillList($query, this.$cityList);
      let parameters = [{name: 'idCountry', value: this.$regHomeCountry}]
      this.fillCityList(parameters, 'get_city_list', this.$cityList)
      this.$_AUX_HC = this.$regHomeCountry
    }
  }

  chosenHomeCityVillage() {
    if (this.$regHomeCity != 'city or village') {
      console.log("home city: " + this.$regHomeCity);
      this.$roleIsDisabled = false
    } 
  }

  schoolCheckIn() {
    this.$hideSchoolStruc = false
    this.$hideUniversityStruc = true
    this.$hideTeacherStruc = true
  }

  studenCheckIn() {
    this.$hideUniversityStruc = false
    this.$hideSchoolStruc = true
    this.$hideTeacherStruc = true
  }

  teachCheckIn() {
    this.$hideTeacherStruc = false
    this.$hideSchoolStruc = true
    this.$hideUniversityStruc = true
  }

  // UNIVERSITY

  hideFacultyProgramOptions() {

    this.$hideSpecStruc = true
    this.$hideDomnStruc = true
    this.$hideYsStruc = true
  }

  stChoseCountry() {
    this.$citySuList.length = 0
    if (this.$regUniverCountryLocation != 'country') {
      
      if (this.$_AUX_UC != this.$regUniverCountryLocation){
        this.$regUcvLocation = 'city or village'
        this.$regUName = 'university'
        this.$regUFaculty = 'faculty'
        this.$unIsDisabled = true
        this.$ufIsDisabled = true
        this.$utsIsDisabled = true
        this.$regAgree = false
        this.hideFacultyProgramOptions()
      }

      this.$ulcvIsDisabled = false
      console.log("university country: " + this.$regUniverCountryLocation)
      // let $query = "SELECT * FROM city INNER JOIN university ON city.Id_City=university.Id_City WHERE city.Id_Country=" + this.$regUniverCountryLocation + " GROUP BY city.Id_City" 
      // this.fillList($query, this.$citySuList)
      let parameters = [{name: 'idCountry', value: this.$regUniverCountryLocation}]
      this.fillCityList(parameters, 'get_city_list_by_universities', this.$citySuList)
      this.$_AUX_UC = this.$regUniverCountryLocation
    } 
  }

  stChoseCity() {
    this.$universityList.length = 0
    if (this.$regUcvLocation != 'city or village') {

      if (this.$_AUX_UCV != this.$regUcvLocation) {
        this.$regUName = 'university'
        this.$regUFaculty = 'faculty'
        this.$ufIsDisabled = true
        this.$utsIsDisabled = true
        this.$regAgree = false
        this.hideFacultyProgramOptions()
      }

      this.$unIsDisabled = false
      console.log("university city: " + this.$regUcvLocation)
      // let $query = "SELECT * FROM university WHERE Id_City=" + this.$regUcvLocation
      // this.fillList($query, this.$universityList)
      let parameters = [{name: 'idCity', value: this.$regUcvLocation}]
      this.fillUniversityList(parameters, 'get_university_list', this.$universityList)
      this.$_AUX_UCV = this.$regUName      
    } 
  }

  stChoseUniversity() {
    this.$_FACULTY_LIST.length = 0
    if (this.$regUName != 'university') {

      if (this.$_AUX_U != this.$regUName) {
        this.$regUFaculty = 'faculty'
        this.$utsIsDisabled = true
        this.$regAgree = false
        this.hideFacultyProgramOptions()
      }

      this.$ufIsDisabled = false

      this.$regUTypeOfStudy = -1

      this.$utsIsDisabled = true
      this.$hideSpecStruc = true
      this.$hideDomnStruc = true
      this.$hideYsStruc = true
      // this.$regAgree = false

      console.log("university city: " + this.$regUName)
      // let $query = "SELECT * FROM faculty INNER JOIN university_faculty ON faculty.Id_Faculty=university_faculty.Id_faculty WHERE university_faculty.Id_university=" + this.$regUName
      // this.fillList($query, this.$_FACULTY_LIST)
      let parameters = [{name: 'idUniversity', value: this.$regUName}]
      this.fillDataList(parameters, 'get_faculty_list', this.$_FACULTY_LIST)
      this.$_AUX_U = this.$regUName
    } 
  }

  setFacultyProgram($parameters: any[]) {
    this.registrationService.getListData($parameters, 'get_faculty_types')
      .subscribe((data: any) => {
        console.log("bachelor: " + data[0]['Id_studyType']);
        let aux = false;
        this.$hideDoctorateProgram = aux
        
        for (let i = 0; i < data.length; i++) 
          if (data[i]['Id_studyType'] == 3) aux = true

        if (!aux) this.$hideDoctorateProgram = true
      }, (err) => {
        console.log(err);
      })
  }

  stChoseFaculty() {
    if (this.$regUFaculty != 'faculty') {

      if (this.$_AUX_F != this.$regUFaculty) {
        this.$regUTypeOfStudy = -1
        this.$regAgree = false
        this.hideFacultyProgramOptions()
      }

      this.$utsIsDisabled = false
      console.log("faculty: " + this.$regUFaculty);
      // let $query = "SELECT Id_studyType FROM faculty_studytype_specdom WHERE Id_faculty=" + this.$regUFaculty + " GROUP BY Id_studyType";
      
      let parameters = [{name: 'idFaculty', value: this.$regUFaculty}]
      this.setFacultyProgram(parameters)

      this.$_AUX_F = this.$regUFaculty      
    } 
  }

  fillProgramTypeByTypeOfStudy(TYPE_OF_STUDY: number) {
    let $query = "";
    // let programTypeId = 0;
    this.$specializationList.length = 0
    switch(TYPE_OF_STUDY) {
      case 1: 
        // programTypeId = 1
        this.$regUTypeOfStudy = 1
      break
      case 2: 
        // programTypeId = 2
        this.$regUTypeOfStudy = 2
      break
      case 3: 
        // programTypeId = 3
        this.$regUTypeOfStudy = 3
        break
    }

    // $query = "SELECT * FROM specialization INNER JOIN faculty_studytype_specdom ON specialization.Id_Specialization=faculty_studytype_specdom.Id_specialization WHERE faculty_studytype_specdom.Id_studyType=" + this.$regUTypeOfStudy + " AND faculty_studytype_specdom.Id_faculty=" + this.$regUFaculty + " AND faculty_studytype_specdom.Id_University=" + this.$regUName
    // this.fillList($query, this.$specializationList)
    let parameters = [
      {name: 'typeOfStudyProgram', value: this.$regUTypeOfStudy},
      {name: 'idFaculty', value: this.$regUFaculty},
      {name: 'idUniversity', value: this.$regUName}
    ]
    this.fillDataList(parameters, 'get_specialization_by_study_program', this.$specializationList)
  }

  specCheckIn(event: any) {
    this.$hideSpecStruc = false
    this.$hideDomnStruc = true
    this.$hideYsStruc = false 

    console.log("type of study " + event.target.value);

    this.$regUSpecialization = 'specialization'
    this.fillProgramTypeByTypeOfStudy(event.target.value)
  }

  domnCheckIn(event: any) {
    this.$hideDomnStruc = false
    this.$hideSpecStruc = true
    this.$hideYsStruc = false

    this.$regUDomanian = 'domanian'
    this.fillProgramTypeByTypeOfStudy(event.target.value) 
  }

  fillYearsList($parameters: any[], $path: string) {
    this.registrationService.getListData($parameters, $path)
      .subscribe((data: any) => {
        console.log("years " + JSON.stringify(data));
        let num = data[0]['Years_of_studying']
        for (let i = 0; i < num; i++)
          this.$ys[i] = i + 1;
      }, (err) => {
        console.log(err);
      })
  }

  stChoseSpecialization() {
    if (this.$regUSpecialization != 'specialization') {
      this.$usyIsDisabled = false
      console.log("university spec: " + this.$regUSpecialization)
      let $query = ''
      // let typeOfProgram = 0
      this.$ys.length = 0
      console.log("chosen program type: " + this.$regUTypeOfStudy);
      
      // switch(this.$regUTypeOfStudy) {
      //   case 'license': 
      //     typeOfProgram = 1
      //   break
      //   case 'master':
      //     typeOfProgram = 2
      //   break
      // }
      console.log(this.$regUSpecialization + " " + this.$regUTypeOfStudy);
      // $query = "SELECT Years_of_studying FROM specialization_yearsofstudying WHERE Id_Specialization = " + this.$regUSpecialization + " AND typeOfStudy=" + this.$regUTypeOfStudy
      
      let parameters = [
        {name: 'idSpecialization', value: this.$regUSpecialization},
        {name: 'typeOfStudy', value: this.$regUTypeOfStudy}
      ]
      this.fillYearsList(parameters, 'get_years_of_study_by_specialization')
    }   
  }

  stChoseDomanian() {
    if (this.$regUDomanian != 'domanian') {
      this.$usyIsDisabled = false
      this.$ys.length = 0
      console.log("chosen program type: " + this.$regUTypeOfStudy);
      console.log("university spec: " + this.$regUDomanian)
      if (this.$regUTypeOfStudy == 3) {
        // let $query = "SELECT Years_of_studying FROM specialization_yearsofstudying WHERE Id_Specialization = " + this.$regUDomanian + " AND typeOfStudy=" + 3
        // this.fillYearsList($query)

        let parameters = [
          {name: 'idSpecialization', value: this.$regUDomanian},
          {name: 'typeOfStudy', value: this.$regUTypeOfStudy}
        ]
        this.fillYearsList(parameters, 'get_years_of_study_by_specialization')
      }
    }
  }

  // SCHOOL

  scChoseCountry() {
    this.$citySchList.length = 0
    if (this.$regScLocation != 'country') {

      if (this.$_AUX_SC != this.$regScvLocation) {
        this.$regScvLocation = 'city or village'
        this.$regSchoolName = 'school'
        this.$regSchoolClassIn = 'class_in'
        this.$snIsDisabled = true
        this.$sciIsDisabled = true
        this.$regAgree = false
      }

      this.$slcvIsDisabled = false
      let $query = "SELECT * FROM city INNER JOIN school ON city.Id_City=school.Id_City WHERE city.Id_Country=" + this.$regScLocation + " GROUP BY city.Id_City"
      // this.fillList($query, this.$citySchList)
      let parameters = [{name: 'idCity', value: this.$regScLocation}]
      this.fillDataList(parameters, 'get_city_list_by_schools', this.$citySchList)
      this.$_AUX_SC = this.$regScLocation
    } 
  }

  scChoseCity() {
    this.$schoolList.length = 0
    if (this.$regScvLocation != 'city or village') {

      if (this.$_AUX_SCHCV != this.$regScvLocation) {
        this.$regSchoolName = 'school'
        this.$regSchoolClassIn = 'class_in'
        this.$sciIsDisabled = true
        this.$regAgree = false
      }

      this.$snIsDisabled = false
      console.log("school city: " + this.$regScvLocation);
      // let $query = "SELECT * FROM school WHERE Id_City=" + this.$regScvLocation
      // this.fillList($query, this.$schoolList)

      let parameters = [{name: 'idCity', value: this.$regScvLocation}]
      this.fillDataList(parameters, 'get_schools_from_city', this.$schoolList)
      this.$_AUX_SCHCV = this.$regScvLocation
    } 
  }

  fillClassesList($parameters: any[], $path: string) {
    this.registrationService.getListData($parameters, $path)
      .subscribe((data: any) => {
        console.log("years " + JSON.stringify(data));
        let num = data[0]['Years_of_education']
        for (let i = 0; i < num; i++)
          this.$classes[i] = i + 1;
      }, (err) => {
        console.log(err);
      })
  }

  scChoseSchool() {
    this.$classes.length = 0
    if (this.$regSchoolName != 'school') {

      if (this.$_AUX_SCH != this.$regSchoolName) {
        this.$regSchoolClassIn = 'class_in'
        this.$regAgree = false
      }

      this.$sciIsDisabled = false
      console.log("school name: " + this.$regSchoolName);
      // let $query = "SELECT * FROM school_years WHERE Id_School=" + this.$regSchoolName
      let parameters = [{name: 'idSchool', value: this.$regSchoolName}]
      this.fillClassesList(parameters, 'get_years_of_study_in_school')
      this.$_AUX_SCH = this.$regSchoolName
    } 
  }

  // TEACHER

  placeWorkSchool() {
    this.$hideSwStruc = false
    this.$hideUwStruc = true
  }

  placeWorkUniversity() {
    this.$hideUwStruc = false
    this.$hideSwStruc = true
  }

  tchChosenSchCountry() {
    this.$citySchTList.length = 0
    if (this.$regScwLoc != 'country') {

      if (this.$_AUX_SCHTC != this.$regScwLoc) {
        this.$regScvwLoc = 'city or village'
        this.$regSwName = 'schoolNameWork'
        this.$snwIsDisabled = true
        this.$regAgree = false
        // this.$regRoleInSchool = ''
      }

      this.$sclvwIsDisabled = false
      // let $query = "SELECT * FROM city INNER JOIN school ON city.Id_City=school.Id_City WHERE city.Id_Country=" + this.$regScwLoc + " GROUP BY city.Id_City"
      // "SELECT * FROM city INNER JOIN university ON city.Id_City=university.Id_City WHERE city.Id_Country=" + this.$regScwLoc + " GROUP BY city.Id_City"
      // this.fillList($query, this.$citySchTList)
      let parameters = [{name: 'idCountry', value: this.$regScwLoc}]
      this.fillDataList(parameters, 'get_city_list_by_country_for_school', this.$citySchTList)

      this.$_AUX_SCHTC = this.$regScwLoc
    } 
  }

  tchChosenSchCity() {
    this.$schoolList.length = 0
    if (this.$regScvwLoc != 'city or village') {

      if (this.$_AUX_TCH_SCH_CV != this.$regScvwLoc) {
        this.$regSwName = 'schoolNameWork'
        this.$regAgree = false
      }

      this.$snwIsDisabled = false
      console.log("school loc: " + this.$regSwName);
      // let $query = "SELECT * FROM school WHERE Id_City=" + this.$regScvwLoc;
      // this.fillList($query, this.$schoolList)
      let parameters = [{name: 'idCity', value: this.$regScvwLoc}]
      this.fillDataList(parameters, 'get_schools_from_city', this.$schoolList)
      this.$_AUX_TCH_SCH_CV = this.$regScvwLoc
    } 
  }

  enableTeacherRoleField() {
    this.$_TRS_is_DISABLED = false
  }

  onInputTeacherSchooleRole(event: any) {
    if (event.target.value != '' || event.target.value != ' ')
      this.$teachRsLabel = 'Role in school'
  }

  tchChosenUnivCountry() {
    this.$cityUnivTList.length = 0
    if (this.$regUcwLoc != 'country') {

      if (this.$_AUX_UNIVTC != this.$regUcwLoc) {

        this.$regUcvwLoc = 'city or village'
        this.$regUwName = 'univNameWork'
        this.$unwIsDisabled = true
        this.$regAgree = false
      }

      this.$ucvwIsDisabled = false
      // let $query = "SELECT * FROM city INNER JOIN university ON city.Id_City=university.Id_City WHERE city.Id_Country=" + this.$regUcwLoc + " GROUP BY city.Id_City"
      // this.fillList($query, this.$cityUnivTList)
      let parameters = [{name: 'idCountry', value: this.$regUcwLoc}]
      this.fillDataList(parameters, 'get_city_list_by_universities', this.$cityUnivTList)
      this.$_AUX_UNIVTC = this.$regUcwLoc
    } 
  }

  tchChosenUnivCity() {
    this.$universityList.length = 0
    if (this.$regUcvwLoc != 'city or village') {

      if (this.$_AUX_UNIV_T_CV != this.$regUcvwLoc) {
        this.$regUwName = 'univNameWork'
        this.$regAgree = false
      }

      this.$unwIsDisabled = false
      console.log("university city: " + this.$regUcvwLoc);
      // let $query = "SELECT * FROM university WHERE Id_City=" + this.$regUcvwLoc
      // this.fillList($query, this.$universityList)
      let parameters = [{name: 'idCity', value: this.$regUcvwLoc}]
      this.fillDataList(parameters, 'get_university_list', this.$universityList)
      this.$_AUX_UNIV_T_CV = this.$regUcvwLoc
    } 
  }

  tchChosenUniversity() {
    this.$_TRU_is_DISABLED = false
  }

  onInputTeacherUniversityRole(event: any) {
    console.log(event.target.value);
    if (event.target.value != '' || event.target.value != ' ')
      this.$regIturErr = 'Role in university'
  }
}