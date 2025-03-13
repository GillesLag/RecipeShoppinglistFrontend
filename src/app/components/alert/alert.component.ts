import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../interfaces/alert';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})

export class AlertComponent {
    alerts: Alert[] = []

    constructor(private alertService: AlertService){
        this.alertService.alerts$.subscribe(alerts => this.alerts = alerts)
    }

    removeAlert(id: number){
        this.alertService.removeAlert(id);
    }
}
