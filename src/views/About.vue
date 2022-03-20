<template>
  <div class="about">
    <template>
      <v-container>
        <div class="setForm">
          <h1 class="text-center" style="margin-bottom: 10px">Add Data</h1>
          <div class="setsty">
            <v-text-field
              type="title"
              class="form-control"
              label="Title"
              placeholder="title"
              required
              v-model="title"
            ></v-text-field>

            <v-text-field
              type="URL"
              class="form-control"
              label="Description"
              placeholder="description"
              required
              v-model="description"
            ></v-text-field>
            <v-text-field
              type="Description"
              class="form-control"
              label="Img Url"
              placeholder="Url"
              required
              v-model="image"
            ></v-text-field>
          </div>

          <v-btn class="primary" @click="add()">Add</v-btn>
        </div>
      </v-container>
    </template>
  </div>
</template>

<script>
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { db } from "../plugins/firebaseinit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";
export default {
  data() {
    return {
      csDoc: [],
      title: "",
      description: "",
      image: "",
    };
  },
  beforeMount() {
    this.readData();
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          this.email = user.email;
          this.uid = user.uid;
        } else {
          alert("Plese Login");
          this.$router.push("/Login");
        }
      });
    },
    async add() {
      try {
        const docRef = await addDoc(collection(db, "Addproduce"), {
          title1: this.title,
          description1: this.description,
          image1: this.image,
        });
        this.$router.push("/");
        //await this.readData();
        this.title = "";
        this.image = "";
        this.description = "";
        console.log("Document written with ID: ", docRef.id);
        window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      this.csDoc = [];
      const q = query(collection(db, "Addproduce"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
        // console.log("Current cities in CA: ", this.csDoc.join(", "));
      });
    },
  },
};
</script>

<style scoped>
.setsty {
  padding: 0;
  margin: 0;
}
</style>
