<template>
  <div>
    <v-container>
      <h1>Edit</h1>
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
                <v-col cols="auto">
                  <v-dialog transition="dialog-top-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="orange lighten-2 "
                        text
                        v-bind="attrs"
                        v-on="on"
                        @click="checkdata(i)"
                        >Edit</v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar
                          color="orange lighten-2 "
                          dark
                          class="text-h2"
                          >Edit</v-toolbar
                        >
                        <v-card-text>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    type="title"
                                    label="Title*"
                                    required
                                    v-model="udp.title"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    type="URL"
                                    label="Image URL*"
                                    required
                                    v-model="udp.image"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    type="description"
                                    label="Description*"
                                    required
                                    v-model="udp.description"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                        </v-card-text>

                        <v-card-actions class="justify-end">
                          <v-btn
                            text
                            @click="dialog.value = false"
                            color="orange lighten-2"
                            >Close</v-btn
                          >
                          <v-btn
                            text
                            @click="Editdata()"
                            color="orange lighten-2"
                            >Save</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>

                <v-btn color="orange lighten-2" text @click="deleteData(i.id)">
                  Delete</v-btn
                >

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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";
export default {
  data() {
    return {
      csDoc: [],
      title: "",
      description: "",
      image: "",
      show: false,
      checkid: "",
      udp: {
        title: null,
        description: null,
        image: null,
      },
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
    async Editdata() {
      try {
        this.csDoc = [];
        const docData = {
          title: this.title,
          image: this.image,
          description: this.description,
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
