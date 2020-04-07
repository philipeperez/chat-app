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
  import ChatBox from '@/components/ChatBox.vue';
  import OnlineUserList from '@/components/OnlineUserList.vue';
  import {Message, User} from '../types';

  @Component({
    components: {
      ChatBox,
      OnlineUserList
    }
  })
  export default class ChatPage extends Vue {
    private msgToSend: string = '';

    created() {
      if (!this.user) {
        this.$router.push('/');
        return;
      }
    }

    sendMessage(): void {
      if (this.msgToSend !== '') {
        this.socket?.emit('msgToServer', this.msgToSend);
        this.msgToSend = '';
      }
    }

    get socket(): SocketIOClient.Socket {
      return this.$store.state.socket
    }

    get user(): User {
      return this.$store.state.user;
    }

    get messages (): Message[] {
      return this.$store.state.messages
    }

    get users (): User[] {
      return this.$store.state.onlineUsers
    }
  }
</script>
