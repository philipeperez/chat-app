<style scoped></style>

<template>
  <div class="fill-height">
    <online-user-list :users="users"/>
    <chat-box :messages="messages"/>
    <v-bottom-navigation elevation="0" absolute>
      <v-text-field
        class="ma-3"
        append-outer-icon="send"
        autofocus
        @click:append-outer="sendMessage"
        @keyup.enter="sendMessage"
        v-model="msgToSend"
        label="Message"
        required/>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  // import io from 'socket.io-client';
  import ChatBox from '@/components/ChatBox.vue';
  import OnlineUserList from '@/components/OnlineUserList.vue';
  import {Message, MessageType, User} from '../types';

  @Component({
    components: {
      ChatBox,
      OnlineUserList
    }
  })
  export default class ChatPage extends Vue {
    // private socket: SocketIOClient.Socket | null = null;
    private messages: Message[] = [];
    private msgToSend: string = '';
    private users: User[] = [];

    mounted() {
      if (!this.user) {
        this.$router.push('/');
        return;
      }
      // this.socket = io('https://chat-app-nestjs-vue.herokuapp.com/', {query: `user=${this.user.name}`});
      // this.socket.on('connect', () => {
      //   console.log('Conectado');
      // });
      this.socket.on('msgToClient', this.receiveMessage);
      this.socket.on('onlineUserlistUpdated', this.onChangeUserList);
      this.socket.on('userConnected', this.onUserConnected);
      this.socket.on('userDisconnected', this.onUserDisconnected);
    }

    get socket(): SocketIOClient.Socket {
      return this.$store.state.socket
    }

    get user(): User {
      return this.$store.state.user;
    }

    receiveMessage(msg: Message) {
      msg.type = MessageType.Message;
      this.messages.push(msg);
    }

    sendMessage() {
      if (this.msgToSend !== '') {
        this.socket?.emit('msgToServer', this.msgToSend);
        this.msgToSend = '';
      }
    }

    private onChangeUserList(users: User[]) {
      this.users = users
    }

    private onUserConnected(msg: Message) {
      msg.type = MessageType.UserConnected;
      this.messages.push(msg)
    }

    private onUserDisconnected(msg: Message) {
      msg.type = MessageType.UserDisconnected;
      this.messages.push(msg)
    }
  }
</script>
