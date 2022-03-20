<template>
  <div>
    <v-container>
      <h1>News</h1>
      <v-container>
        <v-container>
          <v-row class="d-flex flex-wrap">
            <v-card
              class="mx-auto mb-5"
              max-width="344"
              v-for="(i, index) in csDoc"
              :key="index"
            >
              <v-img :src="i.data.image1" alt="" height="200px"></v-img>

              <v-card-title> {{ i.data.title1 }} </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{
                    show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ i.data.description1 }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-row>
        </v-container>
      </v-container>
    </v-container>
  </div>
</template>
<script>
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../plugins/firebaseinit";
export default {
  data() {
    return {
      csDoc: [],
      title: "",
      description: "",
      image: "",
      show: false,
      dialog: false,
      udp: {
        title: null,
        description: null,
        image: null,
      },
      checkid: "",
      uid: "",
    };
  },
  beforeMount() {
    this.readData();
  },

  methods: {
    async Editdata() {
      this.csDoc = [];
      try {
        const docData = {
          title: this.udp.title,
          image: this.udp.image,
          description: this.udp.description,
        };
        await setDoc(doc(db, "Addproduce", this.checkid), docData);
        console.log("Data Updated...");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    checkdata(i) {
      this.checkid = i.id;
      this.udp.title = i.data.title;
      this.udp.image = i.data.image;
      this.udp.description = i.data.description;
    },
    async deleteData(i) {
      this.csDoc = [];
      console.log("Waiting for delete data...");
      await deleteDoc(doc(db, "Addproduce", i));
      console.log("Deleted...");
    },
    async add() {
      try {
        this.csDoc = [];
        const docRef = await addDoc(collection(db, "Addproduce"), {
          title1: this.title,
          image1: this.image,
          description1: this.description,
        });
        this.$router.push("/");
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
<style></style>
