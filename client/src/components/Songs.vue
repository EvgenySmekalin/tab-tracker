<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
            <panel title="Songs">
                <v-btn
                    slot="action"
                    :to="{name: 'songs-create'}"
                    fab
                    light
                    small
                    id="add-song-button"
                    absolute
                    right
                    center
                    class="cyan accent-2">
                    <v-icon>add</v-icon>
                </v-btn>
                <div
                    class="song"
                    v-for="song in songs"
                    :key="song.id">

                    <v-layout>
                        <v-flex xs6>
                            <div class="song-title">
                                {{ song.title }}
                            </div>

                            <div class="song-artist">
                                {{ song.artist }}
                            </div>

                            <div class="song-genre">
                                {{ song.genre }}
                            </div>

                            <v-btn
                                class="cyan mt-2"
                                :to="{
                                    name: 'song',
                                    params: {
                                      songId: song.id
                                    }
                                }"
                                dark>
                                View
                            </v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <img :src="song.albumImageUrl" alt="" class="album-image">
                        </v-flex>
                    </v-layout>
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: []
    }
  },
  async mounted () {
    this.songs = (await SongService.index()).data
  }
}
</script>

<style scoped>
    #add-song-button {
        z-index: 1;
    }
    .song {
        padding: 20px;
        height: 330px;
        overflow: hidden;
    }
    .song-title {
        font-size: 30px;
    }
    .song-artist {
        font-size: 24px;
    }
    .song-genre {
        font-size: 18px;
    }
    .album-image {
        width: 70%;
        margin: 0 auto;
    }
</style>
