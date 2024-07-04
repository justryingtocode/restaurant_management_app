import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api/api.flowchart_service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  password: any;
  username: any;
  hasOtpSent: boolean = false;
  OtpValue: any;
  loginForm!: FormGroup;
  constructor(private apiservice: ApiService, private router: Router, private _fb: FormBuilder, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.loginForm = this._fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = {
      "user_name": this.loginForm.value.user_name,
      "password": this.loginForm.value.password
    }
    this.apiservice.login(body).subscribe(res => {
      if (res.data.code == 201) {
        this.toastr.success(`${res.data.message}`);
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        
        setTimeout(() => {
          this.router.navigate(['']);
        }, 700);
      }
      else if (res.data.code == 401) {
        this.toastr.error(`${res.data.message}`);
      }
    })
  }
}
