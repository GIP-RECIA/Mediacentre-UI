<template>
  <div class="cadre-page-mediacentre">
    <aside class="aside-page-mediacentre">
      <menu-mediacentre
          v-bind:filtres="filtres"
      />
    </aside>
    <main class="main-page-mediacentre">
      <liste-ressources-mediacentre
          v-bind:filtre="filtre"
          v-bind:ressources="ressources"
          v-bind:chargement="chargement"
      />
    </main>
    <!-- TODO: AJOUT DU MENU DE GESTIONNAIRE DE RESSOURCE, EN BOUTON FLOTTANT EN BAS À DROITE -->
  </div>
</template>

<script>
import ListeRessourcesMediacentre from "./ListeRessourcesMediacentre";
import MenuMediacentre from "./MenuMediacentre";
import i18n from "../i18n";
import {addFavorite, removeFavorite} from "../services/serviceMediacentreTest";
import {getMediacentreRessources} from "../services/serviceMediacentre";

export default {
  name: "page-mediacentre",
  components: {
    menuMediacentre: MenuMediacentre,
    listeRessourcesMediacentre: ListeRessourcesMediacentre
  },
  props: {
    baseApiUrl: {
      type: String,
      default: process.env.VUE_APP_BASE_API_URI
    },
    mediacentreApiUrl: {
      type: String,
      default: process.env.VUE_APP_MEDIACENTRE
    },
    userInfoApiUrl: {
      type: String,
      default: process.env.VUE_APP_USER_INFO_API_URI
    }
  },
  data: function() {
    return {
      filtre: '',
      ressources: [],
      filtres: [],
      erreur: '',
      chargement: false
    };
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
    },
    changementFiltre(selection) {
      this.filtre = selection;
    },
    getRessources() {
      this.chargement = true;
      getMediacentreRessources(
          this.baseApiUrl + this.mediacentreApiUrl,
          this.userInfoApiUrl
      ).then(
          value => {
            this.ressources = value.ressources;
            this.filtres = value.categoriesFiltres;
            this.chargement = false;
          }
      ).catch(
          error => {
            this.erreur = error.toString();
            this.chargement = false;
          }
      )
    },
    ajouterFavoris(idRessource) { // TODO: IMPLÉMENTER L'AJOUT AUX FAVORIS VIA COMMUNICATION AVEC L'API
      addFavorite(idRessource);
    },
    retirerFavoris(idRessource) { // TODO: IMPLÉMENTER LA SUPPRESSION DES FAVORIS VIA COMMUNICATION AVEC L'API
      removeFavorite(idRessource);
    }
  },
  mounted() {
    this.getRessources();
  }
}
</script>

<style scoped>
.cadre-page-mediacentre {
  display: flex;
  flex-direction: row;
}

.aside-page-mediacentre {
  max-width: min(25%, 290px);
  width: 100%;
}

.main-page-mediacentre {
  max-width: max(75%, calc(100% - 290px));
  width: 100%;
  height: 100%;
}

@media (max-width: 770px) {
  .cadre-page-mediacentre {
    flex-direction: column;
    align-items: center;
  }

  .aside-page-mediacentre {
    max-width: 100%;
  }
}
</style>
