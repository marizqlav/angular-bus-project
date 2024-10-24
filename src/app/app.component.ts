import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// local imports
import { MasterService } from './service/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoginForm: boolean = true;
  loggedUser: any;

  registerObj: any = {
    userId: 0, //automatico del backend
    userName: '', // input del formulario
    emailId: '', // input del formulario
    fullName: '', // input del formulario
    role: '', // de momento nada
    createdDate: new Date(),
    password: '', // input del formulario
    projectName: '', // automatico del backend
    refreshToken: '', // automatico del backend
    refreshTokenExpiryTime: new Date(),
  };
  loginObj: any = {
    userName: '', // input del formulario
    password: '', // input del formulario
  };

  constructor(private masterService: MasterService) {
    //no hace falta onInit porque no tienes que cargar nada de componentes que llamen a backend
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedUser = JSON.parse(user);
    }
  }

  openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block'; //abre el modal de login
      modal.classList.add('modal-centered'); //centra el modal con sus elementos
    }
  }
  closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none'; //abre el modal de login
      modal.classList.remove('modal-centered'); //centra el modal con sus elementos
    }
  }

  getUserByUserName() {
    this.masterService.getAllUsers().subscribe((res) => {
      const user = res.data.find(
        (u: any) => u.userName === this.loginObj.userName
      );
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedUser = user;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'User not found!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  // getUserByUserName2() {
  //   this.masterService.getUser(this.loginObj.userName).subscribe((res) => {
  //     if (res.data) {
  //       localStorage.setItem('user', JSON.stringify(res.data));
  //       this.loggedUser = res.data;
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error!',
  //         text: 'User not found!',
  //         timer: 1500,
  //         showConfirmButton: false,
  //       });
  //     }
  //   });
  // }

  registerUser() {
    this.masterService.register(this.registerObj).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'User Registered Successfully!',
          timer: 1500,
          showConfirmButton: false,
        });
        localStorage.setItem('user', JSON.stringify(res.data));
        this.loggedUser = res.data;
        this.closeModal();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: JSON.stringify(err),
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }
  loginUser() {
    this.masterService.login(this.loginObj).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Logged In Successfully!',
          timer: 1500,
          showConfirmButton: false,
        });
        const user = localStorage.getItem('user');
        if (user) {
          this.loggedUser = JSON.parse(user);
          this.closeModal();
        } else {
          this.getUserByUserName();
          //this.getUserByUserName2();
          this.closeModal();
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: JSON.stringify(err),
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }
  logout() {
    localStorage.removeItem('user');
    Swal.fire({
      icon: 'success',
      title: 'Logged Out Successfully!',
      timer: 1500,
      showConfirmButton: false,
    });
    this.loggedUser = null;
  }
}
