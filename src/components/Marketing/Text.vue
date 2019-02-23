<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <quill-editor class="quill-editor" ref="myTextEditor" v-model="content" :options="quillOption"></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import quillConfig from "../../assets/config/quill-config.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "../../assets/style/quill-config.css";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      quillOption: quillConfig,
      content: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style>
.quill-editor {
  height: 400px;
}
</style>


