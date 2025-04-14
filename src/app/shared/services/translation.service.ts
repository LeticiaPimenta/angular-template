import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};
  private currentLang = 'en';

  constructor(private http: HttpClient) {}

  loadTranslations(lang: string): Promise<void> {
    this.currentLang = lang;
    return this.http.get(`/assets/i18n/${lang}.json`)
      .toPromise()
      .then(data => {
        this.translations = data;
      });
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }

  get currentLanguage(): string {
    return this.currentLang;
  }
}
