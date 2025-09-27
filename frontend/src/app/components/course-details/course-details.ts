import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.css']
})
export class CourseDetailsComponent implements OnInit {
  courseForm: FormGroup;
  courses: any[] = [];
  isEditMode = false;
  currentCourseId: string | null = null;
  showCourseList = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      duration: ['', Validators.required],
      fee: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.apiService.getCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.apiService.updateCourse(this.currentCourseId, this.courseForm.value).subscribe(() => {
        this.loadCourses();
        this.resetForm();
      });
    } else {
      this.apiService.createCourse(this.courseForm.value).subscribe(() => {
        this.loadCourses();
        this.resetForm();
      });
    }
  }

  editCourse(course: any) {
    this.isEditMode = true;
    this.currentCourseId = course._id;
    this.courseForm.setValue({
      courseName: course.courseName,
      duration: course.duration,
      fee: course.fee
    });
  }

  deleteCourse(id: any) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.apiService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  resetForm() {
    this.courseForm.reset();
    this.isEditMode = false;
    this.currentCourseId = null;
  }

  toggleCourseList() {
    this.showCourseList = !this.showCourseList;
  }
}