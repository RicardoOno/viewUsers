<template>
  <div id="app">
    <h1>Vaga - FrontEnd <small>(usando API do GitHub)</small></h1>
    <h2>Insira algum username (login): </h2>
    <input type="text" @input="username = $event.target.value" placeholder="Ex: RicardoOno"/>
    <p>Username: {{ username }}</p>
    <button @click="getByUsername(username), isPersonalData = true">Pegar dados pessoais</button>
    <button @click="getUserFollowers(username), isPersonalData = false">Listar seguidores</button>
    <h3>Info: id - login - url do repositorio</h3>
    <div v-if="status == 200">
      <p v-if="isPersonalData">{{ data.id }} - {{ data.login }} - {{ data.html_url }}</p>
      <p v-else v-for="follower in data">{{ follower.id }} - {{ follower.login }} - {{  follower.html_url}}</p>
    </div>
    <div v-else>
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script>
  import Service from './service/service';

  export default {
    data(){
      return {
        data: '',
        username: '',
        isPersonalData: true,
        status: 0
      }
    },

    methods: {
      getByUsername(username){
        this.service
          .getOneUser(username)
          .then(res => {
            this.sReturn(res);
          });
      },

      getUserFollowers(username){
        this.service
          .getUserFollowers(username)
          .then(res => {
            this.sReturn(res);
          });
      },

      //Realiza o tratamento do retorno do service
      sReturn(res){
        if(res.status != 200){
          console.log(res);
          this.data = res.body.message;
        } else {
          console.log(res.body)
          this.data = res.body;
        }
        this.status = res.status;
      },

    },

    created(){
      this.service = new Service(this.$resource);
    }
  }
</script>

<style>

</style>
