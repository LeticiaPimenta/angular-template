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


/* aqui */
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

/* how to move the progress bar */~
isDragging: boolean = false;

onMouseDown(event: MouseEvent) {
  this.isDragging = true;
  this.updateSeek(event);
}

onMouseMove(event: MouseEvent) {
  if (this.isDragging) {
    this.updateSeek(event);
  }
}

onMouseUp() {
  this.isDragging = false;
}

updateSeek(event: MouseEvent) {
  const progressBar = document.querySelector('.progress-bar') as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percent = Math.min(Math.max(x / rect.width, 0), 1); // clamp between 0 and 1

  this.currentTime = percent * this.duration;

  if (!this.isDragging) {
    // Only set currentTime on release, or live update if desired
    this.audioPlayerRef.nativeElement.currentTime = this.currentTime;
  }
}



/* Optional Global Event Listeners (for better drag UX) */
ngOnInit() {
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }
  
  ngOnDestroy() {
    window.removeEventListener('mouseup', this.onMouseUp.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  /* 
  If you want to only seek on mouseup, keep the audio.currentTime update inside onMouseUp(): */

  onMouseUp() {
    if (this.isDragging) {
      this.audioPlayerRef.nativeElement.currentTime = this.currentTime;
    }
    this.isDragging = false;
  }
  

  switchLang(lang: string) {
    this.translationService.loadTranslations(lang);
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }