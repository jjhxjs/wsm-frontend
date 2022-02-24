<template>
  <el-container>
    <el-header style="text-align: left">
      <el-row>
        <el-col :span="20">
          <div>
            <p>{{ title }}</p>
            <p>{{ author }}</p>
          </div>
        </el-col>
        <el-col :span="4" style="margin-top: 20px">
          <el-input
            placeholder="input search content"
            v-model="search_content"
            size="mini"
            @keyup.enter.native="search"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              style="width: 28px; text-align: center; padding: 0px"
              @click="search"
            ></el-button>
          </el-input>
          <el-button
            @click="pop_up_advanced_search_dialog"
            type="text"
            style="font-size: 10px"
            >Advanced Search</el-button
          >
        </el-col>
      </el-row>
      <el-button @click="pop_up_advanced_search_dialog" type="text"
        >Advanced Search</el-button
      ></el-header
    ><el-main>
      <el-card style="text-align: left; white-space: pre-wrap">{{
        description
      }}</el-card>
      <el-card
        >Available ebook formats:
        <a v-if="url_txt != null" :href="url_txt">txt,</a>  
        <a v-if="url_epub != null" :href="url_epub">epub</a></el-card
      >
    </el-main>
    <el-dialog
      :visible.sync="advanced_search_dialog_visible"
      width="80%"
      title="Advanced Search"
    >
      <el-form>
        <transition-group name="list-complete" tag="p">
          <el-row
            v-for="(item, ind) in restrictions"
            :key="item.key"
            class="list-complete-item"
          >
            <el-col :span="1" style="line-height: 40px; height: 40px">
              <el-button
                type="text"
                class="el-icon-remove-outline"
                style="font-size: 24px; padding: 0px; height: 100%"
                v-if="restrictions.length > 1"
                @click="remove(ind)"
              ></el-button>
            </el-col>
            <el-col :span="3">
              <el-select v-model="item.type" style="width: 100%">
                <el-option label="SEQUENCE" value="SEQUENCE"></el-option>
                <el-option label="ALL" value="ALL"></el-option>
                <el-option label="SOME" value="SOME"></el-option>
                <el-option label="NONE" value="NONE"></el-option>
              </el-select>
            </el-col>
            <el-col :span="20">
              <el-input v-model="item.value">
                <el-select
                  v-model="item.field"
                  slot="prepend"
                  class="main-input"
                >
                  <el-option
                    v-for="item in fields"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="item.precise"
                  slot="append"
                  class="main-input"
                >
                  <el-option label="PRECISE" :value="true"></el-option>
                  <el-option label="FUZZY" :value="false"></el-option>
                </el-select>
              </el-input>
            </el-col>
          </el-row>
          <el-row :key="2" style="margin-top: 20px">
            <el-col :span="1" style="line-height: 40px; height: 40px">
              <el-button
                type="text"
                class="el-icon-circle-plus-outline"
                style="font-size: 24px; padding: 0px; height: 100%"
                @click="add"
              ></el-button
            ></el-col>
          </el-row>
        </transition-group>
        <el-button @click="advanced_search">Advanced Search</el-button>
      </el-form>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  name: "query",
  data() {
    return {
      search_content: "",
      logoUrl: require("../assets/logo.png"),
      field: "all",
      advanced_search_dialog_visible: false,
      restrictions: [
        {
          field: "title",
          value: "",
          type: "ALL",
          precise: true,
          key: Math.random(),
        },
        {
          field: "author",
          value: "",
          type: "ALL",
          precise: true,
          key: Math.random(),
        },
      ],
      fields: [
        { name: "All", value: "all" },
        { name: "Title", value: "title" },
        { name: "Author", value: "author" },
        { name: "Description", value: "description" },
      ],
      title: "",
      description: "",
      author: "",
      year: "",
      url_txt: null,
      url_epub: null,
    };
  },
  methods: {
    search() {
      let search_str =
        "?mode=1&field=" + this.field + "&content=" + this.search_content;
      this.$router.push("/query" + search_str);
    },
    advanced_search() {
      let search_str = "?mode=2";
      for (var i in this.restrictions) {
        for (var k in this.restrictions[i]) {
          if (k != "key") {
            search_str += "&" + k + i + "=" + this.restrictions[i][k];
          }
        }
      }
      this.$router.push("/query" + search_str);
    },
    remove(ind) {
      this.restrictions.splice(ind, 1);
    },
    add() {
      this.restrictions.push({
        field: "all",
        value: "",
        type: "ALL",
        precise: true,
        key: Math.random(),
      });
    },
    pop_up_advanced_search_dialog() {
      this.advanced_search_dialog_visible = true;
    },
    book(book_id) {
      this.$router.push("/book&id=" + book_id);
    },
  },
  mounted() {
    console.log(this.$route.query);
    this.$axios.get("/api/book", { params: this.$route.query }).then((res) => {
      this.title = res.data.title;
      this.description = res.data.description;
      this.author = res.data.author;
      this.year = res.data.year;
      this.url_txt = res.data.url_txt;
      this.url_epub = res.data.url_epub;
      console.log(this.description);
    });
  },
};
</script>

<style>
.el-card__header {
  padding: 0px;
}
.result {
  text-align: left;
}
.title {
  padding: 20px;
  cursor: pointer;
}
.title:hover {
  text-decoration: underline;
  color: aqua;
}
.author {
  cursor: pointer;
}
.author:hover {
  text-decoration: underline;
  color: aqua;
}
.list-complete-item {
  margin-top: 20px;
  transition: all 0.5s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.list-complete-leave-active {
  position: absolute;
}
.list-complete-move {
  transition: transform 0.5s;
}
</style>
