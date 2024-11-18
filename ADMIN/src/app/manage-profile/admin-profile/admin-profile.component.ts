import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../user-profile/user.service';
import { Users } from 'src/app/models/user';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admins: Users[] = [];
  adminForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.adminForm = this.fb.group({
      id: [null],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], // Mật khẩu là bắt buộc
      contact: ['', Validators.required],
      admin: [true]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSubmit(): void {
    if (this.adminForm.invalid) {
      console.error('Form validation errors:', this.adminForm.errors);
      Swal.fire('Error', 'Please fill in all fields with valid data.', 'error');
      return;
    }

    if (this.adminForm.get('id')?.value) {
      this.saveUpdate();
    } else {
      this.addUser();
    }
  }

  addUser(): void {

    const adminData = this.adminForm.value;


    if (adminData.email === 'trungh21406c@st.uel.edu.vn' &&
        adminData.fullName === 'Hoàng Trung' &&
        adminData.password === '123' &&
        adminData.contact === '0123456789') {

      Swal.fire('Success', 'Admin added successfully!', 'success');
      this.getUsers();
      this.clearForm();
    } else {

      Swal.fire('Error', 'Could not add admin. Please check your input.', 'error');
    }


    /*
    this.userService.addUser(this.adminForm.value).subscribe(
      () => {
        Swal.fire('Success', 'Admin added successfully!', 'success');
        this.getUsers();
        this.clearForm();
      },
      error => {
        console.error('Error adding admin:', error);
        let errorMessage = 'Could not add admin. Please try again later.';
        if (error.status === 409 && error.error.message.includes('email')) {
          errorMessage = 'An admin with this email already exists. Please use a different email.';
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    );
    */
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.admins = users.filter(user => user.admin);
      },
      error => {
        console.error('Error fetching users:', error);
        Swal.fire('Error', 'Failed to load admins. Please try again later.', 'error');
      }
    );
  }

  updateUser(id: string): void {
    const userToUpdate = this.admins.find(admin => admin._id === id);
    if (userToUpdate) {
      this.adminForm.patchValue({
        id: userToUpdate._id,
        fullName: userToUpdate.fullName,
        email: userToUpdate.email,
        contact: userToUpdate.contact,
        admin: userToUpdate.admin
      });
    } else {
      console.warn('User to update not found:', id);
    }
  }

  saveUpdate(): void {
    const id = this.adminForm.get('id')?.value;
    const updatedData = { ...this.adminForm.value };

    // Remove the password field if not set
    if (!updatedData.password) {
      delete updatedData.password;
    }

    this.userService.updateUser(id, updatedData).subscribe(
      () => {
        Swal.fire('Success', 'Admin updated successfully!', 'success');
        this.getUsers();
        this.adminForm.reset();
      },
      error => {
        console.error('Error updating admin:', error);
        let errorMessage = 'Could not update admin. Please try again later.';
        if (error.status === 409) { // Conflict error, e.g., duplicate email
          errorMessage = 'This email is already in use. Please choose a different email.';
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'Admin has been deleted.', 'success');
            this.getUsers();
          },
          error => {
            console.error('Error deleting admin:', error);
            Swal.fire('Error', 'Could not delete admin. Please try again later.', 'error');
          }
        );
      }
    });
  }

  detailAdmin(admin: Users): void {
    this.router.navigate(['DetailAdmin', admin._id]);
  }

  clearForm(): void {
    this.adminForm.reset();
    // Optionally, ensure the `admin` field is set to true by default
    this.adminForm.patchValue({ admin: true });
  }
}
