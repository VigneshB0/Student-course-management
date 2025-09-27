import { Routes } from '@angular/router';
import { StudentDetailsComponent } from './components/student-details/student-details';
import { CourseDetailsComponent } from './components/course-details/course-details';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CourseDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } // Wildcard route for 404 cases
];