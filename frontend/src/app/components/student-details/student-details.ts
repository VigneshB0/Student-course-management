import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css']
})
export class StudentDetailsComponent implements OnInit {
  studentForm: FormGroup;
  students: any[] = [];
  isEditMode = false;
  currentStudentId: string | null = null;
  showStudentList = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.apiService.getStudents().subscribe((data: any) => {
      this.students = data;
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.apiService.updateStudent(this.currentStudentId, this.studentForm.value).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    } else {
      this.apiService.createStudent(this.studentForm.value).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  editStudent(student: any) {
    this.isEditMode = true;
    this.currentStudentId = student._id;
    this.studentForm.setValue({
      name: student.name,
      email: student.email,
      phone: student.phone
    });
  }

  deleteStudent(id: any) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }

  resetForm() {
    this.studentForm.reset();
    this.isEditMode = false;
    this.currentStudentId = null;
  }

  toggleStudentList() {
    this.showStudentList = !this.showStudentList;
  }
}