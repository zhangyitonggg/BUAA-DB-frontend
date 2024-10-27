<template>
  <v-container style="max-width: 45%;">
    <v-card class="card pa-4">
      <v-row>
        <v-col cols="12">
          <h3>用户基本信息</h3>
        </v-col>
        <v-col style="padding: 0;" cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="8">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-card-account-details</v-icon>  
                用户名
              </v-list-item-title>
              <v-list-item-subtitle style="margin-left:9.2%;">zhangyitong</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-google-classroom</v-icon> 
                身份
              </v-list-item-title>
              <v-list-item-subtitle style="margin-left:9.2%;">普通用户</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-email-multiple-outline</v-icon>
                电子邮件地址
              </v-list-item-title>
              <v-list-item-subtitle style="margin-left:9.2%;">{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-invoice-text-send-outline</v-icon>
                个性标签
              </v-list-item-title>
              <v-list-item-subtitle style="margin-left:9.2%;">{{ personalityTag }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="4" style="margin-top: 20px;">
          <v-img
          src="@/assets/images/zyt.png"
          aspect-ratio="1"
          height="130px"
          width="130px"
          contain
          style="transform: translateX(-9%); border-radius: 50%; overflow: hidden;"
          ></v-img>
          <v-btn text color="primary">选择新头像</v-btn>
        </v-col>
        <v-col style="padding: 0;" cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col style="padding: 0.1px;" class="text-right">
          <v-btn text color="red" @click="showPasswordDialog">修改密码</v-btn>
          <v-btn text color="red" @click="showEmailDialog">修改电子邮件地址</v-btn>
          <v-btn text color="red" @click="showTagDialog">修改个性标签</v-btn>
          <v-btn text color="red">退出登录</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pa-4">
      <v-row>
        <v-col cols="12">
          <h3>用户数据统计</h3>
        </v-col>
        <v-col style="padding: 0;" cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" class="one_col">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-bootstrap</v-icon>  
                菜币数量 &nbsp;&nbsp; {{moneyNumber}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <v-chip color="yellow" label small class="me-1" @click="showGiveMeMoneyDialog = true">去充值</v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <!-- 左侧列 -->
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-thumb-up-outline</v-icon>  
                获赞数量
              </v-list-item-title>
              <v-list-item-title style="margin-left:13%;">{{likeNumber}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-human-male-board-poll</v-icon> 
                粉丝数量
              </v-list-item-title>
              <v-list-item-title style="margin-left:13%;">{{fansNumber}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <!-- 右侧列 -->
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-invoice-text-multiple-outline</v-icon>
                发帖数量
              </v-list-item-title>
              <v-list-item-title style="margin-left:13%;">{{postNumber}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon left>mdi-google-assistant</v-icon>
                回答数量
              </v-list-item-title>
              <v-list-item-title style="margin-left:13%;">{{answerNumber}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
    
    <!-- 修改个性标签对话框 -->
    <v-dialog v-model="tagDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">修改个性标签</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newPersonalityTag" label="个性标签"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="updatePersonalityTag">确认</v-btn>
          <v-btn color="grey" text @click="tagDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 修改密码对话框 -->
    <v-dialog v-model="passwordDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">修改密码</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newPassword" label="新密码" type="password"></v-text-field>
          <v-text-field v-model="confirmPassword" label="确认密码" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="updatePassword">确认</v-btn>
          <v-btn color="grey" text @click="passwordDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 修改电子邮件对话框 -->
    <v-dialog v-model="emailDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">修改电子邮件地址</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newEmail" label="新电子邮件地址"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="updateEmail">确认</v-btn>
          <v-btn color="grey" text @click="emailDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showGiveMeMoneyDialog" max-width="400">
      <v-card>
        <v-card-title>
          <span class="headline">充值提示</span>
        </v-card-title>
        <v-card-text>
          你确定要进行充值吗？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="showGiveMeMoneyDialog = false">取消</v-btn>
          <v-btn color="blue" text @click="confirmRecharge">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {
      tagDialog: false,
      passwordDialog: false,
      emailDialog: false,
      newPersonalityTag: '',
      newPassword: '',
      confirmPassword: '',
      newEmail: '',
      personalityTag: '热爱编程，喜欢挑战',
      email: '22373337@buaa.edu.cn',
      showGiveMeMoneyDialog: false,
      moneyNumber: 10,
      likeNumber: 114514,
      fansNumber: 78,
      postNumber: 21,
      answerNumber: 11,
    };
  },
  mounted() {
      this.$store.commit("setAppTitle", "用户信息");
  },
  methods: {
    showTagDialog() {
      this.newPersonalityTag = this.personalityTag;
      this.tagDialog = true;
    },
    updatePersonalityTag() {
      this.personalityTag = this.newPersonalityTag;
      this.tagDialog = false;
    },
    showPasswordDialog() {
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordDialog = true;
    },
    updatePassword() {
      if (this.newPassword === this.confirmPassword) {
        // 在此处添加更新密码的逻辑
        this.passwordDialog = false;
      } else {
        alert("密码不匹配");
      }
    },
    showEmailDialog() {
      this.newEmail = this.email;
      this.emailDialog = true;
    },
    updateEmail() {
      // 在此处添加更新电子邮件的逻辑
      this.email = this.newEmail;
      this.emailDialog = false;
    },
    confirmRecharge() {
      // 在此处添加充值逻辑
      this.showGiveMeMoneyDialog = false;
      alert('警惕虚拟货币的非法交易！！！'); // 弹出提示
      window.location.href = 'https://www.cac.gov.cn/2020-06/07/c_1593081473364231.htm'; // 替换为你的目标网址
    }
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 35px;
}
.one_col {
  padding-bottom: 0%;
  margin-bottom: -1%;
}
h3 {
  font-weight: bold;
}
</style>
