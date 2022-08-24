<template>
  <div>
    <header>
      <h1>My Anime Feed</h1>
    </header>
    <main>
      <Post v-for="(anime, i) in anime_list" :key="i" :anime="anime" />
    </main>
  </div>
</template>

<script>
import Post from './components/Post.vue';

export default {
  name: 'App',
  data() {
    return {
      anime_list: []
    }
  },
  components: {
    Post,
  },
  methods: {
    getAnime() {
      const anime_titles = [
        "Naruto",
        "Demon Slayer",
        "Dragon Ball",
        "My Hero Academia",
        "Sword Art Online",
        "Tokyo Ghoul",
        "Darling in the Franxx",
        "Code Geass",
        "One Piece",
        "Fairy Tail",
        "Bleach",
        "Attack on Titan",
        "Hunter x Hunter",
      ];
      
      const anime = [];

      for (let i = 0; i < 10; i++) {
        anime.push({
          title: anime_titles[Math.floor(Math.random() * anime_titles.length)],
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus porro iusto architecto voluptas explicabo dignissimos hic eos dolorem optio fuga, placeat autem, deserunt, vel ab cumque voluptatum. Nesciunt, illum similique.'
        });
      }

      return anime;
    },
    handleScroll() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
        const new_anime = this.getAnime();
        this.anime_list = [
          ...this.anime_list, ...new_anime
        ]
      }
    }
  },
  mounted() {
    this.anime_list = this.getAnime();  
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #FFF;
  background-color: #2c3e50;
  min-height: 100vh;
  padding-top: 3rem;
}

header {
  margin-bottom: 2rem;
}

header h1 {
  text-align: center;
}

main {
  padding: 0 2rem;
  max-width: 640px;
  margin: 0 auto;
}
</style>
