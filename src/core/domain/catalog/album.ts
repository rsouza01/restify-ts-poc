import Artist from './artist';
import Track from './track';

export default interface Album {
  id: string;
  title: string;
  artist: Artist;
  releaseDate: Date;
  tracks: Track[];
}
