export interface Alert {
    id: number,
    message: string,
    type: 'success' | 'danger' | 'info' | 'warning'
}