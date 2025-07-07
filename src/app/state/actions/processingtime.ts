import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'processingTime'
})
export class ProcessingTimePipe implements PipeTransform {
  transform(start: string, end: string): string {
    if (!start || !end) return '';

    const startDate = new Date(start.replace(' ', 'T'));
    const endDate = new Date(end.replace(' ', 'T'));

    const diffInMs = endDate.getTime() - startDate.getTime();

    if (isNaN(diffInMs)) return '';

    const totalSeconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  }
}
