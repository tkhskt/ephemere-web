export type Artist = {
  name: string
  url?: string
}

export type Track = {
  id: number,
  name: string,
  artist: Artist
  featuredArtist?: Artist
  lyrics?: string
}
