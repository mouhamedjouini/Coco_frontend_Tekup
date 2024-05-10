import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormBuilder,  FormGroup,  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClaimsService } from '../../services/claims.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Claims } from '../../models/Claims';
import { user } from '../../models/User';
import { TypeClaim } from '../../models/TypeClaim';
import { ReCaptchaV3Service, RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module } from 'ng-recaptcha';

@Component({
  selector: 'app-reclamtion',
  standalone: true,
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
  imports: [FormsModule , CommonModule,
    RecaptchaModule,ReactiveFormsModule, 
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './reclamtion.component.html',
  styleUrl: './reclamtion.component.css'
})
export class ReclamtionComponent {
  constructor(private ClaimsService: ClaimsService,private dialogRef : MatDialog,private formBuilder: FormBuilder ){}
  allReclamation: Claims[] = [];
  user = new user();
  newClaimFormGroup!: FormGroup;
  ModifiClaimFormGroup!: FormGroup;
  openadd:boolean=false;
  openedit:boolean=false;
  showOtherDetails: boolean = false;
  showOtherDetails2: boolean = false;
  recaptchaResolved: boolean = false;
  claimTypes: string[] = ['Other', 'CARPOLING', 'COLLOCATION', 'Post'];
  ngOnInit(): void {
    this.initializeForm();
    this.user.id_user=1;
    this.ClaimsService.findByUser(this.user.id_user).subscribe((data) => {
      // @ts-ignore
      this.allReclamation = data; 
    console.log( this.allReclamation)});
  }
  resolved(captchaResponse: string ) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.recaptchaResolved = true;
  }
  initializeForm(): void {
    this.newClaimFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      TypeClaim: ['', Validators.required],
      otherDetails: [null] 
      
    });
  }
  gotoedit(claim:Claims){
    this.openedit=true;
    if(claim.typeClaim==TypeClaim.Other){
      this.showOtherDetails2=true;
    }
    this.ModifiClaimFormGroup = this.formBuilder.group({
      idClaims: [claim.idClaims, Validators.required],
      title: [claim.title, Validators.required],
      description: [claim.description, Validators.required],
      typeClaim: [claim.typeClaim, Validators.required],
      otherDetails: [claim.otherDetails] 
      
    });
  }
  onDelete(claim:Claims){
    this.ClaimsService.Delete(claim.idClaims).subscribe({
      next: data => {
        location.reload();
      },
      error: err => {
        console.error(err);
      }
    });
  }
  Openpopupadd(){
    this.openadd=true;
  }
  closeadd(){
    this.openadd=false;
  }
  closeedit(){
    this.openedit=false;
  }
  toggleOtherDetails2(): void {
    const selectedType = this.ModifiClaimFormGroup.get('typeClaim')!.value;
    this.showOtherDetails2 = (selectedType === 'Other');
  }
  toggleOtherDetails(): void {
    const selectedType = this.newClaimFormGroup.get('TypeClaim')!.value;
    this.showOtherDetails = (selectedType === 'Other');
  }
  add():void{
    if(this.newClaimFormGroup.valid){
      let c =new Claims();
      c.title=this.newClaimFormGroup.get('title')!.value;
      c.description=this.newClaimFormGroup.get('description')!.value;
      c.otherDetails=this.newClaimFormGroup.get('otherDetails')!.value;
      if(this.newClaimFormGroup.get('TypeClaim')!.value=="Other"){
        c.typeClaim=TypeClaim.Other;
      }
      if(this.newClaimFormGroup.get('TypeClaim')!.value=="CARPOLING"){
        c.typeClaim=TypeClaim.CARPOLING;
      }
      if(this.newClaimFormGroup.get('TypeClaim')!.value=="COLLOCATION"){
        c.typeClaim=TypeClaim.COLLOCATION;
      }
      if(this.newClaimFormGroup.get('TypeClaim')!.value=="Post"){
        c.typeClaim=TypeClaim.Post;
      }
      c.user=this.user;
      console.log(c)
      this.ClaimsService.AddClaim(c).subscribe({
        next: data => {
          location.reload();
        },
        error: err => {
          console.error(err);
        }
      });
    }
  
  }

  edit():void{
    if(this.ModifiClaimFormGroup.valid){
      let c =new Claims();
      c.idClaims=this.ModifiClaimFormGroup.get('idClaims')!.value;
      c.title=this.ModifiClaimFormGroup.get('title')!.value;
      c.description=this.ModifiClaimFormGroup.get('description')!.value;
      c.otherDetails=this.ModifiClaimFormGroup.get('otherDetails')!.value;
      if(this.ModifiClaimFormGroup.get('typeClaim')!.value=="Other"){
        c.typeClaim=TypeClaim.Other;
      }
      if(this.ModifiClaimFormGroup.get('typeClaim')!.value=="CARPOLING"){
        c.typeClaim=TypeClaim.CARPOLING;
      }
      if(this.ModifiClaimFormGroup.get('typeClaim')!.value=="COLLOCATION"){
        c.typeClaim=TypeClaim.COLLOCATION;
      }
      if(this.ModifiClaimFormGroup.get('typeClaim')!.value=="Post"){
        c.typeClaim=TypeClaim.Post;
      }
      this.ClaimsService.UpdateClaims(c).subscribe({
        next: data => {
          location.reload();
        },
        error: err => {
          console.error(err);
        }
      });
    }
  
  }
}
