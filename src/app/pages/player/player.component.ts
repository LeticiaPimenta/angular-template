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

