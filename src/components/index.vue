<template>
  <el-container>
    <el-header height='auto'>
      <img
        :src="logoUrl"
        style="width: 50%; margin-top: 80px; align: center"
      ></img><br>
      <div style="font-family:'Arial Black', Gadget, sans-serif; font-size:20px;line-height:1em;color:#7d7d7d;">
      JYJ Book Retrival System</div>
    </el-header>
    <el-main>
      <el-input
        placeholder="input search content"
        v-model="search_content"
        style="width: 800px"
        @keyup.enter.native="search"
      >
        <el-select v-model="field" slot="prepend" class="main-input">
          <el-option
            v-for="item in fields"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button> </el-input
      ><br /><br />
      <el-button @click="pop_up_advanced_search_dialog"
        >Advanced Search</el-button
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
  name: "index",
  data() {
    return {
      logoUrl: require("../assets/log.png"),
      search_content: "",
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
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
