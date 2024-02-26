<template>
  <p class="socket-connected" v-if="connected">Connected</p>
  <p class="socket-disconnected" v-if="!connected">Disconnected</p>
</template>

<script>
import { useSocketIO } from "@/socket";
export default {
  name: "ConnectionState",
  data() {
    return {
      connected: false,
    };
  },
  created() {
    const { socket } = useSocketIO();
    socket.on("connect", () => {
      this.connected = true;
    });
    socket.on("disconnect", () => {
      this.connected = false;
    });
  },
};
</script>
<styles scoped lang="scss">
.socket-connected {
  color: #42b983;
}
.socket-disconnected {
  color: #eb5e28;
}
</styles>
