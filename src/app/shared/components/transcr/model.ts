// models/audio-response.model.ts

export interface AudioResponse {
  id: string;
  status: string;
  metadata: Metadata;
}

export interface Metadata {
  datetime: string;
  metadata: {
    datetime: string;
    useCase: {
      [key: string]: string;
    };
  };
  transition: {
    segments: Segment[];
    tech: {
      enviroment: string;
    };
  };
  ana: any;
}

export interface Segment {
  starttime: number;
  annotation: {
    speaker: string;
  };
}
