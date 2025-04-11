export type Connector = {
  sendPunchline: (punchline: Punchline) => Promise<void>;
};

export type Punchline = {
  id: number;
  author: string;
  punchline: string;
  image_src: string;
  content: string;
  album: string | null;
  track: string | null;
};
