<template>
    <v-layout>
        <v-flex xs4>
            <panel title="Song Metadata">
                <v-text-field
                    label="Title"
                    required
                    :rules="[required]"
                    v-model="song.title"
                    tabindex="1"
                ></v-text-field>

                <v-text-field
                    label="Artist"
                    required
                    :rules="[required]"
                    v-model="song.artist"
                    tabindex="2"
                ></v-text-field>

                <v-text-field
                    label="Genre"
                    required
                    :rules="[required]"
                    v-model="song.genre"
                    tabindex="3"
                ></v-text-field>

                <v-text-field
                    label="Album"
                    required
                    :rules="[required]"
                    v-model="song.album"
                    tabindex="4"
                ></v-text-field>

                <v-text-field
                    label="Album image url"
                    required
                    :rules="[required]"
                    v-model="song.albumImageUrl"
                    tabindex="5"
                ></v-text-field>

                <v-text-field
                    label="youtube id"
                    required
                    :rules="[required]"
                    v-model="song.youtubeId"
                    tabindex="6"
                ></v-text-field>
            </panel>
        </v-flex>
        <v-flex xs8>
            <panel title="Song Structure" class="ml-2">
                <v-text-field
                    label="Lyrics"
                    required
                    :rules="[required]"
                    multi-line
                    v-model="song.lyrics"
                    tabindex="7"
                ></v-text-field>

                <v-text-field
                    label="Tab"
                    required
                    :rules="[required]"
                    multi-line
                    v-model="song.tab"
                    tabindex="8"
                ></v-text-field>
            </panel>
            <v-btn class="cyan mt-2" dark @click="save">Save Song</v-btn>
            <v-alert
                transition="slide-y-reverse-transition"
                type="error"
                :value="error"
                class="mx-5">
                    {{ error }}
            </v-alert>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongService'
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
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  components: {
    Panel
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
          .keys(this.song)
          .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }

      const songId = this.$store.state.route.params.songId
      try {
        await SongService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },

  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
