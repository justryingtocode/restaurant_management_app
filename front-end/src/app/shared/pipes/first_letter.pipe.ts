import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    // Check if value is provided and it's a string
    if (!value || typeof value !== 'string') {
      return '';
    }
    // Extract and return the first letter of the string
    return value.charAt(0);
  }
}