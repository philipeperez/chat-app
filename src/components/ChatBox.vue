<style>
  #chip-usage-example {
    max-width: 60vw;
  }

  #chip-usage-example .v-chip {

  }

  #chatbox-card {
    overflow-y: auto;
    max-height: 80vh;
  }
</style>

<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col cols="12">
        <v-card id="chatbox-card" ref="chatBoxCard" flat>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="(msg, n) in messages" :key="n">
                <v-list-item-content>
                  <v-alert v-if="verifyMessageType(msg)" class="text-left grey lighten-3">
                    <strong>{{ msg.user.name }} says:</strong> {{ msg.txt }}
                  </v-alert>
                  <v-alert dark dense v-else :color="getType(msg)" class="text-center">
                    {{ msg.user.name }} {{ msg.txt }}
                  </v-alert>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {Message, MessageType} from '../types';

  @Component({})
  export default class ChatBox extends Vue {
    @Prop({default: [], required: true}) readonly messages!: Message[];

    @Watch('messages')
    private onNewMessage() {
      const el = (this.$refs.chatBoxCard as Vue).$el;
      this.$nextTick(() => {
        el.scrollTop = el.scrollHeight;
      })
    }

    public getType(msg: Message): string {
      return msg.type === MessageType.UserConnected ? 'success' : 'error'
    }

    public verifyMessageType(msg: Message): Boolean {
      return msg.type === MessageType.Message
    }
  }
</script>
