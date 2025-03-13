import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    private alertsSubject = new BehaviorSubject<Alert[]>([])
    alerts$: Observable<Alert[]> = this.alertsSubject.asObservable()

    private nextId = 0;

    addAlert(message: string, type: 'success' | 'danger' | 'info' | 'warning'): void {
        const alert: Alert = {
            id: this.nextId++,
            message,
            type
        }

        this.alertsSubject.next([...this.alertsSubject.value, alert])

        setTimeout(() => {
            this.removeAlert(alert.id)
        }, 5000);
    }

    removeAlert(id: number): void {
        const updatedAlerts = this.alertsSubject.value.filter(x => x.id !== id);
        this.alertsSubject.next(updatedAlerts)
    }
}
