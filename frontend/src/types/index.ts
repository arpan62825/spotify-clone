export interface Song {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  fullName: string;
  imageUrl: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
}
