currentTime: number = 0;
duration: number = 0;

@ViewChild('audioPlayer', { static: false }) audioPlayerRef!: ElementRef<HTMLAudioElement>;

ngAfterViewInit() {
  // Load duration if needed
  this.audioPlayerRef.nativeElement.onloadedmetadata = () => {
    this.duration = this.audioPlayerRef.nativeElement.duration;
  };
}

onTimeUpdate() {
  this.currentTime = this.audioPlayerRef.nativeElement.currentTime;

  // (If using transcript highlighting)
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
  const seekTime = (clickX / width) * this.duration;

  this.audioPlayerRef.nativeElement.currentTime = seekTime;
}

formatTime(time: number): string {
  if (!time && time !== 0) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
