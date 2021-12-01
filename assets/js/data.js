const BASE_URL_MUSIC = 'https://dls.music-fa.com/tagdl/ati/'
const BASE_URL_IMAGE = 'https://music-fa.com/wp-content/uploads/'
const playlist = [
  {
    src: `${BASE_URL_MUSIC}Masih%20Arash%20-%20Remix%20Man%20Mazerat%20Mikhaam%20(128).mp3`,
    name: 'من معذرت میخوام',
    artist: 'مسیح و آرش ',
    cover: `${BASE_URL_IMAGE}2020/11/Masih-Arash-Remix-Man-Mazerat-Mikhaam-Music-fa.com_.jpg`
  },
  {
    src: `${BASE_URL_MUSIC}Mehdi%20Ahmadvand%20-%20Remix%20Avaze%20Ghoo%20(128).mp3`,
    name: ' آواز قو',
    artist: ' مهدی احمدوند',
    cover: `${BASE_URL_IMAGE}2021/07/Mehdi-Ahmadvand-Remix-Avaze-Ghoo-Music-fa.com_.jpg`
  },
  {
    src: `${BASE_URL_MUSIC}Mohsen%20EbrahimZade%20-%20Remix%20Taghche%20Bala%20(128).mp3`,
    name: 'طاقچه بالا',
    artist: ' محسن ابراهیم زاده ',
    cover: `${BASE_URL_IMAGE}2021/07/Mohsen-EbrahimZade-Remix-Taghche-Bala-Music-fa.com_.jpg`
  },
  {
    src: `${BASE_URL_MUSIC}Armin%202AFM%20-%20Remix%20Naze%20Shastam%20(128).mp3`,
    name: ' ناز شستم',
    artist: ' آرمین زارعی',
    cover: `${BASE_URL_IMAGE}2021/07/Armin-2AFM-Remix-Naze-Shastam-Music-fa.com_.jpg`
  },
  {
    src: `${BASE_URL_MUSIC}Masoud%20Sadeghloo%20-%20Remix%20Noghte%20Zaf%20(128).mp3`,
    name: 'مسعود صادقلو',
    artist: ' نقطه ضعف',
    cover: `${BASE_URL_IMAGE}2021/07/Masoud-Sadeghloo-Remix-Noghte-Zaf-Music-fa.com_.jpg`
  }
]
new Player('.wrapper', playlist)
