import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

    @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
    audioSrc: string = 'assets/audio.mp3'; // Substitua pelo caminho do áudio
    tempoAtual: string = '0:00';
    duracao: string = '0:00';
  
    playPause() {
      const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
      audio.paused ? audio.play() : audio.pause();
    }
  
    stop() {
      const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
      audio.pause();
      audio.currentTime = 0;
    }
  
    atualizarTempo() {
      const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
      this.tempoAtual = this.formatarTempo(audio.currentTime);
    }
  
    carregarMetadata() {
      const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
      this.duracao = this.formatarTempo(audio.duration);
    }
  
    formatarTempo(segundos: number): string {
      const minutos = Math.floor(segundos / 60);
      const seg = Math.floor(segundos % 60);
      return `${minutos}:${seg < 10 ? '0' : ''}${seg}`;
    }
  }
function ViewChild(arg0: string, arg1: { static: boolean; }): (target: PlayerComponent, propertyKey: "audioPlayer") => void {
  throw new Error('Function not implemented.');
}



||||||||||||||||||
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTrancriptionSegments } from 'path-to-your-selector';
import { TranscriptSegment } from 'path-to-your-model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements AfterViewInit {
  myAudio = ['assets/audio/medium.mp3'];
  transcriptionSegments$!: Observable<TranscriptSegment[]>;
  transcript: TranscriptSegment[] = [];

  @ViewChild('audioPlayer', { static: false }) audioPlayerRef!: ElementRef<HTMLAudioElement>;

  activeIndex: number = -1;

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    // Get transcript data from the store
    this.transcriptionSegments$ = this.store.select(selectTrancriptionSegments);
    this.transcriptionSegments$.subscribe(segments => {
      this.transcript = segments;
    });
  }

  onTimeUpdate(): void {
    const currentTime = this.audioPlayerRef.nativeElement.currentTime;

    const index = this.transcript.findIndex(segment =>
      currentTime >= segment.start && currentTime < segment.end
    );

    if (index !== this.activeIndex) {
      this.activeIndex = index;
    }
  }

  playAudio() {
    this.audioPlayerRef.nativeElement.play();
  }

  pauseAudio() {
    this.audioPlayerRef.nativeElement.pause();
  }
}


//progress bar 
currentTime: number = 0;
duration: number = 0;

onLoadedMetadata() {
  this.duration = this.audioPlayerRef.nativeElement.duration;
}

onTimeUpdate() {
  this.currentTime = this.audioPlayerRef.nativeElement.currentTime;

  // Match active segment
  const index = this.transcript.findIndex(segment =>
    this.currentTime >= segment.start && this.currentTime < segment.end
  );
  if (index !== this.activeIndex) {
    this.activeIndex = index;
  }
}

onSeek(event: MouseEvent) {
  const progressBar = event.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const percent = clickX / width;
  const seekTime = percent * this.duration;

  this.audioPlayerRef.nativeElement.currentTime = seekTime;
}

import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent {
  audioUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Simulando seu dado vindo de um observable, por exemplo:
    const audioBase64 = this.audioTranscriptionData$.audioFile;

    // Monte a URL do tipo data:audio
    const fullAudioSrc = 'data:audio/wav;base64,' + audioBase64;

    // Se necessário, sanitizar:
    this.audioUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullAudioSrc);
  }

  audioTranscriptionData$ = {
    audioFile: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YYAAAACAgICAgIC..'
  };
}
