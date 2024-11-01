import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit {
  isFormVisible: boolean = false;

  locations: any = [];
  schedule: any = {
    scheduleId: 0,
    vendorId: 0,
    busName: '',
    busVehicleNo: '',
    fromLocation: 0,
    toLocation: 0,
    departureTime: '',
    arrivalTime: '',
    scheduleDate: '',
    price: 0,
    totalSeats: 0,
  };
  schedules: any[] = [];

  constructor(private masterService: MasterService) {
    const vendor = localStorage.getItem('user');
    this.schedule.vendorId = vendor ? JSON.parse(vendor).userId : 0;
    const schedules = localStorage.getItem('schedules');
    this.schedules = schedules ? JSON.parse(schedules) : [];
  }
  ngOnInit(): void {
    this.getAllLocations();
  }
  getAllLocations() {
    this.masterService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }

  onCreateSchedule() {
    this.masterService.createSchedule(this.schedule).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Schedule created successfully',
          timer: 1500,
          showConfirmButton: false,
        });
        this.isFormVisible = false;
        this.schedules.push(res);
        localStorage.setItem('schedules', JSON.stringify(this.schedules));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${err.error.message}`,
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }

  onDeleteSchedule(id: number) {
    Swal.fire({
      title: `Are you sure you want to delete this schedule ${id}?`,
      text: 'You will not be able to recover this schedule!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.schedules.findIndex(
          (schedule) => schedule.scheduleId === id
        );
        if (index !== -1) {
          this.masterService.deleteSchedule(id).subscribe({
            next: () => {
              this.schedules.splice(index, 1);
              localStorage.setItem('schedules', JSON.stringify(this.schedules));
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Schedule deleted successfully',
                timer: 1500,
                showConfirmButton: false,
              });
              window.location.reload();
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Schedule not found`,
                timer: 1500,
                showConfirmButton: false,
              });
            },
          });
        }
      }
    });
  }
}
