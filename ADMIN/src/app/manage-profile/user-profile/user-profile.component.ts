import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../user-profile/user.service';
import { Users } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  adminForm: FormGroup; // Form group for user profile
  nonAdmins: Users[] = []; // List of non-admin users

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    // Initialize form
    this.adminForm = this.fb.group({
      id: [null],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], // Password is required
      contact: ['', Validators.required],
      admin: [false]
    });
  }

  ngOnInit(): void {
    this.getUsers(); // Get list of users on init
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.nonAdmins = users.filter(user => !user.admin); // Filter non-admin users
      },
      error => {
        console.error('Error fetching users:', error);
        Swal.fire('Error', 'Failed to load non-admin users. Please try again later.', 'error');
      }
    );
  }

  updateUser(id: string): void {
    const userToUpdate = this.nonAdmins.find(user => user._id === id); // Find user in non-admin list
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

    // Remove password field if not set
    if (!updatedData.password) {
      delete updatedData.password;
    }

    this.userService.updateUser(id, updatedData).subscribe(
      () => {
        Swal.fire('Success', 'User updated successfully!', 'success');
        this.getUsers();
        this.adminForm.reset();
      },
      error => {
        console.error('Error updating user:', error);
        let errorMessage = 'Could not update user. Please try again later.';
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
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.getUsers();
          },
          error => {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'Could not delete user. Please try again later.', 'error');
          }
        );
      }
    });
  }

  detailUser(user: Users): void {
    this.router.navigate(['DetailUser', user._id]); // Navigate to detail view for user
  }

  clearForm(): void {
    this.adminForm.reset(); // Reset form
    this.adminForm.patchValue({ admin: false }); // Set default value for admin field to false
  }
}
