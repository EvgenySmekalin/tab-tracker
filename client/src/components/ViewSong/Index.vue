<template>
    <div>
        <v-layout>
            <v-flex xs6>
                <song-metadata :song="song"></song-metadata>
            </v-flex>
            <v-flex xs6 class="ml-2">
                <you-tube :youtubeId="song.youtubeId">

                </you-tube>
            </v-flex>
        </v-layout>

        <v-layout class="mt-4">
            <v-flex xs6>
                <tab :song="song"></tab>
            </v-flex>
            <v-flex xs6 class="ml-2">
                <lyrics :song="song"></lyrics>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import SongService from '@/services/SongService'
import Panel from '@/components/Panel'
import SongMetadata from './SongMetadata'
import YouTube from './YouTube'
import Lyrics from './Lyrics'
import Tab from './Tab'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      }
    }
  },
  components: {
    Panel, SongMetadata, YouTube, Lyrics, Tab
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongService.show(songId)).data
  }
}
</script>

<style scoped>

</style>
